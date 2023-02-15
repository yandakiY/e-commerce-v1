import React from 'react'
import {Link} from 'react-router-dom'
import '../StyleComponent/ArticleListHome.css'

const ArticleListHome = ({article , deleteArticle}) => {
  return (
    <div className='ArticleListHome'>
        <div className='part-left'>
            <h4> {article.name} </h4>
            <span className='text-danger'>{article.price} FCFA</span><br/>
        </div>

        <div className='part-right'>
            <Link to='/updatearticle' state={{articleSelected: article}}>Modifier</Link> <br/>
            <Link className='text-danger' onClick={() => deleteArticle(article.id)} to='#'>Supprimer</Link>
        </div>
    </div> 
  )
}

export default ArticleListHome