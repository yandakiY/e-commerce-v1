import React , {useState , useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useLocation , useNavigate } from 'react-router-dom'
import apiArticle from '../api-service/apiArticle';
import { articleActions } from '../store/articleSlice';

const UpdateArticle = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const articleSelected = location.state.articleSelected;
    const articleName = articleSelected.name;
    // console.log(location)

    const [infosForm , setInfosForm] = useState({id:articleSelected.id ,name:articleSelected.name , price: articleSelected.price , type:articleSelected.type})
    const [type , setType] = useState([]);


    useEffect(() => {
        const getTypeFromServer = async () => {
            const typeFromServer = await getTypeArticle();
            if(typeFromServer){
                setType(typeFromServer);
            }
        }
        getTypeFromServer();
    }, []);

    const getTypeArticle = async () =>{
        const res = await apiArticle.get('type');
        console.log(res.data)
        return res.data;
    }

    const goHome = () =>{
        navigate('/home');
    }

    const dispatch = useDispatch();

    const handleUpdateArticle = async (e) =>{
        e.preventDefault();

        if(!infosForm.name || !infosForm.price){
            alert('Remplissez tous les champs svp!!');
            return ;
        }

        dispatch(articleActions.updateArticle({...infosForm , like:articleSelected.like , dislike:articleSelected.dislike }))
        console.log('Update done : ', {...infosForm , like:articleSelected.like , dislike:articleSelected.dislike });

        // await apiArticle.put(`article/${articleSelected.id}`, {...articleSelected , name: infosForm.name , price: infosForm.price , type: infosForm.type} );
        
        goHome();
        // window.location.reload();
    }

  
    return (
        <div className='col-lg-6 formPart'>
        <h3>Modifier l'article : {articleName} </h3>
        <form onSubmit={e => handleUpdateArticle(e)}>
            <div>
                <label>Nom de l'article :</label>
                <input type='text' className='form-control col-6' placeholder='LG Oled 54"'  value={infosForm.name} onChange={e => setInfosForm({...infosForm , name:e.target.value}) }  />
            </div>
            <div>
                <label>Prix :</label>
                <input type='number' className='form-control col-6' placeholder='150 000' value={infosForm.price} onChange={e => setInfosForm({...infosForm , price:e.target.value}) } />
            </div>
            <div>
                <label>Type de l'article :</label>
                <select value={infosForm.type} onChange={e => setInfosForm({...infosForm , type:e.target.value})} className='form-select col-6'> {/* <option value=''>Choissisez un type : </option> */}
                    {type.map((type , index) => <option key={index} value={type.name}>{type.name}</option> )}
                </select>
            </div>
            <div style={{marginTop:'15px'}}>
                <button style={{marginRight:'5px'}} className='btn btn-dark'>Modifier</button>
                <button onClick={() => goHome() } className='btn btn-primary'>Return to home</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateArticle