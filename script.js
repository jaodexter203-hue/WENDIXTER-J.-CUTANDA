const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const navLinks = [...document.querySelectorAll(".nav-links a")];
const navToggle = document.querySelector(".nav-toggle");
const navLinksContainer = document.getElementById("primary-navigation");
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActiveLink() {
  const scrollPosition = window.scrollY + 120;
  let currentSection = sections[0];

  sections.forEach((section) => {
    if (section.offsetTop <= scrollPosition) {
      currentSection = section;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${currentSection.id}`);
  });
}

navToggle?.addEventListener("click", () => {
  const isOpen = navLinksContainer?.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinksContainer?.classList.contains("is-open")) {
      navLinksContainer.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  });
});

window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("load", setActiveLink);

const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.querySelector(".modal-close");
const projectImages = document.querySelectorAll(".project img");

function openImageModal(image) {
  if (!imageModal || !modalImage) return;
  modalImage.src = image.src;
  modalImage.alt = image.alt;
  imageModal.classList.add("is-open");
  imageModal.setAttribute("aria-hidden", "false");
}

function closeImageModal() {
  if (!imageModal || !modalImage) return;
  imageModal.classList.remove("is-open");
  imageModal.setAttribute("aria-hidden", "true");
  modalImage.src = "";
  modalImage.alt = "";
}

projectImages.forEach((image) => {
  image.addEventListener("click", () => openImageModal(image));
});

closeModal?.addEventListener("click", closeImageModal);

imageModal?.addEventListener("click", (event) => {
  if (event.target === imageModal) {
    closeImageModal();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeImageModal();
  }
});
