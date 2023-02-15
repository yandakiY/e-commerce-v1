import { configureStore } from "@reduxjs/toolkit";
import articleSlice from "./articleSlice";
import panierOKSlice from "./panierOkSlice";
import panierSlice from "./panierSlice";

const store = configureStore({
    reducer:{
        articles: articleSlice.reducer,
        panier: panierSlice.reducer,
        panierOk: panierOKSlice.reducer
    }
});

export default store