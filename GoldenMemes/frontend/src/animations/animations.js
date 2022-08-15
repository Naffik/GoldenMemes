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
  t1.from(container, { duration: 0.3, yPercent: 95, ease: "power2.in" });
  t1.from(elements, { duration: 0.3, yPercent: -35, ease: "power2.in" });
}

export function exitSearch(container, elements) {
  gsap.to(elements, { duration: 0.3, yPercent: -35, ease: "power2.in", delay: 0.2 });
  gsap.to(container, { duration: 0.3, yPercent: 100, ease: "power2.in" });
}
