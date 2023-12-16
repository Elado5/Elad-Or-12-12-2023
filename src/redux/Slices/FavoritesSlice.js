import { createSlice, current } from "@reduxjs/toolkit";

export const Favorites = createSlice({

    name: "favorites",
    initialState: {
        favorites: [],
    },
    reducers: {
        addToFavorites: (state, action) => {
            console.log('Favorites before add=>', current(state.favorites))
            if (state.favorites.length > 4) {
                return false;
            }
            else{
                console.log('action.payload =>', action.payload)
                state.favorites[state.favorites.length] = action.payload;
            }
            console.log('Favorites after add=>', current(state.favorites))
        },
        removeFromFavorites: (state, action) => {
            console.log('Favorites  before remove =>', current(state.favorites))
            console.log('action.payload =>', action.payload)
            for (let i = 0; i < state.favorites.length; i++) {
                if (state.favorites[i].key == action.payload.key) {
                    state.favorites.splice(i, 1);
                }
            }
            console.log('Favorites after remove=>', current(state.favorites))
        }
    }

})

export const { addToFavorites, removeFromFavorites } = Favorites.actions;

export default Favorites.reducer