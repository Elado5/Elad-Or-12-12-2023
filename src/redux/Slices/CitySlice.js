import { createSlice } from "@reduxjs/toolkit";

export const citySlice = createSlice({

    name: "city",
    initialState: {
        name: "Loading...",
        key: "0",
        tempF: "0",
        tempC: "0",
        sky: "Loading Weather...",
        icon: 4,
        forecast:[],
    },
    reducers: {
        setChosenCity: (state, action) => {
            state.tempF = action.payload.Temperature.Imperial.Value;
            state.tempC = action.payload.Temperature.Metric.Value;
            state.sky = action.payload.WeatherText;
            state.icon = action.payload.WeatherIcon;
        },
        setChosenCityNameAndKey: (state, action) => {
            state.name = action.payload.label;
            state.key = action.payload.key;
        },
        setForecast: (state,action) => {
            state.forecast = action.payload;
        },
    }

})

export const {setChosenCity, setChosenCityNameAndKey, setForecast} = citySlice.actions;

export default citySlice.reducer