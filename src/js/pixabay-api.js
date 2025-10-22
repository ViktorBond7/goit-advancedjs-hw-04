const API_KEY = '41712066-bd7b5e249df7a86bd45ef70ea';
const BASE_URL = 'https://pixabay.com/api/';

const BASE_PARAMS = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export const fetchImages = query => {
  const q = (query ?? '').trim();

  const param = new URLSearchParams({ ...BASE_PARAMS, q });
  const url = `${BASE_URL}?${param.toString()}`;

  return fetch(url).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    } else {
      return res.json();
    }
  });
};
