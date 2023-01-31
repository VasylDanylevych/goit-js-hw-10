const HOST = "https://restcountries.com";
const PARAMETERS = "fields=name,capital,population,flags,languages";


function fetchCountries(name) {
    return fetch(`${HOST}/v3.1/name/${name}?${PARAMETERS}`)
    .then((res) => {
        if (!res.ok) {
            throw new Error(res.status);
          }
        return res.json()});
};

export { fetchCountries };

