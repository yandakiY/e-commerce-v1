import React from 'react'
import { useState , useEffect  } from 'react'
import api from '../api-service/apiArticle.js'
import { Link } from 'react-router-dom'
import '../StyleComponent/Home.css'
import ArticleListHome from './ArticleListHome.js'
import TablePanier from './TablePanier.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { articleActions } from '../store/articleSlice.js'
import { panierOkActions } from '../store/panierOkSlice.js'

const Home = () => {
    const dispatch = useDispatch();
    const articlesState = useSelector(state => state.articles);
    const article = useSelector(state => state.articles.articles);
    let nbArticles = article.length;

    const [infosFormArticle , setinfosFormArticle] = useState({name:'',price:'',type:'',like:0,dislike:0});
    // const [article , setarticle] = useState([]);
    const [type, settype] = useState([]);
    const panierOk = useSelector(state => state.panierOk.panierOk);

    const [errorForm , seterrorForm] = useState('')
    // let nbArticles = 0;
    let i = 0; //pour verification de la presence d'un article lors de l'enregistrement

    const navigate = useNavigate();

    const getPaniers = async () =>{
        const res = await api.get('panier');
        return res.data;
    }

    const getTypes = async () =>{
        const res = await api.get('type');
        return res.data;
    }

    const getPanierOk = async () =>{
        const res = await api.get('https://e-commerce-v1-24d52-default-rtdb.firebaseio.com/panierItemOK.json');
        return res.data;
    }

    const sendArticle = async () =>{
        const res = await api.put('https://e-commerce-v1-24d52-default-rtdb.firebaseio.com/articlesItem.json' , articlesState);
        return res.data;
    }

    const getArticles = async ()=>{
            const res = await api.get('https://e-commerce-v1-24d52-default-rtdb.firebaseio.com/articlesItem.json');
            // console.log('from firebase ', res.data);
            return res.data;
    }


    //Sending info to firebase
    React.useEffect(() => {
        const update = async () =>{
            if(articlesState.changed){
                await sendArticle()
            }
        }
        console.log(articlesState.changed)
        update();
    } ,[nbArticles])

    //Get info of PanierOk from firebase
    React.useEffect(() => {
        const panierOKFromFirebase = async () =>{
            await getPanierOk()
            .then(res => dispatch(panierOkActions.setPanierOk(res)))
            .catch(err => console.error('Error ',err))
        }
        panierOKFromFirebase();
    },[])

    // React.useEffect(() => {
    //     const getArticleAndPanierFromServer = async () => {
    //         const articleFromServer = await getArticles();
    //         // const panierFromServer = await getPaniers();
    //         // const typeFromServer = await getTypes();
    //         // const panierOkFromServer = await getPanierOk();
            
    //         if(articleFromServer){
    //             dispatch(articleActions.setArticles(articleFromServer))
    //         }

    //         // if(panierFromServer){
    //         //     setpanier(panierFromServer);
    //         // }

    //         // if(typeFromServer){
    //         //     settype(typeFromServer);
    //         // }

    //         // if(panierOkFromServer){
    //         //     setpanierOk(panierOkFromServer);
    //         // }
    //     }
    //     getArticleAndPanierFromServer();

    //     // return () => {
    //     //     clearInterval(getArticleFromServer);
    //     // };
    // }, [article , articlesState.changed]);

    // console.log('Panier Ok',console.table(panierOk))
    // article.map((a) => a ? nbArticles++ : nbArticles );
    
    const handleAddArticle = e =>{
        e.preventDefault();

        //Use react-hook-form after the update
        if(!infosFormArticle.name || !infosFormArticle.price){
            alert('Remplissez les formulaires svp !!');
            return;
        }
        // article.forEach(element => infosFormArticle.name === element.name && infosFormArticle.type === element.type ? i++ : i);
        
        // if(i === 0){
        //     await api.post('/article', infosFormArticle);
        //     console.log('new Article', infosFormArticle);
        //     dispatch(articleActions.setArticles([...article , infosFormArticle])); // Mise a jour direct de la table article grace au setState
        // }else{
        //     seterrorForm('Article deja existant.');
        //     return;
        // }
        dispatch(articleActions.addArticle(infosFormArticle))
        // await api.post('/article', infosFormArticle);
        // console.log('new Article', infosFormArticle);

        setinfosFormArticle({
            ...infosFormArticle,
            name:'',
            price:'',
            type:''
        });
    }

    const handleDeleteArticle =  (id) =>{
        // await api.delete(`article/${id}`);
        // dispatch(articleActions.setArticles(article.filter( (article) => article.id !== id )))
        dispatch(articleActions.deleteArticle(id))
    }

    const goHome = () =>{
        navigate('/home');
    }
  
    return (
    <div className='container-fluid Home'>
       <div className='row HomeHeader'>
            <h1 className='col-6'>Home</h1>
            <a className='col-6 linkConnexion' href='/'>Se deconnecter</a>
       </div>

       <div className='row BodyHome'>
            <div className='col-lg-4 formPart'>
                <h3>Ajouter un article :</h3>
                <form onSubmit={(e) => handleAddArticle(e)}>
                    <div>
                        <label>Nom de l'article :</label>
                        <input type='text' className='form-control col-6' placeholder='LG Oled 54"'  value={infosFormArticle.name} onChange={e => setinfosFormArticle({...infosFormArticle , name:e.target.value})} />
                    </div>
                    <div>
                        <label>Prix :</label>
                        <input type='number' className='form-control col-6' placeholder='150 000' value={infosFormArticle.price} onChange={e => setinfosFormArticle({...infosFormArticle , price:e.target.value})} />
                    </div>
                    <div>
                        <label>Type de l'article :</label>
                        <select value={infosFormArticle.type} onChange={e => setinfosFormArticle({...infosFormArticle, type:e.target.value})} className='form-select col-6'>
                            {/* <option value=''>Choissisez un type : </option> */}
                            {type.map((type , index) => <option key={index} value={type.name}>{type.name}</option> )}
                        </select>
                    </div>
                    <div>
                        <button className='btn btn-dark'>Enregistrer</button>
                    </div>
                </form>
            </div>

            <div className='col-lg-8 tableArticle'>
                <h3>Les articles disponibles : {!nbArticles ? '' : nbArticles } </h3>
                {!article ? null : article.map((article , index) =>
                   <ArticleListHome key={index} deleteArticle={handleDeleteArticle} article={article} />
                )}
            </div>

            <div className='col-lg-12 listPanier'>
                <h3>Les paniers validés : {panierOk.length} </h3>
                <TablePanier panier={panierOk} />
            </div>
        </div>
    </div>
  )
}

export default Home