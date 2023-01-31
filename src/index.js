import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';


const input = document.getElementById("search-box");
const DEBOUNCE_DELAY = 300;
window.onload = () => input.focus();

input.addEventListener("input", debounce(inputValue, DEBOUNCE_DELAY));

function inputValue(e) {
    const input = e.target;
    const valueOnInpud = input.value.trim();
        fetchCountries(valueOnInpud)
        .then((countries) => {
            if (countries.length > 10) 
            return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            if (countries.length >= 2 && countries.length <= 10)
            return countries.reduce((markup, country) => createListOfCountries(country) + markup, "");
            if (countries.length = 1)
            return countries.reduce((markup, country) => createCardOfCountry(country) + markup, "");
        })
        .then(updateNewsList)
        .catch(onError);
        
};

function createListOfCountries(country) {
    return `
    <li>
        <img class="flag-img" src="${country.flags.svg}"><p>"${country.name.common}"</p>
    </li>`
};

function createCardOfCountry(country) {
    return `
    <img class="flag-img" src="${country.flags.svg}"><h2>"${country.name.common}"</h2>
    <p><strong>"Capital:</strong> ${country.capital[0]}"</p>
    <p><strong>"Population:</strong> ${country.population}"</p>
    <p><strong>"Languages:</strong> ${country.languages}"</p>
    `
};



function updateNewsList(markup) {
    document.querySelector(".country-list").innerHTML = markup;
};


function onError(err) {
    Notiflix.Notify.failure("Oops, there is no country with that name")
};



