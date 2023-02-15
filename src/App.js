/* eslint-disable no-unused-expressions */
import './App.css';
import BarSearch from './Components/BarSearch';
import Header from './Components/Header';
import React , {useState , useEffect} from 'react'
import Panier from './Components/Panier';
import ArticleList from './Components/ArticleList';
import Footer from './Components/Footer';
import apiArticle from './api-service/apiArticle.js';
import Connexion from './Components/Connexion';
import About from './Components/About';
import Error from './Components/Error';
import {BrowserRouter as Router , Routes , Route , Link} from 'react-router-dom'
import Inscription from './Components/Inscription';
import Home from './Components/Home';
import UpdateArticle from './Components/UpdateArticle';
import { useDispatch, useSelector } from 'react-redux';
import { articleActions } from './store/articleSlice';
import { panierActions } from './store/panierSlice';

function App() {
  const [wordSearch, setwordSearch] = useState('');
  // const [viewPanier, setViewPanier] = useState(true);
  const [valueCheckbox, setvalueCheckbox] = useState(false);

  const dispatch = useDispatch();
  // const [articles, setArticles] = useState([]);

  const articlesState = useSelector(state => state.articles)
  // const [panier, setPanier] = useState([]);
  const panierState = useSelector(state => state.panier);
  const panier = useSelector(state => state.panier.panier); //State panier de panierSlice
  const panierChanged = useSelector(state => state.panier.changed); //State changed de oanierSlice
  const viewPanier = useSelector(state => state.panier.viewPanier); //State viewPanier de oanierSlice
  
  
  const changeValue = (e) =>{
    setwordSearch(e.target.value);
  }

  // const location = useLocation();

  // Fonction pour recuperer les datas de l'api Article

  const getArticles = async () => {
    const response = await apiArticle.get('https://e-commerce-v1-24d52-default-rtdb.firebaseio.com/articlesItem.json');
    return response.data;
  }

  // const getArticleById = async (id) => {
  //   const response = await apiArticle.get(`/article/${id}`);
  //   return response.data;
  // }

  // Fonction pour recuperer les datas de l'api Article

  const getPaniers = async () => {
    const response = await apiArticle.get('https://e-commerce-v1-24d52-default-rtdb.firebaseio.com/panierItem.json');
    return response.data;
  }

  // const getPanierById = async (id) => {
  //   const response = await apiArticle.get(`/panier/${id}`);
  //   return response.data;
  // }

  const sendArticle = async () =>{
    const res = await apiArticle.put('https://e-commerce-v1-24d52-default-rtdb.firebaseio.com/articlesItem.json' , articlesState);
    return res.data;
  }

  const sendPanier = async () =>{
    const res  = await apiArticle.put('https://e-commerce-v1-24d52-default-rtdb.firebaseio.com/panierItem.json', panierState)
    return res.data;
  }

  const sendPanierOK = async () =>{
    const res  = await apiArticle.put('https://e-commerce-v1-24d52-default-rtdb.firebaseio.com/panierItemOK.json', panierState.panierOK)
    return res.data;
  }

  //Recuperer les element des panierValider
  const getPanierOK = async () =>{
    const res  = await apiArticle.get('https://e-commerce-v1-24d52-default-rtdb.firebaseio.com/panierItemOK.json', panierState.panierOK)
    return res.data;
  }

  // nnnnnnnnnnnnnnnnnnnnn //

  //Send infos the dislike or like of an article
  React.useEffect(() => {
    const updateArticle = async () => {
      if(articlesState.changed){
        sendArticle();
      }
    }

    const updatePanier = async () =>{
      // Des modifications on eu lieu comme eg : addToPanier , deleteToPanier
      if(panierChanged){
        sendPanier();
      }
      //Si le panier a été envoyé : dans ce cas state.sendingPanier qui a pour value false devient true.
      if(panierState.sendingPanier){
        sendPanierOK();
      }
    }

    updatePanier();
    updateArticle();
  } , [articlesState , panierState]) //S'excute quand articleState ou PanierState a été modifié

  //Fetch info for article and Panier
  useEffect(() => {
    const getArticlesFromApi = async () =>{
      //Recuperer les json articles from firebase
      await getArticles()
      //setartciles ne declenche pas l'envoie vers firebase pcq elle ne mofifie pas le state.changed en true
      .then(res => dispatch(articleActions.setArticles(res)))
      //Affichaged de l'error si y'en a
      .catch(err => console.error('Error : ' , err))
      // if(articlesFromApi){
      //   dispatch(articleActions.setArticles(articlesFromApi))
      // }
    }

    const getPaniersFromApi = async () =>{
      //Recupere les element json du panier from firebase
      await getPaniers() 
      // setPänier ne provoque pas de send vers firebase pcq elle ne modfier pas state.changed en true 
      .then(res => dispatch(panierActions.setPanier(res)))
      //Affichage de error si yen a
      .catch(err => console.log('Error',err))
      
      // -------------------------- //
      
      //Get element of PanierOk
      await getPanierOK()
      // setPanierOk ne provoque pas le send des infos pcq elle change pas state.chnaged en true
      .then(res => dispatch(panierActions.setPanierOK(res)))
      //Affichage error si yen a 
      .catch(err => console.error('Error :', err))
      // if(paniersFromApi){
      //   dispatch(panierActions.setPanier(paniersFromApi))
      // }
    }
    getPaniersFromApi();
    getArticlesFromApi();
  } , []); //A CHAQUE PREMIER RENDER

  //Appuie sur le bouton Like d'un article

  const handleLike = (id) =>{
    // console.log('Article ',id, ' liké');
    // const articleToLiked = await getArticleById(id);
    // const articleLiked = {...articleToLiked , like:articleToLiked.like+1};

    // await apiArticle.put(`/article/${id}` , articleLiked);

    // console.log('new article update',articleLiked);
    dispatch(articleActions.likeAnArticle(id));
    // console.log('After like : ',articlesState)
  }

  // Appuyez sur le bouton dislike
  const handleDislike = async (id) =>{
    // console.log('Article ',id, ' disliké');
    // const articleToDisliked = await getArticleById(id);
    // const articleDisliked = {...articleToDisliked , dislike:articleToDisliked.dislike+1};

    // await apiArticle.put(`/article/${id}`, articleDisliked);

    // dispatch(articleActions.setArticles(articlesState.articles.map((article) => article.id === id ? articleDisliked : article)))
    // console.log('new article', articleToDisliked)
    dispatch(articleActions.dislikeAnArticle(id))
  }

  //Appuez sur le bouton Ajouter au panier
  const handleAddPanier = (article) =>{
    // console.log(articles)
    // let i = 0;
    // panier.forEach(element => 
    //   //Si l'article est present dans le panier
    //   //Si l'article selectionné a le meme nom , a le meme type et encore le nbQte est superieur ou egal a 1
    //   ((element.name === article.name && element.type === article.type) && element.nbQte >= 1) ?
    //     (i = element.nbQte + 1) : i // on incremente i du nbQe+1 de l'element  sinon rien
    // );

   
    // console.log('Quantité de l article dans le panier',i)

    // Si l'article est pas present dans le panier
    // if(i === 0){ //Dans ce cas l'article ne figure pas dans le panier parce que pas trouvé d'article de meme nom, meme type et de nbQte n'est pas 1
    //   await apiArticle.post('/panier', {...article, nbQte:1}); //Ajout via l'api avec la propriéte POST
    //   setPanier([...panier,{...article, nbQte:1}]) 
    // }else if(i >= 1){
    //   await apiArticle.put(`/panier/${article.id}`,{...article, nbQte:i}) 
    //   // Modification de l'article dans le panier trouvé via .PUT
    //   // on donne a nbQte la valeur de i qui a été incrementé dans la recherche de verification
    //   setPanier(panier.map((element) => element.id === article.id ? {...article, nbQte:i} : element ))
    //   // setPanier([...panier, {...article, nbQte: i++ }]) // A revoir avec le .map() pour modif direct
    // }
    dispatch(panierActions.addToPanier(article))
  }

  const handleDeleteElementPanier = (id) =>{
    // console.log('Element', id ,' a supprimer du panier')

    // await apiArticle.delete(`/panier/${id}`);
    // dispatch(panierActions.setPanier(panier.filter((element) => element.id !== id )))

    dispatch(panierActions.deleteElementPanier(id))
  }



  return (
    <Router>

      <Routes>
        <Route path='/' element={
            // Mise en place d'un component Layout pour contenir le tout en 1 !!
            <div className="App">

              <Header />
              <BarSearch wordSearch={wordSearch} onChangeValue={changeValue} />
              {/* <h2>{wordSearch ? `Recherche : ${wordSearch}` : ''}</h2> */}
              <div className='mainSection'>
                <div className='container-fluid'>
                  <span><input type='checkbox' checked={valueCheckbox} value={valueCheckbox} onChange={e => setvalueCheckbox(e.target.checked)} />Voir les articles les plus likés</span><br/>
                  
                  {/* Bouton Panier  */}
                  <span className={!viewPanier ? 'text-light bg-dark' : 'text-light bg-danger'} onClick={() => dispatch(panierActions.setViewPanier(!viewPanier))} style={{border:'solid 1px',padding:'2.5px',cursor:'pointer'}}>{!viewPanier ? 'Voir le panier' : 'Fermer le panier'}</span>
                  
                  {/* Block Article & Panier  */}
                  <div className='row'>
                    {!viewPanier ? '' : <Panier deleteElement={handleDeleteElementPanier} panier={panier} />}
                    <ArticleList valueCheckbox={valueCheckbox} viewPanier={viewPanier} wordSearch={wordSearch} articles={articlesState.articles} handleLike={handleLike} handleDislike={handleDislike} handleAddPanier={handleAddPanier} />
                  </div>
                </div>
              </div>
              <Footer />
              </div>
        } />

        <Route path='connexion' element={<Connexion />} />
        <Route path='inscription' element={<Inscription />} />
        <Route path='aboutme' element={<About/>} />
        <Route path='home' element={<Home /> }></Route>
        <Route path='updatearticle' element={<UpdateArticle />} />
        <Route path="*" element={<Error />} />
      </Routes>

    </Router>
  );
}

export default App;
