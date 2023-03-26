import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const searchCountry = debounce(() => {
  const searchTerm = searchBox.value.trim();

  if (searchTerm === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(searchTerm)
    .then(data => {
      if (data.status === 404) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = 'Country not found';
      } else if (data.length === 1) {
        countryList.innerHTML = '';
        console.log(data);
        const countryHtml = `
          <h2>${data[0].name.official}</h2>
          <img src="${data[0].flags.svg}" alt="${data[0].name.official} flag" />
          <p>C a p i t a l:  ${data[0].capital}</p>
          <p>P o p u l a t i o n:  ${data[0].population}</p>
          <p>L a n g u a g e s:  ${Object.values(data[0].languages)}</p>
        `;
        countryInfo.innerHTML = countryHtml;
      } else if (data.length <= 10 && data.length >= 2) {
        const countryHtml = data
          .map(
            country => `
          <li><img src="${country.flags.svg}" alt="${country.name.official} flag" />${country.name.official}</li>
        `
          )
          .join('');
        countryList.innerHTML = `<ul>${countryHtml}</ul>`;
        countryInfo.innerHTML = '';
      } else
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
    })
    .catch(error => {
      console.error(error);
      countryList.innerHTML = '';
      countryInfo.innerHTML = 'Error fetching data';
    });
}, 300);

searchBox.addEventListener('input', searchCountry);
