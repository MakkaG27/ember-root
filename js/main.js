/* ==========================================================
   Ember Root – landingspagina
   1. Pauzeknop voor de video (autoplay moet je kunnen stoppen)
   2. Zachte animatie als secties in beeld komen
   Zonder JavaScript werkt de pagina ook: alles blijft zichtbaar.
   ========================================================== */

document.documentElement.classList.add("js");

const minderBeweging = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 1. Video ---------- */
const video = document.querySelector(".video__player");
const knop = document.querySelector(".video__toggle");

if (video && knop) {
  const knopIcoon = knop.querySelector(".video__toggle-icon");
  const knopTekst = knop.querySelector(".video__toggle-text");

  const toonStatus = () => {
    const gepauzeerd = video.paused;
    knop.setAttribute("aria-pressed", String(gepauzeerd));
    knopIcoon.textContent = gepauzeerd ? "▶" : "❚❚";
    knopTekst.textContent = gepauzeerd ? "Speel video af" : "Pauzeer video";
  };

  // Wie minder beweging wil (instelling in het besturingssysteem), krijgt geen autoplay.
  if (minderBeweging) {
    video.removeAttribute("autoplay");
    video.pause();
  }

  knop.addEventListener("click", () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  video.addEventListener("play", toonStatus);
  video.addEventListener("pause", toonStatus);
  toonStatus();
}

/* ---------- 2. Animatie bij scrollen ---------- */
const blokken = document.querySelectorAll(".reveal");

if (!minderBeweging && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--zichtbaar");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );
  blokken.forEach((blok) => observer.observe(blok));
} else {
  blokken.forEach((blok) => blok.classList.add("reveal--zichtbaar"));
}

/* ---------- 3. Focus naar het formulier na klikken op een knop ---------- */
document.querySelectorAll('a[href="#formulier"]').forEach((link) => {
  link.addEventListener("click", () => {
    const formulier = document.getElementById("formulier");
    if (formulier) {
      // focus zonder extra sprong, zodat toetsenbord- en schermlezergebruikers meteen bij het formulier zitten
      setTimeout(() => formulier.focus({ preventScroll: true }), 400);
    }
  });
});
