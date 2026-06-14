const galleryImages = document.querySelectorAll(".gallery-grid img");
const modal = document.getElementById("imageModal");
const modalImage = modal?.querySelector("img");
const modalCloseButtons = document.querySelectorAll("[data-close='true']");
const contactForm = document.getElementById("contactForm");
const formMessage = document.querySelector(".form-message");

function openModal(imageSrc, altText) {
  if (!modal || !modalImage) return;
  modalImage.src = imageSrc;
  modalImage.alt = altText;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  if (modalImage) {
    modalImage.src = "";
  }
}

galleryImages.forEach((image) => {
  image.addEventListener("click", () => {
    const src = image.dataset.large || image.src;
    const alt = image.alt || "Gambar galeri";
    openModal(src, alt);
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get("nama")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("pesan")?.toString().trim();

    if (!name || !email || !message) {
      formMessage.textContent =
        "Silakan isi semua kolom sebelum mengirim pesan.";
      return;
    }

    formMessage.textContent = `Terima kasih, ${name}! Pesan Anda telah terkirim.`;
    contactForm.reset();
  });
}
