import { galleryItems } from "./gallery-items.js";
const galleryContainerRef = document.querySelector(".gallery");

const galleryMarkup = createGalleryMarkup(galleryItems);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`;
    })
    .join("");
}
galleryContainerRef.insertAdjacentHTML("beforeend", galleryMarkup);

galleryContainerRef.addEventListener("click", onPictureInModal);

function onPictureInModal(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  } else {
    let lightbox = new SimpleLightbox(".gallery a", {
      fileExt: false,
      alertError: false,
      captionsData: "alt",
      captionDelay: 250,
    });
    return lightbox;
  }
}

console.log(galleryItems);
