document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio site loaded successfully!");

  // Scroll-triggered animation logic
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => observer.observe(el));

  // Horizontal scroll tracking
  const sections = document.querySelectorAll(".horizontal-scroll .section");
  const scrollContainer = document.querySelector(".horizontal-scroll");

  scrollContainer.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionLeft = section.offsetLeft;
      const sectionWidth = section.offsetWidth;
      const scrollX = scrollContainer.scrollLeft;
      const containerWidth = scrollContainer.offsetWidth;

      if (
        scrollX + containerWidth / 2 >= sectionLeft &&
        scrollX + containerWidth / 2 < sectionLeft + sectionWidth
      ) {
        current = section.getAttribute("id");
      }
    });

    // You can use `current` to trigger other behaviors if needed
  });

  // Arrow button navigation
  const scrollLeftBtn = document.getElementById("scroll-left");
  const scrollRightBtn = document.getElementById("scroll-right");

  scrollLeftBtn.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: -window.innerWidth, behavior: "smooth" });
  });

  scrollRightBtn.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: window.innerWidth, behavior: "smooth" });
  });

  // Mobile swipe gesture support
  let startX = 0;

  scrollContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  scrollContainer.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        // Swipe left
        scrollContainer.scrollBy({ left: window.innerWidth, behavior: "smooth" });
      } else {
        // Swipe right
        scrollContainer.scrollBy({ left: -window.innerWidth, behavior: "smooth" });
      }
    }
  });
});
