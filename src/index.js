import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('#country-list');
const countryInfo = document.querySelector('#country-info');

const searchCountry = debounce(() => {
  const searchTerm = searchBox.value.trim();

  if (searchTerm === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetch(
    `https://restcountries.com/v3.1/all?fields=name,flags,capital,population,languages`
  )
    .then(response => response.json())
    .then(data => {
      if (data.status === 404) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = 'Country not found';
      } else if (data.length === 1) {
        countryList.innerHTML = '';
        const countryHtml = `
          <h2>${official}</h2>
          <img src="${flags}" alt="${official} flag" />
          <p>Capital: ${capital}</p>
          <p>Population: ${population}</p>
          <p>Languages: ${languages}</p>
        `;
        countryInfo.innerHTML = countryHtml;
      } else {
        const countryHtml = data
          .map(
            country => `
          <li>${country.name}</li>
        `
          )
          .join('');
        countryList.innerHTML = `<ul>${countryHtml}</ul>`;
        countryInfo.innerHTML = '';
      }
    })
    .catch(error => {
      console.error(error);
      countryList.innerHTML = '';
      countryInfo.innerHTML = 'Error fetching data';
    });
}, 300);

searchBox.addEventListener('input', searchCountry);
