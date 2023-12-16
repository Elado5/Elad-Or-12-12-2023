import { useCallback, useMemo, useState } from 'react';
import { TextField } from "@mui/material";
import Autocomplete, { } from "@mui/material/Autocomplete";
import { getSearchResults, getCurrentConditions, getFiveDaysForecast } from '../services/api';
import { isEnglish } from '../utils/alphabet';
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux';
import { setChosenCity, setChosenCityNameAndKey, setForecast } from '../redux/Slices/CitySlice';
import { useDebounce } from 'react-use';
//import toast
//get the weather api options inside the array

export const setHeroCity = async (location, dispatch) => {
    try {
        const res = await getCurrentConditions(location.key);
        console.log(res.data[0]);
        //action update Chosen city
        dispatch(setChosenCity(res.data[0]));
        dispatch(setChosenCityNameAndKey(location));
        
        const res2 = await getFiveDaysForecast(location.key);
        console.log("res2 ===> ", res2.data);
        dispatch(setForecast(res2.data.DailyForecasts));
        
    }
    catch (e) { console.log('error:', e.message) }
}
    const SearchStyle = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        .MuiAutocomplete-root{
            width: 33%;
        }
        padding: 2rem;
    `
const CitySearch = () => {

    const dispatch = useDispatch();

    const [value, setValue] = useState(null);
    const [locationsData, setLocationsData] = useState([]);
    
    const options = useMemo(() => locationsData.map((item) => (
        { label: `${item.LocalizedName} - ${item.Country.LocalizedName}`, key: `${item.Key}` }

    )), [locationsData])

    //change name to something that anyone can understand
    //? using useCallback so this function gets reallocated in memory only when the dependancy array (value in this case) changes
    const lookupLocation = useCallback(async () => {
        if (!value)
            return;
        try {
            const res = await getSearchResults(value);
            console.log(res);
            setLocationsData([...res.data]);
        }
        catch (e) { console.log('error:', e.message) }
    }, [value])


    const lookupAndSetLocation = useCallback(async (location) => {
        console.log('textInput', location)
        if (!location){
            return;
        }

        dispatch(setHeroCity(location, dispatch))
    },[dispatch]);

    useDebounce(lookupLocation, 500, [value])

    const onInputChange = useCallback((event, inputValue) => {
        if (inputValue !== value && isEnglish(inputValue)) {
                setValue(inputValue);
            }
                //TODO toast here
                console.log('please use english letters only');
        }
    , [value])

    const optionLabel = useCallback((option) => {
        if (typeof option === 'string') {
            return option;
        }
        // Regular option
        return option.label;
    },[])

    const onSelectCity = useCallback((e,inputValue) => lookupAndSetLocation(inputValue),[lookupAndSetLocation])

    return (
        <SearchStyle>
            <Autocomplete
                value={value}
                onInputChange= {onInputChange}
                onChange={onSelectCity}
                handleHomeEndKeys
                id="autocomplete-search"
                options={options}
                getOptionLabel={optionLabel}
                renderOption={(props, option) => <li {...props}>{option.label}</li>}
                renderInput={(params) => (
                    <TextField {...params} label="City Search" />
                )}
            />
        </SearchStyle>
    );
}


export default CitySearch;