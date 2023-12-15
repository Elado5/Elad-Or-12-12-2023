import { createSlice } from "@reduxjs/toolkit";

export const Favorites = createSlice({

    name: "favorites",
    initialState: {
        favoritesIds: [],
        favoriteItems: [],
    },
    reducers: {
        addToFavorites: (state, action) => {
            state.value;
            action;
        },
        removeFromFavorites: (state, action) => {
            state.value;
            action;
        }
    }

})

export const {addToFavorites, removeFromFavorites} = Favorites.actions;

export default Favorites.reducer