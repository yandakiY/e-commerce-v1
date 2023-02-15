import React , {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import apiArticle from '../api-service/apiArticle';
import { panierActions } from '../store/panierSlice';
import '../StyleComponent/Panier.css'

const Panier = ({panier ,  deleteElement , sendPanier}) => {
  let totalPanier = 0;
  const [validatePanier , setValidatePanier] = useState(false)
  const [infosSendPanier , setinfosSendPanier] = useState({numberUser:'', mailUser:''}); //Mise en place react-hook-form
  
  const dispatch = useDispatch();
  
  // const panier = useSelector(state => state.panier.panier);
  const panierState = useSelector(state => state.panier);
  React.useEffect(() => {
    dispatch(panierActions.sendTotalPanier(totalPanier))
  } ,[panier])
  
  const panierValidate = {
      userNumber:infosSendPanier.numberUser,
      userMail:infosSendPanier.mailUser,
      date: new Date().toUTCString(),
      article:panier,
  }

  const clickSendPanier = async (e) =>{
    e.preventDefault();
    
    if(!infosSendPanier.mailUser || !infosSendPanier.numberUser){
      alert('Renseignez vos infos pour envoyer votre panier!!');
      return;
    }

    dispatch(panierActions.sendPanierToBackOffice(panierValidate)); //cette lgine rend state.sendingPanier en true , donc provoque l'envoie dans le nouveau pack panierItemOk
    // sendPanier(panierValidate);
    // alert('Votre panier a bien été envoyé');
    // setValidatePanier({fal})
  }
  

  return (
    <div className='Panier col-lg-3 bg-secondary text-light'>
        
        {panier.length > 0 ? (
          <>
            <h3>Votre panier : </h3>
            <div className='listsPanier'>
              
                <ol>
                    {panier.map((panier , index) => (
                      <div key={index}>
                        <li > 
                          {panier.name} {panier.nbQte > 0 ? 'x'+panier.nbQte : ''} <br/>
                          {panier.nbQte > 0 ? panier.nbQte*panier.price+' FCFA' : ''}
                          <br/>
                          <span style={{display:'none'}}>{totalPanier += panier.nbQte*panier.price }</span>
                        </li>
                        <span onClick={() => deleteElement(panier.id)} style={{fontWeight:'bold',border:'solid 1px',fontSize:'14px',cursor:'pointer'}} className='bg-danger text-light'>Supprimer</span>
                      </div>
                    ) , totalPanier === panier.nbQte*panier.price )}
                    {/* <li>Article 1</li>
                    <li>Artcile 2</li>
                    <li>Article 3</li> */}
                </ol>
                <hr/>
                <span style={{fontWeight:'bolder', color:'white'}}>Total : {totalPanier ? totalPanier+' FCFA' : 0+' FCFA'} </span><br/>
                
                <form>
                  {validatePanier &&
                    
                    <div>
                      <input className='form-control' type='number' placeholder='Votre numero' value={infosSendPanier.numberUser} onChange={e => setinfosSendPanier({...infosSendPanier , numberUser:e.target.value})} />
                      <input className='form-control' type='email' placeholder='Votre mail' value={infosSendPanier.mailUser} onChange={e => setinfosSendPanier({...infosSendPanier , mailUser:e.target.value})}/>
                    </div>
                  
                  }
                  {validatePanier ? <input type='button'  className='btn-dark' value='Envoyer le panier' onClick={e => clickSendPanier(e)} />  : <input type='button' onClick={() =>setValidatePanier(true)} className='btn-dark' value='Valider le panier' />}
                </form>
            </div>
          </>
        )
        :
        (<div style={{border:'solid 1px', marginTop:'15px'}}>
          <h3>Votre panier est vide</h3>
        </div>)
        }
    </div>
  )
}

export default Panier