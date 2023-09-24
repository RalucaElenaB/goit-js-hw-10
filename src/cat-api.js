import { Notify } from 'notiflix';
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_a8YTXyCX2Slfw0Pg7uejI0lhdoBo3wrA9p9dSRWjSQx0Qplh0HLgTKXLO7VRpeQY';
const catInfoHtml = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

function fetchBreeds() {
  loader.hidden = false;
  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (response.data.length > 0) {
        populateBreedsSelector(response.data);
      } else {
        Notify.warning('Oops! No breed cat was found. Try reloading the page!');
      }
      loader.hidden = true;
    })
    .catch(function (error) {
      loader.hidden = true;
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

function fetchCatByBreed(breedId) {
  loader.hidden = false;
  axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.data.length > 0) {
        const catInfo = response.data[0];
        populateCatInfo(catInfo);
      } else {
        Notify.warning(
          'Oops! No cat was found for selected breed. Try reloading the page!'
        );
        catInfoHtml.innerHTML = '';
      }
      loader.hidden = true;
    })
    .catch(function (error) {
      loader.hidden = true;
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      catInfoHtml.innerHTML = '';
    });
}

function populateCatInfo(catInfo) {
  catInfoHtml.innerHTML = `
        <div class='cat-info-img'><img src=${catInfo.url} alt=${catInfo.breeds[0].name}></div>
        <div class='cat-info-item'>
          <h2>Denumirea rasei: ${catInfo.breeds[0].name}</h2>
          <p>Descriere: ${catInfo.breeds[0].description}</p>
          <p>Temperament: ${catInfo.breeds[0].temperament}</p>
        </div>`;
}

function populateBreedsSelector(breeds) {
  const selectElement = document.querySelector('.breed-select');
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.text = breed.name;
    selectElement.appendChild(option);
  });
}

export { fetchBreeds, fetchCatByBreed };
