/* JERRY · Maputo — correção do scroll (2026-10-28)
 *
 * Problema: na versão estática do site, o scroll ficava preso no hero.
 * Causa: o código original (app.js) cria o scroll suave (Lenis) parado
 * (jl.stop()) e só o liga quando se clica em "Entrar" no preloader
 * (que chama jl.start() e põe html.active). Na cópia estática o
 * preloader já vem escondido (display:none), por isso esse clique
 * nunca acontece e o Lenis parado bloqueia a roda do rato e o
 * deslizar no telemóvel — o teclado (ex. End) continuava a funcionar,
 * porque não passa por esse bloqueio.
 *
 * Correção: este ficheiro corre DEPOIS do app.js e dispara esse
 * mesmo clique no "Entrar" do preloader, várias vezes nos primeiros
 * segundos (caso o app.js ainda não tenha ligado o botão) e mais uma
 * vez no primeiro gesto da visitante, se a página ainda estiver presa
 * no topo e o menu não estiver aberto. Não muda o desenho, as fotos
 * nem os textos — só desbloqueia o scroll que o site já devia ter.
 */
(function () {
  var tried = 0;
  function menuOpen() {
    var menu = document.querySelector(".menu");
    return !!(menu && menu.classList.contains("active"));
  }
  function unlock() {
    if (menuOpen()) return;
    var enter = document.querySelector(".preloader__enter");
    if (enter) {
      try { enter.click(); } catch (e) { /* o botão já não existe, seguir */ }
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
  // Tentativas programadas: o app.js pode ainda não ter ligado o botão
  // na primeira tentativa.
  unlock();
  [500, 1500, 3000].forEach(function (ms) {
    setTimeout(unlock, ms);
  });
  window.addEventListener("load", function () {
    setTimeout(unlock, 300);
  });
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
