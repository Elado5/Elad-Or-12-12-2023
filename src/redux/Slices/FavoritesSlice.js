import { createSlice, current } from "@reduxjs/toolkit";

export const Favorites = createSlice({

    name: "favorites",
    initialState: () => {
       let res = Object.values(localStorage).map(favorite => JSON.parse(favorite));
       console.error(res);
       return res;
    }
    ,
    reducers: {
        addToFavorites: (state, action) => {
            console.log('Favorites before add=>', current(state))
            if (state.length > 4) {
                return false;
            }
            else{
                console.log('action.payload =>', action.payload)
                state[state.length] = action.payload;
                localStorage.setItem(JSON.stringify(action.payload.key), JSON.stringify(action.payload));
            }
            console.log('Favorites after add=>', current(state))
        },
        removeFromFavorites: (state, action) => {
            console.log('Favorites  before remove =>', current(state))
            console.log('action.payload =>', action.payload)
            for (let i = 0; i < state.length; i++) {
                if (state[i].key == action.payload) {
                    state.splice(i, 1);
                    localStorage.removeItem(action.payload);
                }
            }
            console.log('Favorites after remove=>', current(state))
        }
    }

})

export const { addToFavorites, removeFromFavorites } = Favorites.actions;

export default Favorites.reducer