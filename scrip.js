document.addEventListener("DOMContentLoaded", () => {
    // ===================================================
    // 1. ROLAGEM SUAVE COM DESCONTO DO HEADER DA NUPAC
    // ===================================================
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

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // ===================================================
    // 2. SISTEMA DE ANIMAÇÃO DE ROLAGEM (INTERSECTION OBSERVER)
    // ===================================================
    const animationOptions = {
        root: null,
        threshold: 0.12,
        rootMargin: "0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animated-visible");
                observer.unobserve(entry.target);
            }
        });
    }, animationOptions);

    const elementsToAnimate = document.querySelectorAll(".scroll-animation");
    elementsToAnimate.forEach(element => scrollObserver.observe(element));

    // ===================================================
    // 3. INTEGRAÇÃO DO FORMULÁRIO COM O INSTAGRAM
    // ===================================================
    const instaForm = document.getElementById("instaForm");

    if (instaForm) {
        instaForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = document.getElementById("instaName").value;
            const mensagem = document.getElementById("instaMessage").value;

            const textoFinal = `Olá NUPAC!\n\nMeu nome é: ${nome}\n\nMotivo do contato:\n${mensagem}`;

            navigator.clipboard.writeText(textoFinal).then(() => {
                alert("Sua mensagem foi copiada com sucesso! Estamos te direcionando para o nosso Instagram. Basta iniciar uma conversa e colar (Ctrl+V) o texto lá! 🐾");
                window.open("https://www.instagram.com/nupac_ong/?hl=pt", "_blank");
                instaForm.reset();
            }).catch(err => {
                console.error("Erro ao copiar: ", err);
                window.open("https://www.instagram.com/nupac_ong/?hl=pt", "_blank");
            });
        });
    }
});
