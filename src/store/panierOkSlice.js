import {createSlice} from '@reduxjs/toolkit'


const panierOKSlice = createSlice({
    name:'panierOk',
    initialState:{
        panierOk:[],
        nbPanierOk:0,
    },
    reducers:{
        setPanierOk(state , action){
        state.panierOk = action.payload
        state.nbPanierOk = state.panierOk.length
    },
    // addToPanierOk(state , action){
    //     state.changed = true;

    //     //ajouter le panier valider dans le back office
    //     const panierOk = action.payload;
    //     panierOKSlice.push(panierOk);

    //     state.nbPanierOk += 1;
    // }
    }
})

export const panierOkActions = panierOKSlice.actions;
export default panierOKSlice;