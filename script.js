/**
 * Walter Web - High Performance Scripts
 * Objective: Smooth UX & Form handling (Simulate Webhook to C2S)
 */

document.addEventListener("DOMContentLoaded", () => {

    // Smooth Scrolling para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer para animações fade-in no Scroll (Alta Performance)
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // Mockup do envio de Lead para a API do C2S CRM (Conforme Túlio e César planejaram)
    const leadForm = document.getElementById('lead-form');
    const submitBtn = leadForm.querySelector('button[type="submit"]');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('whatsapp').value;

            // Estado de Carregamento
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Conectando ao WhatsApp...";
            submitBtn.disabled = true;

            // Disparo de Conversão para o Google Tag Manager (GTM)
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'lead_whatsapp_success',
                'form_name': 'Contato Landing Page Apoena'
            });

            // Formata a mensagem para a Recepção
            const mensagem = encodeURIComponent(`Olá, Recepção Apoena! Meu nome é ${name} e vim pela página do Nova Jaguari.`);
            // IMPORTANTE: O usuário DEVE trocar este número para o celular real da recepção (ex: 551199999999)
            const numeroRecepcao = "5511947488221";
            const urlWhatsApp = `https://wa.me/${numeroRecepcao}?text=${mensagem}`;

            // Delay de 800ms crucial para que a Tag do GTM/Facebook registre o clique antes de redirecionar
            setTimeout(() => {
                window.open(urlWhatsApp, '_blank');
                leadForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 800);
        });
    }

});
