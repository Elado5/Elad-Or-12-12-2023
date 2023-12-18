import { createSlice } from "@reduxjs/toolkit";
import { errorToast } from "../../utils/Toasts";

export const Favorites = createSlice({

    name: "favorites",
    initialState: () => 
        Object.values(localStorage).map(favorite => JSON.parse(favorite))
    ,
    reducers: {
        addToFavorites: (state, action) => {
            if (state.length > 4) {
                errorToast("Favorites list is full (5 max)", action.payload.theme)
            }
            else{
                state[state.length] = action.payload;
                localStorage.setItem(JSON.stringify(action.payload.key), JSON.stringify(action.payload));
            }
        },
        removeFromFavorites: (state, action) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i].key == action.payload) {
                    state.splice(i, 1);
                    localStorage.removeItem(action.payload);
                }
            }
        }
    }

})

export const { addToFavorites, removeFromFavorites } = Favorites.actions;

export default Favorites.reducer