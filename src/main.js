import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import { fetchImages } from './js/pixabay-api';
import { createCard } from './js/render-functions';

const refs = {
  listImg: document.querySelector('.gallery'),
  formSearch: document.querySelector('.form'),
  loader: document.querySelector('.loader'),
};

refs.loader.style.display = 'none';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const onFormSearchSubmit = e => {
  e.preventDefault();
  const inputValue = e.target.elements.search.value;

  if (!inputValue) return;

  refs.loader.style.display = 'block';
  fetchImages(inputValue)
    .then(res => {
      if (!res.hits.length) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        refs.listImg.innerHTML = '';
        refs.formSearch.reset();
        return;
      }

      const card = res.hits.map(card => createCard(card)).join('');

      refs.listImg.innerHTML = card;
      refs.formSearch.reset();
      lightbox.refresh();
    })
    .catch(err => console.log(err.status))
    .finally(() => {
      refs.loader.style.display = 'none';
    });
};

refs.formSearch.addEventListener('submit', onFormSearchSubmit);
