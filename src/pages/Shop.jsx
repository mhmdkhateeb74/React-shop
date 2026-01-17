
 export default function ProductBox({addToCart,Products}) {
    return (
    <>

<div style={{display: "flex",flexWrap: "wrap",gap: "20px",justifyContent: "center",alignItems: "center",minHeight: "80vh",padding: "20px"}}>

            {Products.map(prd => (
              <div key={prd.id} style={{ border: "1px solid white", padding: "10px", width: "200px", background:"gray" }}>
                 <img src={prd.image} alt={prd.name} width="150" />
                <h3>{prd.name}</h3>
                <p>{prd.description}</p>
                <h5>{prd.price+"$"}</h5>

                <button onClick={() =>addToCart(prd)}>Add to Cart</button>

              </div>
            ))}
          </div>
    
    
    
    
    </>

    )
  
    }