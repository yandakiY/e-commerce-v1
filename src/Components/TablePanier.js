import React from 'react'

const TablePanier = ({panier}) => {
  let total = 0;
  return (

    <div>

        <table className='table table-bordered bg-dark text-light'>
            <thead>
                <tr>
                    <th>Id Panier</th>
                    <th>Mail Panier</th>
                    <th>Numero Panier</th>
                    <th>Date de vakidation</th>
                    <th>Article</th>
                    <th>Total</th>
                </tr>
            </thead>
        
            <tbody>
               {panier.map((panier , index) => (
                    <tr key={index}>
                        <th scope="row" className="text-start">{panier.id}</th>
                        <th scope="row" className="text-start">{panier.userMail}</th>
                        <th scope="row" className="text-start">{panier.userNumber}</th>
                        <th scope="row" className="text-start">{panier.date} </th>
                        <th scope="row" className="text-start">
                            {panier.article.map((article) => 
                                /* article.map(element => total += element.price * element.nbQte) */
                                
                                    article.name+' ('+article.nbQte+') , '
                                
                            )}
                            {/* Total :  */}
                        </th>
                        
                        <th style={{display:'none'}}>{ panier.article.map((e) => total += e.price*e.nbQte) } br</th>
                        <th>{panier.totalPrice} FCFA</th>
                        {/* {total === 0} */}
                    </tr>
               ) )}
            </tbody>
        
        </table>

    </div>
  )
}

export default TablePanier