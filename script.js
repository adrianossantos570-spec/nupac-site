document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const INSTAGRAM = "https://www.instagram.com/nupac_ong/?hl=pt";

  // ===== HEADER (vidro fosco ao rolar) =====
  const header = $(".header");
  const aoRolar = () => header.classList.toggle("scrolled", scrollY > 20);
  addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();

  // ===== MENU MOBILE =====
  const toggle = $(".menu-toggle");
  const menu = $("#menu");
  const setMenu = aberto => {
    menu.classList.toggle("open", aberto);
    toggle.setAttribute("aria-expanded", aberto);
    toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  };
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  $$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));

  // ===== LINK ATIVO =====
  const links = $$(".navbar a");
  const ativo = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.hash === `#${e.target.id}`));
  }), { rootMargin: "-45% 0px -50% 0px" });
  links.forEach(a => { const s = $(a.hash); if (s) ativo.observe(s); });

  // ===== REVEAL AO ROLAR =====
  const revelar = new IntersectionObserver((es, obs) => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("visible");
    obs.unobserve(e.target);
  }), { threshold: 0.15 });
  $$(".reveal").forEach(el => revelar.observe(el));

  // ===== CONTADORES ANIMADOS =====
  // data-count="years" calcula os anos desde a fundação (06/02/2015); os demais usam o número informado.
  const anos = Math.floor((Date.now() - new Date(2015, 1, 6)) / 31557600000);
  const contar = new IntersectionObserver((es, obs) => es.forEach(e => {
    if (!e.isIntersecting) return;
    obs.unobserve(e.target);
    const el = e.target;
    const alvo = el.dataset.count === "years" ? anos : Number(el.dataset.count) || 0;
    const sufixo = el.dataset.suffix || "";
    if (reduz || alvo === 0) { el.textContent = alvo.toLocaleString("pt-BR") + (alvo ? sufixo : ""); return; }
    const t0 = performance.now(), dur = 1800;
    const passo = t => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(alvo * (1 - Math.pow(1 - p, 3))).toLocaleString("pt-BR") + (p === 1 ? sufixo : "");
      if (p < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  }), { threshold: 0.6 });
  $$("[data-count]").forEach(el => contar.observe(el));

  // ===== CARROSSEL =====
  const track = $(".track");
  $(".prev").addEventListener("click", () => track.scrollBy({ left: -track.clientWidth * 0.8, behavior: "smooth" }));
  $(".next").addEventListener("click", () => track.scrollBy({ left: track.clientWidth * 0.8, behavior: "smooth" }));

  // ===== LIGHTBOX =====
  const lb = $(".lightbox");
  const lbImg = $("img", lb);
  const fotos = $$(".slide img");
  let atual = 0;
  const abrir = i => {
    atual = (i + fotos.length) % fotos.length;
    lbImg.src = fotos[atual].src;
    lbImg.alt = fotos[atual].alt;
    lb.classList.add("open");
    $(".lb-close").focus();
  };
  const fechar = () => lb.classList.remove("open");
  fotos.forEach((img, i) => img.parentElement.addEventListener("click", () => abrir(i)));
  $(".lb-close").addEventListener("click", fechar);
  $(".lb-prev").addEventListener("click", () => abrir(atual - 1));
  $(".lb-next").addEventListener("click", () => abrir(atual + 1));
  lb.addEventListener("click", e => { if (e.target === lb) fechar(); });
  addEventListener("keydown", e => {
    if (e.key === "Escape") { fechar(); setMenu(false); }
    if (lb.classList.contains("open")) {
      if (e.key === "ArrowLeft") abrir(atual - 1);
      if (e.key === "ArrowRight") abrir(atual + 1);
    }
  });

  // ===== COPIAR PIX =====
  const btnPix = $("#btnCopyPix");
  btnPix.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("38988464483");
      btnPix.textContent = "Chave copiada! ✓";
    } catch {
      btnPix.textContent = "Copie manualmente: (38) 98846-4483";
    }
    setTimeout(() => (btnPix.textContent = "Copiar chave Pix"), 2500);
  });

  // ===== FORMULÁRIO → INSTAGRAM =====
  const form = $("#instaForm");
  const status = $("#formStatus");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const texto = `Olá NUPAC!\n\nMeu nome é: ${$("#instaName").value}\n\nMotivo do contato:\n${$("#instaMessage").value}`;
    try {
      await navigator.clipboard.writeText(texto);
      status.textContent = "Mensagem copiada! Cole no Instagram da NUPAC. 🐾";
    } catch {
      status.textContent = "Abrindo o Instagram. Escreva sua mensagem por lá.";
    }
    window.open(INSTAGRAM, "_blank", "noopener");
    form.reset();
  });
});
