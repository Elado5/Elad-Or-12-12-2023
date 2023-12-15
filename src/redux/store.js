import {configureStore} from '@reduxjs/toolkit'
import themeReducer from './Slices/ThemeSlice'
import TempTypeReducer from './Slices/TempTypeSlice'
import FavoritesReducer from './Slices/FavoritesSlice'
import cityReducer from './Slices/CitySlice'

export default configureStore({
    reducer: {
        theme: themeReducer,
        tempType: TempTypeReducer,
        favorites: FavoritesReducer,
        city: cityReducer
    }
})