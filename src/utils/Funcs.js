import { setChosenCity, setChosenCityNameAndKey, setForecast } from "../redux/Slices/CitySlice";
import { getCurrentConditions, getFiveDaysForecast } from '../services/api';

export const setHeroCity = async (location, dispatch) => {
    try {
        const res = await getCurrentConditions(location.key);
        dispatch(setChosenCity(res.data[0]));
        dispatch(setChosenCityNameAndKey(location));

        const res2 = await getFiveDaysForecast(location.key);
        dispatch(setForecast(res2.data.DailyForecasts));

    }
    catch (e) { console.error('error:', e.message) }
}