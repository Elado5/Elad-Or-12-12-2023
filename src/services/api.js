import axios from "axios";

const apiURL = "https://dataservice.accuweather.com/";
const apiKey = '7OFmMfLLrCVq1cGjBWwo50xrGGTVdGbA';

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

