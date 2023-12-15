import { createSlice } from "@reduxjs/toolkit";

export const citySlice = createSlice({

    name: "city",
    initialState: {
        name: "Tel Aviv",
        key: "215854",
        tempF: "100",
        tempC: "32",
        sky: "Sunny",
        icon: 1,
        forecast:[],
        favorites:[]
    },
    reducers: {
        setChosenCity: (state, action) => {
            console.log('action.payload => ', action.payload)
            //state.name = action.payload.name;
            state.tempF = action.payload.Temperature.Imperial.Value;
            state.tempC = action.payload.Temperature.Metric.Value;
            state.sky = action.payload.WeatherText;
            state.icon = action.payload.WeatherIcon;
            //forecast goes here
        },
        setChosenCityNameAndKey: (state, action) => {
            console.log('action.payload => ', action.payload)
            state.name = action.payload.label;
            state.key = action.payload.key;
        },
        setForecast: (state,action) => {
            console.log('action.payload', action.payload)
            state.forecast = action.payload;
        },
        addToFavorites: (state, action) => {
            state;
            action;
        },
        removeFromFavorites: (state, action) => {
            state;
            action;
        }
    }

})

export const {setChosenCity, setChosenCityNameAndKey, setForecast} = citySlice.actions;

export default citySlice.reducer