// Intersection Observer voor scroll-gebaseerde animaties
        document.addEventListener('DOMContentLoaded', function () {
            const servicesSection = document.getElementById('services-section');

            // Intersection Observer configuratie
            const observerOptions = {
                threshold: 0.3, // Trigger wanneer 30% van het element zichtbaar is
                rootMargin: '0px 0px -100px 0px' // Element moet verder in beeld zijn voordat animatie start
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Element komt voldoende in beeld - animatie starten
                        entry.target.classList.add('animate');
                    } else {
                        // Element gaat uit beeld of is nog niet ver genoeg zichtbaar - animatie resetten
                        entry.target.classList.remove('animate');
                    }
                });
            }, observerOptions);

            // Observer toevoegen aan services sectie
            if (servicesSection) {
                observer.observe(servicesSection);
            }
        });