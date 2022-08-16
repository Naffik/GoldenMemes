import gsap from "gsap";

//gsap.registerPlugin(CSSPlugin);

export function slideDown(el) {
  gsap.from(el, { rotation: 27, x: 100, duration: 1 });
}

export function slideUp(el) {
  gsap.from(el, { rotation: 27, x: -100, duration: 1 });
}

export function slideSearch(container, elements) {
  var t1 = gsap.timeline();
  t1.to(container, { duration: 0.3, autoAlpha: 1, top: 0, ease: "power2.in" });
  t1.from(elements, { duration: 0.3, y: -30, ease: "power2.in" });
}

export function exitSearch(container, elements) {
  var t1 = gsap.timeline();

  t1.to(elements, { duration: 0.3, yPercent: 600, ease: "power2.in" });
  t1.to(container, { duration: 0.3, autoAlpha: 0, top: 95, ease: "power2.in" });
  t1.to(elements, { yPercent: 0 });
}
