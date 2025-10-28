// import iziToast from 'izitoast';
// import SimpleLightbox from 'simplelightbox';

// import { fetchImages } from './js/pixabay-api';
// import { createCard } from './js/render-functions';
// import { BASE_PARAMS } from './js/pixabay-api';

// const refs = {
//   listImg: document.querySelector('.gallery'),
//   formSearch: document.querySelector('.form'),
//   loader: document.querySelector('.loader'),
//   loadMore: document.querySelector('.js-load-more'),
//   observer: document.querySelector('.observer'),
// };

// let inputValue = null;
// let page = null;
// refs.loader.style.display = 'none';
// const perPage = BASE_PARAMS.per_page;

// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// const onFormSearchSubmit = async e => {
//   e.preventDefault();
//   inputValue = e.target.elements.search.value;
//   page = 1;

//   if (!inputValue) return;

//   refs.loader.style.display = 'block';

//   try {
//     const res = await fetchImages(inputValue);

//     if (!res.hits.length) {
//       iziToast.error({
//         message:
//           'Sorry, there are no images matching your search query. Please try again!',
//         position: 'topRight',
//       });
//       refs.listImg.innerHTML = '';
//       refs.formSearch.reset();
//       refs.loadMore.classList.add('is-hiden');
//       return;
//     }

//     if (res.hits.length < res.total) {
//       refs.loadMore.classList.remove('is-hiden');
//     }

//     const card = res.hits.map(card => createCard(card)).join('');
//     refs.listImg.innerHTML = card;
//     refs.formSearch.reset();
//     lightbox.refresh();
//   } catch (err) {
//     console.log(err.status);
//   } finally {
//     refs.loader.style.display = 'none';
//   }
// };

// const onLoadMoreSubmit = async e => {
//   e.preventDefault();
//   page++;
//   refs.loader.style.display = 'block';
//   try {
//     const res = await fetchImages(inputValue, page);
//     const card = res.hits.map(card => createCard(card)).join('');
//     refs.listImg.insertAdjacentHTML('beforeend', card);

//     lightbox.refresh();

//     const heightImg = document
//       .querySelector('.gallery-item')
//       .getBoundingClientRect().height;

//     window.scrollBy({
//       top: heightImg * 2,
//       behavior: 'smooth',
//     });

//     const totalPages = Math.ceil(res.totalHits / perPage);
//     if (page >= totalPages) {
//       refs.loadMore.classList.add('is-hiden');
//       iziToast.info({
//         message: `We're sorry, but you've reached the end of search results.`,
//         position: 'topRight',
//       });
//     }
//   } catch (err) {
//     console.log(err.status);
//   } finally {
//     refs.loader.style.display = 'none';
//   }
// };

// refs.formSearch.addEventListener('submit', onFormSearchSubmit);
// refs.loadMore.addEventListener('click', onLoadMoreSubmit);

/////////////////////////////////--------SCROLL---------///////////////////////////////////////////

import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import { fetchImages } from './js/pixabay-api';
import { createCard } from './js/render-functions';
import { BASE_PARAMS } from './js/pixabay-api';

const refs = {
  listImg: document.querySelector('.gallery'),
  formSearch: document.querySelector('.form'),
  loader: document.querySelector('.loader'),
  observe: document.querySelector('.observer'),
};

let inputValue = null;
let page = null;
refs.loader.style.display = 'none';
const perPage = BASE_PARAMS.per_page;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let observerOptions = {
  root: null,
  rootMargin: '0px', // No extra margin
  threshold: 0.01, // Trigger when 1% of the image is visible
};
const imageObserver = new IntersectionObserver(
  colbeckObserver,
  observerOptions
);

const onFormSearchSubmit = async e => {
  e.preventDefault();
  inputValue = e.target.elements.search.value;
  page = 1;

  if (!inputValue) return;

  refs.loader.style.display = 'block';

  try {
    const res = await fetchImages(inputValue);

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

    imageObserver.observe(refs.observe);
  } catch (err) {
    console.log(err.status);
  } finally {
    refs.loader.style.display = 'none';
  }
};

refs.formSearch.addEventListener('submit', onFormSearchSubmit);

async function colbeckObserver(entries) {
  if (entries[0].isIntersecting) {
    page++;
    refs.loader.style.display = 'block';

    try {
      const res = await fetchImages(inputValue, page);
      const card = res.hits.map(card => createCard(card)).join('');
      refs.listImg.insertAdjacentHTML('beforeend', card);

      lightbox.refresh();

      const totalPages = Math.ceil(res.totalHits / perPage);
      if (page === totalPages) {
        imageObserver.unobserve(refs.observe);
        iziToast.info({
          message: `We're sorry, but you've reached the end of search results.`,
          position: 'topRight',
        });
      }
    } catch (err) {
      console.log(err.status);
    } finally {
      refs.loader.style.display = 'none';
    }
  }
}
