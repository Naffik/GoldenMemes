import gsap from "gsap";

//gsap.registerPlugin(CSSPlugin);

export function slideDown(el) {
  gsap.from(el, { rotation: 27, x: 100, duration: 1 });
}

export function slideUp(el) {
  gsap.from(el, { rotation: 27, x: -100, duration: 1 });
}

export function slideLeftInAndOut(el, px) {
  gsap.from(el, {
    autoAlpha: 0,
    x: px,
    duration: 0.5,
    ease: "power2.in",
  });
  gsap.to(el, {
    x: px,
    duration: 0.5,
    delay: 2,
    ease: "power2.in",
  });
}

export function slideSearch(container, elements) {
  var t1 = gsap.timeline();
  t1.to(container, { duration: 0.3, autoAlpha: 1, top: 0, ease: "power2.in" });
  t1.from(elements, { duration: 0.3, y: -70, ease: "power2.in" });
}

export function exitSearch(container, elements) {
  var t1 = gsap.timeline();

  t1.to(elements, { duration: 0.3, yPercent: 600, ease: "power2.in" });
  t1.to(container, { duration: 0.3, autoAlpha: 0, top: 100, ease: "power2.in" });
  t1.to(elements, { yPercent: 0 });
}
