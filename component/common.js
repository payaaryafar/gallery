export const API_KEY = "L5vefZoN0omkYrLbVqbe8AwoNoX2SIWpM86XVVAHkjZ5aVEPoX7qaInk";
export const PERPAGE = 15;
export let CURRENT_PAGE = 1;
export let searchTerm = null;

export const searchBox = document.querySelector(".search__box");
export const searchIcon = document.querySelector(".search__icon");
export const searchInput = document.querySelector(".search__Input");
export const images = document.querySelector(".images");
export const load = document.querySelector(".gallery__load");
export const lightBox = document.querySelector(".lightBox");
export const iconClose = document.querySelector(".uil-times");

export function getApiUrl(CURRENT_PAGE, PERPAGE) {
  return `https://api.pexels.com/v1/curated?page=${CURRENT_PAGE}&per_page=${PERPAGE}`;
}

export function getApiUrl_SEARCH(searchTerm, CURRENT_PAGE, PERPAGE) {
  return `https://api.pexels.com/v1/search?query=${searchTerm}&page=${CURRENT_PAGE}&per_page=${PERPAGE}`;
}

export const searchTerm_value = value => searchTerm = value;

export function nextPage() {
  CURRENT_PAGE++;
  console.log(CURRENT_PAGE);
}

export const resetPage = () => {
    CURRENT_PAGE = 1;
};