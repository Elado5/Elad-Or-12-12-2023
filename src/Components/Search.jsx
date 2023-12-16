import { useCallback, useMemo, useState } from 'react';
import { TextField } from "@mui/material";
import Autocomplete, { } from "@mui/material/Autocomplete";
import { getSearchResults, getCurrentConditions, getFiveDaysForecast } from '../services/accuWeatherAPI';
import { isEnglish } from '../utils/alphabet';
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux';
import { setChosenCity, setChosenCityNameAndKey, setForecast } from '../redux/Slices/CitySlice';
import { useDebounce } from 'react-use';
//import toast
//get the weather api options inside the array

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

export const lookupAndSetLocation = async (textInput, dispatch) => {
    console.log('textInput', textInput)
    if (!textInput)
        return;
    try {
        const res = await getCurrentConditions(textInput.key);
        console.log(res.data[0]);
        //action update Chosen city
        dispatch(setChosenCity(res.data[0]));
        dispatch(setChosenCityNameAndKey(textInput));
        
        const res2 = await getFiveDaysForecast(textInput.key);
        console.log("res2 ===> ", res2.data);
        dispatch(setForecast(res2.data.DailyForecasts));
        
    }
    catch (e) { console.log('error:', e.message) }
}

const CitySearch = () => {

    const dispatch = useDispatch();

    const [value, setValue] = useState(null);
    const [locationsData, setLocationsData] = useState([]);
    
    const options = useMemo(() => locationsData.map((item) => (
        { label: `${item.LocalizedName} - ${item.Country.LocalizedName}`, key: `${item.Key}` }

    )), [locationsData])

    //? using useCallback so this function gets reallocated in memory only when the dependancy array (value in this case) changes
    const lookupLocation = useCallback(async () => {
        console.log('textInput', value)
        if (!value)
            return;
        try {
            const res = await getSearchResults(value);
            console.log(res);
            setLocationsData([...res.data]);
        }
        catch (e) { console.log('error:', e.message) }
    }, [value])

    useDebounce(lookupLocation, 500, [value])

    const onInputChange = useCallback((event, inputValue) => {
        if (inputValue !== value && isEnglish(inputValue)) {
                setValue(inputValue);
            }
                //TODO toast here
                console.log('please use english letters only');
        }
    , [value])

    return (
        <SearchStyle>
            <Autocomplete
                value={value}
                onInputChange= {onInputChange}
                onChange={(event, inputValue) => {
                    LookupAndSetLocation(inputValue, dispatch);
                }}
                handleHomeEndKeys
                id="autocomplete-search"
                options={options}
                getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    // Regular option
                    return option.label;
                }}
                renderOption={(props, option) => <li {...props}>{option.label}</li>}
                
                freeSolo
                renderInput={(params) => (
                    <TextField {...params} label="City Search" />
                )
                }
            />
        </SearchStyle>
    );
}


export default CitySearch;