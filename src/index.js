import './css/styles.css';
import './fetchCountries.js';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('#country-list');
const countryInfo = document.querySelector('#country-info');

const countryHtml = `
          <h2>${country.name}</h2>
          <img src="${country.flag}" alt="${country.name} flag" />
          <p>Capital: ${country.capital}</p>
          <p>Population: ${country.population}</p>
          <p>Languages: ${country.languages}</p>
        `;
countryInfo.innerHTML = countryHtml;
