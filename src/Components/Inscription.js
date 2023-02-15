import React , {useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import api from '../api-service/apiArticle.js';

const Inscription = () => {

    const [infos, setInfos] = useState({login:'', mdp:''});
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    let i = 0;

    const viewAllUsers = () =>{
        users.forEach(element => console.log(element.login))
    }

    useEffect(() => {
        const getusersFromServer = async ()=>{
            const usersFromServer = await getUsers();
            if(users){
                setUsers(usersFromServer);
            }
        }
        getusersFromServer();
        return () => {
            clearInterval(getusersFromServer)
        };
    }, []);

    const getUsers = async () =>{
        const res = await api.get('/users');
        return res.data;
    }
    
    const handleSubmit = async e =>{
        e.preventDefault();

        if(!infos.login || !infos.mdp){
            alert('Remplissez les champs svp!!');
            return ;
        }

        // users.forEach(element => console.log(element.login))

        users.forEach(element => element.login === infos.login ? i++ : i);

        if(i === 0){
            const newUser = {login: infos.login , mdp: infos.mdp};
            await api.post('/users', newUser);
            alert('Enregistrement effectué !!');
            setInfos({
                login:'',
                mpd:''
            });
            console.log('Yes you can')
        }else{
            setError('Ce login existe deja');
            console.log(error)
            setInfos({
                login:'',
                mpd:''
            });
            console.log("Access denied !!")
        }
        
        

        // console.log('Login : ',infos.login , ' Mot de passe :',infos.mdp)
    }

    return (
    <div className='container-fluid Connexion'>
        
        <div className='row ConnexionAbout'>
            <h1 className='col-6' onClick={viewAllUsers}>Inscription</h1>
            <Link className='col-6 linkConnexion' to='/'>Retour a l'accueil</Link>
        </div>
        
        <div className='row bodyConnexion'>
            <span style={{fontWeight:'bold'}} className='text-danger'>{error ? error : ''}</span>
            <form className='form' onSubmit={e => handleSubmit(e)}>
                
                <div className='form-label col-6'>
                    <label>Login :</label>
                    <input type='text' className='form-control' value={infos.login} onChange={e => setInfos({...infos , login:e.target.value})} placeholder='' />
                </div>

                <div className='form-label col-6'>
                    <label>Mot de passe :</label>
                    <input type='password' className='form-control' value={infos.mdp || ''} onChange={e => setInfos({...infos , mdp: e.target.value})} />
                </div>

                <div>
                    <button className='btn btn-primary'>Enregistrer</button>
                </div>
            </form>
            <Link to='/connexion'>Se connecter</Link>
        </div>
    </div>
  )
}

export default Inscription