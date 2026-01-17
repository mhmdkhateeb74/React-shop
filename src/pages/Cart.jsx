import ShowProdcuts from "./Showproducts";
import {Link} from 'react-router-dom';

export default function CartBox({CartProducts, DeleteProduct, updateQuantity})
{

    

    return (
        <>
        <div>

            <ShowProdcuts products={CartProducts} DeleteProduct={DeleteProduct} updateQuantity={updateQuantity} ShowOrNot={true} />

           <h1>Total:{Totalmoney(CartProducts)}</h1>
           <div
          style={{ marginTop: "8px",marginLeft: "10px"}}>
                 <Link to="/CheckOut">
                   <img src="/imgs/Pay.png" style={{ width: "40px", cursor: "pointer" }} />
                 </Link>
           </div>&nbsp;

        </div>
        
        </>
    )
      
}

export function Totalmoney(CartProducts)
{

    let total=0;

    for(let i=0;i<CartProducts.length;i++)
    {
        total=total+(CartProducts[i].quantity*CartProducts[i].price);

    }

    return total;

}