export const createCard = img => {
  return `<li class="gallery-item">
    <a class="gallery-link" href="${img.largeImageURL}">
      <img
        class="gallery-image"
        src="${img.webformatURL}"
        alt="${img.tags}"
        />
    </a>
    <div class="container-description-img">
        <div class="description-item">
          <span class="img-label">likes</span>
          <span class="img-value">${img.likes}</span>
        </div>
        <div class="description-item">
          <span class="img-label">views</span>
          <span class="img-value">${img.views}</span>
        </div>
         <div class="description-item">
          <span class="img-label">comments</span>
          <span class="img-value">${img.comments}</span>
        </div>
           <div class="description-item">
          <span class="img-label">downloads</span>
          <span class="img-value">${img.downloads}</span>
        </div>
    </div>
  </li>
  `;
};
