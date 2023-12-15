import { useState } from 'react';
import { TextField } from "@mui/material";
import Autocomplete, { } from "@mui/material/Autocomplete";
import { getSearchResults, getCurrentConditions, getFiveDaysForecast } from '../services/accuWeatherAPI';
import debounce from "lodash.debounce";
import { isEnglish } from '../utils/alphabet';
import styled from '@emotion/styled'
import { useSelector, useDispatch } from 'react-redux';
import { setChosenCity, setChosenCityNameAndKey, setForecast } from '../redux/Slices/CitySlice';
//import toast
//get the weather api options inside the array

export const LookupAndSetLocation = async (textInput, dispatch) => {
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

const Search = () => {

    const dispatch = useDispatch();

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

    const [value, setValue] = useState(null);
    const [options, setOptions] = useState([]);

    const LookupLocation = async (textInput) => {
        console.log('textInput', textInput)
        if (!textInput)
            return;
        try {
            const res = await getSearchResults(textInput);
            console.log(res);
            setOptions([...res.data]);
        }
        catch (e) { console.log('error:', e.message) }
    }


    const debounceLookup = debounce((input) => {
        LookupLocation(input);
    }, 500);

    return (
        <SearchStyle>
            <Autocomplete
                value={value}
                onInputChange={(event, inputValue) => {
                    if (inputValue != value) {
                        if (isEnglish(inputValue)) {
                            setValue(inputValue);
                            debounceLookup(inputValue);
                        }
                        else {
                            //TODO toast here
                            console.log('please use english letters only');
                        }
                    }
                }}
                onChange={(event, inputValue) => {
                    LookupAndSetLocation(inputValue, dispatch);
                }}
                handleHomeEndKeys
                id="autocomplete-search"
                options={options.map((item) => (
                    { label: `${item.LocalizedName} - ${item.Country.LocalizedName}`, key: `${item.Key}` }

                ))}
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

export default Search;