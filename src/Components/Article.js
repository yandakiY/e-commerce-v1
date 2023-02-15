import React from 'react'
import img1 from '../img/petunia1.jpg'
import '../StyleComponent/Article.css'

const Article = ({article ,viewPanier , handleLike , handleDislike , handleAddPanier}) => {
  return (
    <div className={viewPanier ? 'Article col-lg-6' : 'Article col-lg-4'}>
        <div className='infos-article'>
            <img alt='photo' src='https://picsum.photos/id/0/800/400' />
            
            {/* <img src={img1} /> */}
            <h4 className='title-infos'>
                {article.name} <br/>
                <span style={{fontSize:'20px'}}>({article.type})</span> <br/>
                {article.price} FCFA
            </h4>
        </div>

        <div className='interaction-article'>
            <span  onClick={() => handleLike(article.id)}>Like {article.like}</span>
            <span onClick={() =>handleDislike(article.id)}>Dislike {article.dislike}</span>
            <span onClick={() =>handleAddPanier(article)}>Ajouter au panier</span>
        </div>
    </div>
  )
}

export default Article