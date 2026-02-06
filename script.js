document.addEventListener("DOMContentLoaded", () => {
  const introCard = document.getElementById("intro");
  const otherCards = document.querySelectorAll(".card:not(#intro)");
  const modals = document.querySelectorAll(".modal");

  // Start in splash mode
  introCard.classList.add("splash");

  // After 1 second, dock the intro card
  setTimeout(() => {
    introCard.classList.remove("splash");
    introCard.classList.add("docked");

    // Fade in other cards AFTER docking finishes
    setTimeout(() => {
      otherCards.forEach((card, index) => {
        card.style.animation = `cardFadeIn 0.6s ease forwards ${(index + 1) * 0.2}s`;
      });
    }, 100); // matches CSS transition duration
  },1000);

  // --- Card Click → Open Modal (skip intro) ---
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const targetId = card.getAttribute("data-target");
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        targetModal.classList.add("active");
      }
    });
  });

  // --- Modal Close Logic ---
modals.forEach(modal => {
  // Skip adding close button for the splash/intro modal
  if (modal.id !== "intro") {
    if (!modal.querySelector(".close-btn")) {
      const closeBtn = document.createElement("button");
      closeBtn.textContent = "Close";
      closeBtn.classList.add("close-btn");
      modal.querySelector(".modal-content").appendChild(closeBtn);

      closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
      });
    }
  }

  // Close when clicking outside modal-content (works for all modals)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
});

});
