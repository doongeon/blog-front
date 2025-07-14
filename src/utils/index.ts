const BASE_URL = 'http://localhost:8080';

const getThumbnailUrl = (storedFileName: string) =>
  BASE_URL + `/resources/thumbnail/${storedFileName}`;

export { getThumbnailUrl };
