document.addEventListener('DOMContentLoaded', () => {
        // --- Theme toggle init ---
        const themeToggleBtn = document.getElementById('theme-toggle');
        const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

        if (
            localStorage.getItem('color-theme') === 'dark' ||
            (
                !('color-theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches
            )
        ) {
            document.documentElement.classList.add('dark');
            themeToggleLightIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            themeToggleDarkIcon.classList.remove('hidden');
        }

        themeToggleBtn.addEventListener('click', () => {
            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        });

        // --- Mobile menu toggle ---
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const hamburgerIcon = document.getElementById('hamburger-icon');
        const closeIcon = document.getElementById('close-icon');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                // Toggle menu visibility
                mobileMenu.classList.toggle('hidden');

                // Toggle icons
                hamburgerIcon.classList.toggle('hidden');
                closeIcon.classList.toggle('hidden');
            });

            // Close mobile menu when clicking on a link
            const mobileMenuLinks = mobileMenu.querySelectorAll('a');
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    hamburgerIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                });
            });
        }

        // --- Scroll-animatie voor meerdere secties ---
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const el = entry.target;
                const isFeatures = el.id === 'features';

                if (entry.isIntersecting) {
                    // Fade-in: maak zichtbaar en zet transform naar 0
                    el.classList.remove('opacity-0', isFeatures ? 'translate-x-10' : '-translate-x-10');
                    el.classList.add('opacity-100', 'translate-x-0');
                } else {
                    // Fade-out: zet terug naar off-screen positie + opacity 0
                    el.classList.remove('opacity-100', 'translate-x-0');
                    if (isFeatures) {
                        el.classList.add('opacity-0', 'translate-x-10');
                    } else {
                        el.classList.add('opacity-0', '-translate-x-10');
                    }
                }
            });
        }, observerOptions);

        // Observeer beide elementen
        document.querySelectorAll('#secure-storage, #features')
            .forEach(el => {
                // Voor het geval je de klassen in HTML mist: forceer de init-staat
                el.classList.add('opacity-0');
                if (el.id === 'features') {
                    el.classList.add('translate-x-10');
                } else {
                    el.classList.add('-translate-x-10');
                }
                observer.observe(el);
            });
    });