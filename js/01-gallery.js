import { galleryItems } from "./gallery-items.js";

const galleryContainerRef = document.querySelector(".gallery");

const galleryMarkup = createGalleryMarkup(galleryItems);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
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

  const imgInModal = event.target.dataset.source;

  if (event.target.nodeName !== "IMG") {
    return;
  }
  const instance = basicLightbox.create(`
    <img src='${imgInModal}' width="800" height="600">
`);
  instance.show();

  galleryContainerRef.addEventListener(
    "keydown",
    (event) => {
      if (event.code === "Escape") {
        instance.close();
      }
    },
    { once: true }
  );
}

console.log(galleryItems);
