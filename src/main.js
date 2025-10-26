import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import { fetchImages } from './js/pixabay-api';
import { createCard } from './js/render-functions';

const refs = {
  listImg: document.querySelector('.gallery'),
  formSearch: document.querySelector('.form'),
  loader: document.querySelector('.loader'),
  loadMore: document.querySelector('.js-load-more'),
};

let inputValue = null;
let page = null;
refs.loader.style.display = 'none';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const onFormSearchSubmit = async e => {
  e.preventDefault();
  inputValue = e.target.elements.search.value;
  page = 1;

  if (!inputValue) return;

  refs.loader.style.display = 'block';

  try {
    const res = await fetchImages(inputValue);

    console.log(res);

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

    if (res.hits.length < res.total) {
      refs.loadMore.classList.remove('is-hiden');
    }

    const card = res.hits.map(card => createCard(card)).join('');
    refs.listImg.innerHTML = card;
    refs.formSearch.reset();
    lightbox.refresh();
  } catch (err) {
    console.log(err.status);
  } finally {
    refs.loader.style.display = 'none';
  }
};

const onLoadMoreSubmit = async e => {
  e.preventDefault();
  page++;

  try {
    const res = await fetchImages(inputValue, page);
    console.log(res);

    if (Math.ceil(res.total / res.hits.length) >= page) {
      refs.loadMore.classList.add('is-hiden');
    }

    const card = res.hits.map(card => createCard(card)).join('');
    // console.log(card);

    refs.listImg.insertAdjacentHTML('beforeend', card);

    lightbox.refresh();
  } catch (err) {
    console.log(err.status);
  } finally {
    refs.loader.style.display = 'none';
  }
};
refs.formSearch.addEventListener('submit', onFormSearchSubmit);

refs.loadMore.addEventListener('click', onLoadMoreSubmit);

// fetchImages(inputValue)
//   .then(res => {
//     if (!res.hits.length) {
//       iziToast.error({
//         message:
//           'Sorry, there are no images matching your search query. Please try again!',
//         position: 'topRight',
//       });
//       refs.listImg.innerHTML = '';
//       refs.formSearch.reset();
//       return;
//     }

//     const card = res.hits.map(card => createCard(card)).join('');
//     console.log('card', card);

//     refs.listImg.innerHTML = card;
//     refs.formSearch.reset();
//     lightbox.refresh();
//   })
//   .catch(err => console.log(err.status))
//   .finally(() => {
//     refs.loader.style.display = 'none';
//   });
