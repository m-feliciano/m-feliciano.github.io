// verify if the DOM is loaded
const ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}

// start the magic, if the DOM and js are loaded
ready(function () {
    if (document.documentElement == undefined
        || !document.documentElement.className.includes('js')) {
        return;
    }

    initAnimations();
});

function initAnimations() {
    showOnScroll();
    smoothScroll();
}

// smooth scroll - IIFE (Immediately Invoked Function Expression)
function smoothScroll() {
    const menuTab = document.querySelectorAll('[data-tab="menu"] a[href^="#"]');

    if (menuTab.length) {
        menuTab.forEach((e) => {
            e.addEventListener('click', function (e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                const section = document.querySelector(href);
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            });
        });
    }
}

// Animate on scroll - IIFE
function showOnScroll() {
    const sections = document.querySelectorAll('[data-anime="scroll"]');

    if (sections.length) {
        const windowHalf = window.innerHeight * 0.6;

        window.addEventListener('scroll', function () {
            sections.forEach((section) => {
                const sectionTop = section.getBoundingClientRect().top;
                const isSectionVisible = sectionTop - windowHalf < 0;
                if (isSectionVisible) {
                    section.classList.add('ativo');
                } else {
                    section.classList.remove('ativo');
                }
            });
        });
    }
}