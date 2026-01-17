import { Totalmoney } from "./Cart"
import React, { useState } from "react";
import ShowProdcuts from "./Showproducts";

export default function CheckOut({CheckoutProducts,OnBuy})
{
   
    const [orderinfo, SetOrderinfo] = useState({ address: "",customerId:"" });


        function handleSubmit(e){
            e.preventDefault();
            OnBuy(orderinfo,BoughtProducts())
            
        }

        function BoughtProducts()
        {
             let boughtproducts="";

             for(let i=0; i<CheckoutProducts.length;i++)
                {
                    boughtproducts+=CheckoutProducts[i].name +"("+CheckoutProducts[i].quantity+"), ";

                }

             return boughtproducts

        }

    return(

        <>
        
       
        <ShowProdcuts products={CheckoutProducts} ShowOrNot={false}  />
 
          
            <h1>Total:{Totalmoney(CheckoutProducts)}</h1>

            <form onSubmit={handleSubmit}>

                <input value={orderinfo.address} 
                placeholder="Address"
                onChange={(e) =>
                    SetOrderinfo({
                    ...orderinfo,
                    address: e.target.value
                    })}/>
                

                <input value={orderinfo.customerId} 
                placeholder="CustomerId"
                onChange={(e) =>
                    SetOrderinfo({
                    ...orderinfo,
                    customerId: e.target.value
                    })}/>

                <button type="submit">Buy</button>


            </form>
        
        </>
    )

}

