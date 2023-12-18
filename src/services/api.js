import axios from "axios";

const apiURL = "http://dataservice.accuweather.com/";
//const apiKey = 'hSLuFT174doan2maqSXlinH8fiCWgQq9';
//const apiKey = 'M3uRuE4GDtgEJjgQ0Ik24pS3ShQIz519';

//const apiKey = 'JirUf4AaqvKuJEA48MJtCF8FAAINu8kj';
const apiKey = 'UKpjmRddsUSGtOhUGlrZNaSNLe3mTiNe';

export const getSearchResults = (q) => {
    return axios.get(
        `${apiURL}locations/v1/cities/autocomplete?apikey=${apiKey}&q=${q}`
    );
}

export const getCurrentConditions = (LocationKey) => {
    return axios.get(
        `${apiURL}currentconditions/v1/${LocationKey}?apikey=${apiKey}&details=true&metric=true`
    );
}

export const getFiveDaysForecast = (LocationKey) => {
    return axios.get(
        `${apiURL}forecasts/v1/daily/5day/${LocationKey}?apikey=${apiKey}&details=true&metric=true`
    );
}

export const getGeopositionResults =  ({latitude, longitude}) => {
    return axios.get(
        `${apiURL}locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${ latitude },${longitude}&details=true`
    );
}

