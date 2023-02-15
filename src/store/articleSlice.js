import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
    name:'articles',
    initialState:{
        articles:[],
        nbArticles: 0,
        changed:false,
        // changedPost:false,
        // changedUpdate:false,
        // changedDelete:false,
    },
    reducers:{
        setArticles(state , action){
            //State has been changed
            state.changed = false;

            //Replace the state by the new value (action.payload)
            state.articles = action.payload.articles;
            state.nbArticles = action.payload.nbArticles;
            // state.nbArticles = state.articles.length;
        },
        addArticle(state , action){
            let i = 0;
            const articleSended = action.payload;
            state.articles.forEach(article => article.name === articleSended.name && article.type === articleSended.type ? i++ : i);

            if(i === 0){
                //Not in the database
                state.articles.push({...articleSended , price: Number(articleSended.price) , id: performance.now().toString(36) });
                // addArticle(action.payload)
            }else{
                //In the database
                alert('Article already in the database !!');
                return;
            }
            //State article because .post has been changed
            state.nbArticles = state.articles.length;
            state.changed = true;
        },
        updateArticle(state , action){
            

            const articleUpdated = action.payload;
            console.log('Payload' , action.payload)

            const id = articleUpdated.id;

            //check the exisitng
            let exisiting = state.articles.find(article => article.id === id);
            exisiting = articleUpdated

            state.articles = state.articles.map(article => article.id === id ? {...exisiting , price: Number(exisiting.price)} : article);

            //State has been changed
            state.changed = true;
            // this.setArticles(state.articles)
            // goHome();
        // window.location.reload();
        },
        deleteArticle(state , action){
            //State has been changed
            state.changed = true;

            const id = action.payload;

            //check if it's in the database:
            const existing = state.articles.find(article => article.id === id);

            if(existing){
                state.articles = state.articles.filter(article => article.id !== id);
                state.nbArticles--;
            }else{
                return;
            }
        },
        likeAnArticle(state , action){
            state.changed = true; //Provoque le sending vers firebase
            const id = action.payload;

            const findArticle = state.articles.find(article => article.id === id);
            findArticle.like++
            // console.log('id :', findArticle.id ,'like : ', findArticle.like++);
        },
        dislikeAnArticle(state , action){
            state.changed = true; //Provoque le sending vers firebase
            const id = action.payload

            //Find the article who correspond
            const findArticle = state.articles.find(article => article.id === id);
            findArticle.dislike++;
        }
    }
});

export const articleActions = articleSlice.actions;
export default articleSlice;