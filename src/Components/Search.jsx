import { useCallback, useMemo, useState } from 'react';
import { TextField } from "@mui/material";
import Autocomplete, { } from "@mui/material/Autocomplete";
import { getSearchResults} from '../services/api';
import { isEnglish } from '../utils/alphabet';
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'react-use';
import { setHeroCity } from '../utils/Funcs';
import { errorToast } from '../utils/Toasts';
//import toast


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
    const theme = useSelector(state => state.theme.value);

    const [value, setValue] = useState(null);
    const [locationsData, setLocationsData] = useState([]);

    const options = useMemo(() => locationsData.map((item) => (
        { label: `${item.LocalizedName} - ${item.Country.LocalizedName}`, key: `${item.Key}` }

    )), [locationsData])

    //!change name to something that anyone can understand
    //? using useCallback so this function gets reallocated in memory only when the dependancy array changes
    const lookupLocation = useCallback(async () => {
        if (!value)
            return;
        try {
            const res = await getSearchResults(value);
            setLocationsData([...res.data]);
        }
        catch (error) {  errorToast(error.message, theme) }
    }, [value, theme])


    const lookupAndSetLocation = useCallback(async (location) => {
        if (!location) {
            return;
        }
        dispatch(setHeroCity(location, dispatch, theme))
    }, [dispatch, theme]);

    useDebounce(lookupLocation, 500, [value])

    const onInputChange = useCallback((event, inputValue) => {
        if (inputValue !== value && isEnglish(inputValue) && inputValue?.label !== value) {
            setValue(inputValue);
        }
        else{
            errorToast('please use english letters only', theme)
        }
    }
        , [value,theme])

    const optionLabel = useCallback((option) => {
        if (typeof option === 'string') {
            return option;
        }
        // Regular option
        return option.label;
    }, [])

    const onSelectCity = useCallback((e, inputValue) => lookupAndSetLocation(inputValue), [lookupAndSetLocation])

    return (
        <SearchStyle>
            <Autocomplete
                value={value}
                onInputChange={onInputChange}
                onChange={onSelectCity}
                handleHomeEndKeys
                id="autocomplete-search"
                options={options}
                getOptionLabel={optionLabel}
                sx={{    background: 'rgba(0,0,0,0.15)'}}
                renderOption={(props, option) => <li {...props}>{option.label}</li>}
                renderInput={(params) => (
                    <TextField {...params} label="City Search" />
                )}
            />
        </SearchStyle>
    );
}


export default CitySearch;