import './css/styles.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectElement = document.querySelector('.breed-select');

fetchBreeds();
selectElement.addEventListener('change', function (event) {
  const selectedValue = event.target.value;
  fetchCatByBreed(selectedValue);
});
