import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';


const input = document.getElementById("search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
const DEBOUNCE_DELAY = 300;

window.onload = () => input.focus();

input.addEventListener("input", debounce(inputValue, DEBOUNCE_DELAY));

function inputValue(e) {
    const input = e.target;
    const valueOnInput = input.value.trim();
    if (valueOnInput === "") {     
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";   
        return
    } else {
        fetchCountries(valueOnInput)
        .then((countries) => {
            // console.log(countries)
            if (countries.length > 10) {
                countryList.innerHTML = "";
                countryInfo.innerHTML = "";
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                return
            }  

            if (countries.length >= 2 && countries.length <= 10) {
                const countryListMarkup = countries.reduce((markup, country) => createListOfCountries(country) + markup, "")
                updateList(countryListMarkup)
                countryInfo.innerHTML = "";
                return
            }  

            if (countries.length = 1) {
                const countryCardMarkup =  countries.reduce((markup, country) => createCardOfCountry(country) + markup, "");
                updateInfo(countryCardMarkup);
                countryList.innerHTML = "";
                return
            }  

        })
        .catch(onError);
    }
};

function createListOfCountries(country) {
    return `
    <li class = "countries-list-item">
        <img class="flag-img" src="${country.flags.svg}"><p>${country.name.common}</p>
    </li>`
};

function createCardOfCountry(country) {
    return `
    <div class = "country-info-item">
        <div class = "country-item"><img class="flag-img" src="${country.flags.svg}"><h2>${country.name.common}</h2></div>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages).join(", ")}</p>
    </div>`
};

function updateList(markup) {
    countryList.innerHTML = markup;

};

function updateInfo(markup) {
    countryInfo.innerHTML = markup;

};


function onError() {
    Notiflix.Notify.failure("Oops, there is no country with that name")
};
