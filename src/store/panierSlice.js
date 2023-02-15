import {createSlice} from '@reduxjs/toolkit'

const panierSlice = createSlice({
    name:'panier',
    initialState:{
        panier:[],
        panierOK:[],
        viewPanier:true,
        nbElementPanier:0,
        nbElementPanierOk:0,
        totalPrice:0,
        changed:false,
        sendingPanier:false
    },
    reducers:{
        setPanier(state , action){
            state.changed = false;
            state.sendingPanier = false;
            state = action.payload
        },
        setPanierOK(state , action){
            state.panierOK = action.payload
        },
        setViewPanier(state , action){
            state.viewPanier = action.payload
        },
        sendTotalPanier(state , action){
            state.changed = true;
            state.totalPrice = action.payload;
        },
        addToPanier(state , action){
            state.changed =  true; //Provoque l'envoi de panierState vers firebase
            
            //On recupere en entier l'article
            //On check if l'article est present dans le panier (deja) : [ 'verification sur les name et le type' && si l'element selectionné a un nbQte >= 1 ]
            // if il ne figure pas dans le panier : on ajoute l'article [entier] avec un new props (nbQte) === 1 dans le panier
            // if il figure dans le panier :  on increment seulement le props nbQte de l'article qui figure dans le panier

            let i = 0;
            const articleSelected = action.payload;

            state.panier.forEach(element => (( element.name === articleSelected.name && element.type === articleSelected.type ) && element.nbQte >= 1) ? (i = element.nbQte+1 ) : i);

            if(i === 0){ //New element of Panier
                state.panier.push({ ...articleSelected , nbQte:1 })
            }else{ //Aleready element pf panier
                state.panier = state.panier.map(element => (element.id === articleSelected.id) ? {...element , nbQte:i} : element )
            }
            state.nbElementPanier = state.panier.length;
        },
        deleteElementPanier(state , action){
            state.changed =  true; //Provoque l'envoi vers firebase

            const id = action.payload;

            state.panier = state.panier.filter(element => element.id !== id);
            state.nbElementPanier = state.panier.length
        },
        sendPanierToBackOffice(state , action){
            // state.changed = true;

            //Ajout du panier creer dans le props : panierOk
            //Ajout d'un id unique pour le l'article envoyer dans le backoffice
            //Vider le props panier apres l'envoi vers le backoffice
            state.sendingPanier = true; //Provoque l'envoie de PanierOk vers firebase mais cette fois en creeant un nouveau bloc (panierItemOK)
            const panier = action.payload; //Le panier a envoyé
            state.panierOK.push({...panier , totalPrice:state.totalPrice , id: "idP-"+performance.now().toString(36)}); //Ajout dans le backoffice
            state.nbElementPanierOk = state.panierOK.length;
            state.nbElementPanier = 0; //Le nombre d'element du panier passe a 0
            state.panier = [];// On vide le panier car il a été envoyer dans panierOk
        }
    }
})

export default panierSlice;
export const panierActions = panierSlice.actions;