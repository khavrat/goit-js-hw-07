import { galleryItems } from "./gallery-items.js";

const galleryContainerRef = document.querySelector(".gallery");

const galleryMarkup = createGalleryMarkup(galleryItems);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
  <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}
galleryContainerRef.insertAdjacentHTML("beforeend", galleryMarkup);
galleryContainerRef.addEventListener("click", onImgInModal);

function onImgInModal(event) {
  event.preventDefault();
  const isImgEl = event.target.classList.contains("gallery__image");
  if (!isImgEl) {
    return;
  }
  const imgInModal = event.target.dataset.source;

  const instance = basicLightbox.create(
    `
      <img src='${imgInModal}' width="800" height="600">
  `
  );
  instance.show();
  
  document.addEventListener("keydown", handlePressEscKey);
  function handlePressEscKey(event) {
    if (event.code !== "Escape") return;
    if (event.code === "Escape") instance.close();
    document.removeEventListener("keydown", handlePressEscKey);
  }
}

console.log(galleryItems);
