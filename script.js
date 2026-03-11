/* ============================================================
   script.js — Shaveen Udayanga Portfolio
   GSAP ScrollTrigger–driven horizontal progression
   ============================================================ */

(function () {
    'use strict';

    gsap.registerPlugin(ScrollTrigger);

    /* ── Constants ────────────────────────────────────────── */
    const TYPEWRITER_TEXTS = [
        'Software Engineer',
        'AI/ML Enthusiast',
        'Full-Stack Developer',
        'Musician & Performer',
        'Team Builder',
        'Problem Solver'
    ];

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── DOM Ready ────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', () => {
        initHeroAnimations();
        initTypewriter();
        initHorizontalStages();
        initScrollProgress();
        initNavigation();
        initThemeToggle();
        initBackToTop();
        initServiceWorker();
    });

    /* ── Hero Animations ──────────────────────────────────── */
    function initHeroAnimations() {
        if (reducedMotion) {
            document.querySelectorAll('.hero__badge, .hero__greeting, .hero__name, .hero__subtitle, .hero__desc, .hero__cta, .hero__social, .hero__visual')
                .forEach(el => { el.style.opacity = '1'; });
            return;
        }

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.to('.hero__badge', { opacity: 1, y: 0, duration: 0.6 }, 0.3)
          .to('.hero__greeting', { opacity: 1, y: 0, duration: 0.5 }, 0.5)
          .to('.hero__name', { opacity: 1, y: 0, duration: 0.7 }, 0.7)
          .to('.hero__subtitle', { opacity: 1, y: 0, duration: 0.5 }, 1.0)
          .to('.hero__desc', { opacity: 1, y: 0, duration: 0.5 }, 1.2)
          .to('.hero__cta', { opacity: 1, y: 0, duration: 0.5 }, 1.4)
          .to('.hero__social', { opacity: 1, y: 0, duration: 0.5 }, 1.5)
          .to('.hero__visual', { opacity: 1, scale: 1, duration: 0.8 }, 0.8);

        /* Set initial states */
        gsap.set(['.hero__badge', '.hero__greeting', '.hero__name', '.hero__subtitle', '.hero__desc', '.hero__cta', '.hero__social'], {
            opacity: 0, y: 25
        });
        gsap.set('.hero__visual', { opacity: 0, scale: 0.92 });

        /* Hero parallax on scroll-out */
        gsap.to('.hero__content', {
            y: -60,
            opacity: 0.2,
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
        gsap.to('.hero__visual', {
            y: -30,
            opacity: 0.3,
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    /* ── Typewriter ────────────────────────────────────────── */
    function initTypewriter() {
        const el = document.getElementById('typewriter');
        if (!el) return;

        let textIdx = 0, charIdx = 0, deleting = false;

        function tick() {
            const text = TYPEWRITER_TEXTS[textIdx];
            if (deleting) {
                charIdx--;
                el.textContent = text.substring(0, charIdx);
            } else {
                charIdx++;
                el.textContent = text.substring(0, charIdx);
            }

            let delay;
            if (!deleting && charIdx === text.length) {
                delay = 2200;
                deleting = true;
            } else if (deleting && charIdx === 0) {
                deleting = false;
                textIdx = (textIdx + 1) % TYPEWRITER_TEXTS.length;
                delay = 400;
            } else {
                delay = deleting ? 45 : 85;
            }
            setTimeout(tick, delay);
        }
        tick();
    }

    /* ── Horizontal Scroll Stages ─────────────────────────── */
    function initHorizontalStages() {
        const stages = document.querySelectorAll('.stage--horizontal');

        stages.forEach(stage => {
            const track = stage.querySelector('.stage__track');
            if (!track) return;

            const panels = track.querySelectorAll('.panel');
            const panelCount = panels.length;
            if (panelCount <= 1) return;

            const scrollDistance = () => (panelCount - 1) * window.innerWidth;

            /* Main horizontal scroll tween */
            const tween = gsap.to(track, {
                x: () => -scrollDistance(),
                ease: 'none',
                scrollTrigger: {
                    trigger: stage,
                    pin: true,
                    scrub: 1,
                    end: () => '+=' + scrollDistance(),
                    invalidateOnRefresh: true,
                    anticipatePin: 1
                }
            });

            /* Panel content reveal (containerAnimation) */
            if (!reducedMotion) {
                panels.forEach((panel, i) => {
                    if (i === 0) return; /* first panel visible by default */
                    const inner = panel.querySelector('.panel__inner');
                    if (!inner) return;

                    gsap.from(inner, {
                        opacity: 0,
                        x: 60,
                        duration: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: panel,
                            containerAnimation: tween,
                            start: 'left 80%',
                            end: 'left 40%',
                            scrub: true
                        }
                    });
                });
            }
        });

        /* Skills stagger reveal */
        if (!reducedMotion) {
            const skillCards = document.querySelectorAll('#skills .skill-category');
            skillCards.forEach(card => {
                gsap.from(card, {
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });

            /* Interest cards stagger */
            const interestCards = document.querySelectorAll('.interest-card');
            interestCards.forEach((card, i) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 40,
                    scale: 0.95,
                    duration: 0.5,
                    delay: i * 0.06,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });

            /* Contact section reveal */
            const contactEl = document.querySelector('#contact .contact');
            if (contactEl) {
                gsap.from(contactEl, {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: '#contact',
                        start: 'top 70%',
                        toggleActions: 'play none none reverse'
                    }
                });
            }
        }
    }

    /* ── Scroll Progress Bar ──────────────────────────────── */
    function initScrollProgress() {
        const bar = document.getElementById('scrollProgress');
        if (!bar) return;

        ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: self => {
                bar.style.width = (self.progress * 100) + '%';
            }
        });
    }

    /* ── Navigation ───────────────────────────────────────── */
    function initNavigation() {
        const nav = document.getElementById('nav');
        const toggle = document.getElementById('navToggle');
        const links = document.getElementById('navLinks');
        const navLinks = document.querySelectorAll('.nav__link');

        /* Scroll class on nav */
        ScrollTrigger.create({
            trigger: document.body,
            start: '80px top',
            onEnter: () => nav.classList.add('scrolled'),
            onLeaveBack: () => nav.classList.remove('scrolled')
        });

        /* Active section tracking */
        const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'beyond', 'contact'];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (!section) return;

            ScrollTrigger.create({
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveNav(id),
                onEnterBack: () => setActiveNav(id)
            });
        });

        function setActiveNav(id) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.section === id);
            });
        }

        /* Nav link click — smooth scroll */
        navLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    /* Close mobile nav if open */
                    links.classList.remove('open');
                    toggle.classList.remove('active');
                }
            });
        });

        /* Mobile toggle */
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            links.classList.toggle('open');
        });
    }

    /* ── Theme Toggle ─────────────────────────────────────── */
    function initThemeToggle() {
        const btn = document.getElementById('themeToggle');
        const icon = document.getElementById('themeIcon');
        const stored = localStorage.getItem('theme');
        if (stored) {
            document.documentElement.setAttribute('data-theme', stored);
            updateIcon(stored);
        }

        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateIcon(next);
        });

        function updateIcon(theme) {
            icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    /* ── Back to Top ──────────────────────────────────────── */
    function initBackToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;

        ScrollTrigger.create({
            trigger: document.body,
            start: '600px top',
            onEnter: () => btn.classList.add('visible'),
            onLeaveBack: () => btn.classList.remove('visible')
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ── Service Worker ───────────────────────────────────── */
    function initServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(() => {});
        }
    }

    /* ── Global Utilities (called from HTML onclick) ──────── */

    /* Copy Email */
    window.copyEmail = function () {
        const email = 'shaveenudayanga@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            showToast('Email copied to clipboard!');
        }).catch(() => {
            /* Fallback */
            const ta = document.createElement('textarea');
            ta.value = email;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast('Email copied to clipboard!');
        });
    };

    function showToast(message) {
        const toast = document.getElementById('toast');
        const msg = document.getElementById('toastMessage');
        if (!toast) return;
        msg.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    /* Certificate Modal */
    window.openCertModal = function (src) {
        const modal = document.getElementById('certModal');
        const img = document.getElementById('certImage');
        const dl = document.getElementById('certDownload');
        img.src = src;
        dl.href = src;
        modal.classList.add('active');
    };

    window.closeCertModal = function () {
        document.getElementById('certModal').classList.remove('active');
    };

    /* Close modal on backdrop click */
    document.addEventListener('click', e => {
        const modal = document.getElementById('certModal');
        if (e.target === modal) window.closeCertModal();
    });

    /* Close modal on Escape */
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') window.closeCertModal();
    });

})();
