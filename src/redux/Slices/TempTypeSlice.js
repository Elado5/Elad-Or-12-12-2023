import { createSlice } from "@reduxjs/toolkit";

export const TempTypeSlice = createSlice({

    name: "tempType",
    initialState: {
        value:"Celsius"
    },
    reducers: {
        switchTempType: state => {
            state.value == "Celsius" ? state.value="Fahrenhite" : state.value="Celsius";
        }
    }

})

export const {switchTempType} = TempTypeSlice.actions;

export default TempTypeSlice.reducer