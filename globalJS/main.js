// for the fade in animation in the page
const items = document.querySelectorAll(".fade-in");

const pageObserver = new IntersectionObserver(
  (entres) => {
    entres.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      if (entry.isIntersecting) pageObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.4,
  }
);

items.forEach((item) => {
  pageObserver.observe(item);
});
