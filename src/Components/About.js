import React from 'react'
import '../StyleComponent/About.css'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='container-fluid About'>
       
        <div className='row HeaderAbout'>
            <h1 className='col-6'>About me</h1>
            <Link className='col-6 linkHeader' to='/'>Retour a l'accueil</Link>
        </div>

        <div className='row BodyAbout'>
            <div className='col-lg-6 me'>
                <h3>Moi :</h3>
                <div className='imgProfilDIV'></div>
                <p>
                    Salut je suis Boa Yandaki Yves Michel. Developpeur Web Junior.<br/>
                    Passioné de programmation et de technologie j'ai actuellement un BAC+3 en Informatique (developpeur d'application)
                    Maitrisant le JAVA et son environnement JAVA EE pour les applications d'Entreprise.<br/>
                    Actuellement apres mon stage je suis en apprentissage de REACT JS et du tech stack MERN (<span style={{color:'blue',fontWeight:'bold'}}>MongoDB Express React Next</span>)
                </p>
            </div>

            <div className='col-lg-6 site'>
                <h3>Le site :</h3>
                <div className='imgSiteDIV'></div>
                <p>
                    Ce site est mon premier essai avec React Js concernant le build d'un site e-commerce.<br/>
                    J'ai fait ce site avec les bases de REACT JS que j'ai appris pendant mes premieres semaines d'apprentissage. 
                    <br/>
                    Connaissance utilisée :
                </p>
                    <ul>
                        <li>Creation de Components</li>
                        <li>Data Binding</li>
                        <li>React Router Dom</li>
                    </ul>
                    {/* (<span style={{color:'blue',fontWeight:'bold'}}>MongoDB Express React Next</span>) */}
                
            </div>
        </div>
    </div>
  )
}

export default About