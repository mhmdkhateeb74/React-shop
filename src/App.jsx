import React, { useState } from "react";
import {Link,createBrowserRouter,RouterProvider, Outlet,useRouteError} from 'react-router-dom';
import Shop from "./pages/Shop";
import CartBox from "./pages/Cart"
import Pay from "./pages/Checkout"
import { Totalmoney } from "./pages/Cart";
import { products } from "./pages/Prodcutsarr";
import AdminSettings from "./pages/Admin";

export default function App() {
  const [Cart, setCart] = useState([]);
  const [Orders, setOrders] = useState([]);
  const [Prds,setPrds]=useState(products);
  
  function AddToCart(prd) {
    const found = Cart.find((item) => item.id === prd.id);

    if (found) {
      const newCart = Cart.map((item) =>
        item.id === prd.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(newCart);
    } else {
      setCart([...Cart, { ...prd, quantity: 1 }]);
    }
  }

  function HandleOrders(customerInfo,boughtproducts)
  {
    let neworder={

      OrderID:Date.now(),
      CustomerID:customerInfo.customerId,
      Address:customerInfo.address,
      Prdbought:boughtproducts,
      Total:Totalmoney(Cart)
    };

    setOrders(prevorder => [...prevorder,neworder])

    alert(
      "OrderID: " + neworder.OrderID +
      "   Address: " + customerInfo.address +
      "   CustomerId: " + customerInfo.customerId +
      "   Products: " + boughtproducts +
      "   Total: " + neworder.Total
    );

   

  }

  function DeleteProduct(id)
  {
    let NewCart=Cart.filter((item) => item.id !== id);

    setCart(NewCart);

  }

  function updateQuantity(id, newQty) 
  {
    let qty = parseInt(newQty);
  
    if (isNaN(qty) || qty < 1) {
      qty = 1;
    }
  
    const newCart = Cart.map((item) =>
      item.id === id ? { ...item, quantity: qty } : item
    );
  
    setCart(newCart);
  }



  const router=createBrowserRouter([
        {
          path: '/',
      element: <>

        <nav  style={{display: "flex",justifyContent: "center",gap: "20px",backgroundColor: "grey",padding: "10px"}}>

          <div style={{ border: "3px solid black",padding: "5px 15px",background:"#2c3e50"}}>

              <Link style={{color:"White"}} to="/">Shop</Link>
            
            </div>&nbsp;
          
          <div style={{ position: "absolute", top: "15px", right: "20px" }}>
              <Link to="/Cart">
                <img src="/imgs/Cart.png" style={{ width: "28px", cursor: "pointer" }} />
              </Link>
          </div>


            <div style={{ border: "3px solid Black" ,padding: "5px 15px",background:"#2c3e50"}}>
           
           <Link style={{color:"White"}} to="/CheckOut">CheckOut</Link>
          
           </div>&nbsp;

           <div style={{ position: "absolute", top: "15px", left: "20px" }}>
              <Link to="/Admin">
                <img src="/imgs/Admin.png" style={{ width: "28px", cursor: "pointer" }} />
              </Link>
          </div>
          
        </nav>

        <div style={{ backgroundColor: "#2c3e50", minHeight: "100vh", padding: "20px" }}>
        <Outlet />
        </div>

      </>,
        children: [

          {
            index:true,
            element:<> <Shop addToCart={AddToCart} Products={Prds} /> </>,
           

          },

          {

            path: 'Cart',
            element:<>  <CartBox CartProducts={Cart} DeleteProduct={DeleteProduct} updateQuantity={updateQuantity} /> </>

          },

          {

            path: 'CheckOut',
            element:<> <Pay CheckoutProducts={Cart} OnBuy={HandleOrders} /> </>

          },

          {

            path: 'Admin',
            element:<> <AdminSettings Prodcuts={Prds} SetProducts={setPrds}/> </>

          }



        ],
        
        errorElement: <ErrorPage />

      }]);



  return (
    <>
    <header style={{display: "flex",justifyContent: "center",alignItems: "center",backgroundColor: "#2c3e50",color: "white",padding: "20px"
  }}>
          <div>
            <h1>
              Store
            </h1>
          </div>
        </header>

        <RouterProvider router={router} />

    </>
  );
}

export function ErrorPage() {
  let error = useRouteError();
  return (
    <>
      <h1>oops</h1>
      <h3>the page is not exist</h3>
      <h5>{error?.message} {error?.statusText}</h5>
    </>
  );
}
