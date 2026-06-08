document.addEventListener("DOMContentLoaded", () => {
    // Rolagem suave
    const scrollLinks = document.querySelectorAll(".navbar a, .logo, .btn");
    const header = document.querySelector(".header");
    const alertBanner = document.querySelector(".top-alert-banner");

    scrollLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId && targetId.startsWith("#")) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const bannerHeight = alertBanner ? alertBanner.offsetHeight : 0;
                    const totalOffset = headerHeight + bannerHeight;
                    const targetPosition = targetSection.offsetTop - totalOffset;
                    window.scrollTo({ top: targetPosition, behavior: "smooth" });

                    // Fecha o menu hambúrguer após clicar
                    const navbar = document.querySelector(".navbar");
                    if (navbar && navbar.classList.contains("active")) {
                        navbar.classList.remove("active");
                    }
                }
            }
        });
    });

    // Animações de rolagem
    const animationOptions = { root: null, threshold: 0.12, rootMargin: "0px" };
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animated-visible");
                observer.unobserve(entry.target);
            }
        });
    }, animationOptions);
    document.querySelectorAll(".scroll-animation").forEach(el => scrollObserver.observe(el));

    // Integração com Instagram
    const instaForm = document.getElementById("instaForm");
    if (instaForm) {
        instaForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nome = document.getElementById("instaName").value;
            const mensagem = document.getElementById("instaMessage").value;
            const textoFinal = `Olá NUPAC!\n\nMeu nome é: ${nome}\n\nMotivo do contato:\n${mensagem}`;
            navigator.clipboard.writeText(textoFinal).then(() => {
                alert("Sua mensagem foi copiada! Abra o Instagram e cole (Ctrl+V). 🐾");
                window.open("https://www.instagram.com/nupac_ong/?hl=pt", "_blank");
                instaForm.reset();
            }).catch(() => {
                window.open("https://www.instagram.com/nupac_ong/?hl=pt", "_blank");
            });
        });
    }

    // Menu hambúrguer
    const toggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    if (toggle && navbar) {
        toggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
    }
});

