import React from 'react'
import '../StyleComponent/ArticleList.css'
import Article from './Article'

const ArticleList = ({viewPanier , articles, valueCheckbox , wordSearch , handleLike , handleDislike , handleAddPanier}) => {
    
    const wordRegex = new RegExp(wordSearch , 'gim');
    let newArticles;
    
    return (
        <div className={`ArticleList container-fluid bg-dark ${!viewPanier ? 'col-lg-12' : 'col-lg-9'}`}>
        {/* On verifie si la value du checkbox est selectionné on fait un filter sur l'array articles avec une condition |?| sinon on fait un simple .map sur articles . A ne pas oublier le console.log(newArticles) pour valider le bout de code.  */}
            {valueCheckbox ? (newArticles = articles.filter((article) => (article.like >= 10)) , 1+1 ) : (newArticles = articles.map((article) => article), 1+1 )}
            
            {newArticles.length > 0 ?
                (
                    <>
                        <h2 className='text-light'>Nos articles</h2>
                        <div className='row'>
                        {!wordSearch ?
                            newArticles.map((article , index) => 
                                <Article key={index} handleAddPanier={handleAddPanier} handleLike={handleLike} handleDislike={handleDislike} viewPanier={viewPanier} article={article} /> 
                            )
                            : 
                            newArticles.map((article , index) => article.name.match(wordRegex) || article.type.match(wordSearch)  ? 
                                <Article key={index} handleAddPanier={handleAddPanier} handleLike={handleLike} handleDislike={handleDislike} viewPanier={viewPanier} article={article} /> : ''
                            )
                        }
                        </div>
                    </>
                )
            :
                <div style={{textAlign:"center"}}>
                    <span style={{fontSize:"35px", margin:'auto'}} className='text-light'>Pas d'articles disponibles.</span>
                </div>
            }
        </div>
  )
}

export default ArticleList