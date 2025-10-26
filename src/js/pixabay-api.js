import axios from 'axios';
import iziToast from 'izitoast';

const API_KEY = '41712066-bd7b5e249df7a86bd45ef70ea';
const BASE_URL = 'https://pixabay.com/api/';

export const BASE_PARAMS = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 15,
};

export const fetchImages = async (query, page = 1) => {
  const q = (query ?? '').trim();

  if (q === '') {
    iziToast.info({
      message: 'Sorry, enter a word to search!',
      position: 'topRight',
    });
    return;
  }

  const param = new URLSearchParams({ ...BASE_PARAMS, q, page });
  const url = `${BASE_URL}?${param.toString()}`;
  const response = await axios.get(url);

  return response.data;
};
