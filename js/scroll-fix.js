/* JERRY · Maputo — correção do scroll (2026-10-28, v2)
 *
 * Problema: na versão estática do site, o scroll ficava preso no hero.
 * A primeira correção (v1) tentava ligar o scroll suave (Lenis) com o
 * clique "Entrar" do preloader, mas o teste ao vivo mostrou que isso
 * não chegou: a roda do rato e o deslizar continuavam sem mover a
 * página, enquanto o teclado (PageDown/End) funcionava. Ou seja, algum
 * código do app.js continua a intercetar a roda/deslize e a impedir
 * o scroll nativo, sem o fazer avançar.
 *
 * Correção v3: além de manter o desbloqueio do preloader, este
 * ficheiro interceta a roda e o deslizar VERTICAL na fase de captura
 * (documento, antes de chegarem à janela, onde o scroll suave os
 * apanha) e impede-os de chegarem lá — sem impedir o scroll nativo
 * do navegador, que assim acontece normalmente. Gestos horizontais
 * dentro das coleções horizontais não são tocados, para não partir
 * o arrastar lateral dessas filas. O menu continua a bloquear o
 * scroll enquanto estiver aberto, como no original.
 *
 * Novidade v3: o próprio Lenis tem uma saída — elementos com o atributo
 * data-lenis-prevent (ou data-lenis-prevent-wheel / -touch) são ignorados
 * pelo scroll suave, sem impedir o scroll nativo. Por isso o #app já vem
 * com esses atributos no index.html, e este ficheiro volta a pô-los
 * (caso a página em cache ainda não os tenha). E o ficheiro passou a ser
 * carregado com ?v=3, para o navegador não servir a versão antiga em
 * cache em vez desta.
 */
(function () {
  var tried = 0;
  function menuOpen() {
    var menu = document.querySelector(".menu");
    return !!(menu && menu.classList.contains("active"));
  }
  function markPrevent() {
    var app = document.getElementById("app");
    if (app) {
      app.setAttribute("data-lenis-prevent", "");
      app.setAttribute("data-lenis-prevent-wheel", "");
      app.setAttribute("data-lenis-prevent-touch", "");
    }
    document.body.setAttribute("data-lenis-prevent", "");
    document.body.setAttribute("data-lenis-prevent-wheel", "");
    document.body.setAttribute("data-lenis-prevent-touch", "");
  }
  markPrevent();
  function unlock() {
    if (menuOpen()) return;
    var enter = document.querySelector(".preloader__enter");
    if (enter) {
      try { enter.click(); } catch (e) { /* botão já não existe, seguir */ }
    }
    document.documentElement.classList.add("active");
    document.documentElement.classList.remove("lenis-stopped");
    var pre = document.getElementById("preloader");
    if (pre) {
      pre.style.display = "none";
      pre.style.pointerEvents = "none";
    }
    tried++;
  }
  unlock();
  [500, 1500, 3000].forEach(function (ms) {
    setTimeout(unlock, ms);
  });
  window.addEventListener("load", function () {
    setTimeout(unlock, 300);
  });

  function insideHorizontal(el) {
    while (el && el !== document.documentElement) {
      if (el.classList && (
        el.classList.contains("horizontal-container") ||
        el.classList.contains("collection-horizontal-wrapper") ||
        el.classList.contains("swiper")
      )) return true;
      el = el.parentNode;
    }
    return false;
  }
  function isVerticalWheel(e) {
    return Math.abs(e.deltaY) >= Math.abs(e.deltaX);
  }
  // Roda do rato: vertical, fora das coleções horizontais e com o menu
  // fechado -> não deixar chegar ao scroll suave; o navegador faz o
  // scroll nativo.
  document.addEventListener("wheel", function (e) {
    if (menuOpen() || insideHorizontal(e.target)) return;
    if (isVerticalWheel(e)) e.stopPropagation();
  }, true);

  // Deslizar no telemóvel: guardar o ponto de partida e, no movimento,
  // se for vertical, impedir que chegue ao scroll suave.
  var startX = 0, startY = 0, tracking = false;
  document.addEventListener("touchstart", function (e) {
    if (e.touches && e.touches.length) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
    }
  }, true);
  document.addEventListener("touchmove", function (e) {
    if (!tracking || menuOpen() || insideHorizontal(e.target)) return;
    if (e.touches && e.touches.length) {
      var dx = e.touches[0].clientX - startX;
      var dy = e.touches[0].clientY - startY;
      if (Math.abs(dy) > Math.abs(dx)) e.stopPropagation();
    }
  }, true);
  document.addEventListener("touchend", function () { tracking = false; }, true);

  // Último recurso: no primeiro gesto, se a página ainda estiver presa
  // no topo, desbloquear outra vez.
  function onGesture() {
    if (window.scrollY === 0 && tried < 10) unlock();
    window.removeEventListener("wheel", onGesture, true);
    window.removeEventListener("touchstart", onGesture, true);
    window.removeEventListener("pointerdown", onGesture, true);
  }
  window.addEventListener("wheel", onGesture, true);
  window.addEventListener("touchstart", onGesture, true);
  window.addEventListener("pointerdown", onGesture, true);
})();
