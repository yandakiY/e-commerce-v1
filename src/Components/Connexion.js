import React, {useState, useEffect} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import '../StyleComponent/Connexion.css'
import api from '../api-service/apiArticle.js';

const Connexion = () => {
    
    const [users, setusers] = useState([]);
    const [infosConnexion, setinfosConnexion] = useState({login:'',mdp:''});
    const [error, setError] = useState('');
    let i = 0;

    const navigate = useNavigate();
    
    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!infosConnexion.login || !infosConnexion.mdp){
            alert('Remplissez les champs svp !!');
            return ;
        }

        users.forEach(element => element.login === infosConnexion.login && element.mdp === infosConnexion.mdp ? i++ : i);

        if(i === 1){
            navigate('/home');
        }else{
            setError('Informations incorrectes');
        }
        // console.log('Login',infosConnexion.login, ' Mot de passe : ',infosConnexion.mdp);

        setinfosConnexion({
            login:'',
            mdp:''
        });
    }

    

    useEffect(() => {
        const getUsersFromServer = async () =>{
            const usersFromServer = await getUsers();
            if(usersFromServer){
                setusers(usersFromServer);
            }
        }
        getUsersFromServer();
        return () => {
            clearInterval(getUsersFromServer)
        };
    }, []);

    const getUsers = async () =>{
        const res = await api.get('/users');
        return res.data;
    }

    const viewUsers = () =>{
        users.forEach(element => console.log(element.login));
    }

    // const goHome = () =>{
    //     navigate('/home');
    //     console.log('Execution')
    // }
    
    return (
    <div className='container-fluid Connexion'>
        
        <div className='row ConnexionAbout'>
            <h1 className='col-6' onClick={viewUsers}>Connexion</h1>
            <Link className='col-6 linkConnexion' to='/'>Retour a l'accueil</Link>
            {/* <button className='col-6 btn btn-dark linkConnexion' onClick={() => goHome()} >Retour a l'accueil</button> */}
        </div>

        <div className='row bodyConnexion'>
            <form className='form' onSubmit={e => handleSubmit(e)}>
                <span className='text-danger' style={{fontWeight:'bold'}}>{error ? error : ''}</span>
                <div className='form-label col-6'>
                    <label>Login :</label>
                    <input type='text' className='form-control' value={infosConnexion.login} onChange={e => setinfosConnexion({...infosConnexion , login:e.target.value })} placeholder='' />
                </div>

                <div className='form-label col-6'>
                    <label>Mot de passe :</label>
                    <input type='password' className='form-control' value={infosConnexion.mdp} onChange={e => setinfosConnexion({...infosConnexion , mdp: e.target.value})} placeholder='' />
                </div>

                <div>
                    <button className='btn btn-primary'>Connexion</button>
                </div>
            </form>
            <Link to='/inscription'>S'inscrire</Link>
        </div>
    </div>
  )
}

export default Connexion