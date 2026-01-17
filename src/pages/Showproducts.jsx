export default function ShowProdcuts({products,ShowOrNot,DeleteProduct,updateQuantity}) {
    return (
      <table style={{width: "100%",borderCollapse: "collapse",background: "gray" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid white" }}>
            <th style={thStyle}>Image</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Quantity</th>
            {ShowOrNot && <th style={thStyle}>Remove</th>}
          </tr>
        </thead>
  
        <tbody>
          {products.map((prd) => (
            <tr key={prd.id} style={{ borderBottom: "1px solid white" }}>
              <td style={tdStyle}>
                <img src={prd.image} alt={prd.name} style={{ width: "60px" }} />
              </td>
  
              <td style={{ ...tdStyle, color: "white" }}>
                <div style={{ fontWeight: "bold" }}>{prd.name}</div>
                <div style={{ fontSize: "14px" }}>{prd.description}</div>
              </td>
  
              <td style={{ ...tdStyle, color: "white" }}>{prd.price}$</td>
  
              <td style={tdStyle}>
                
                {ShowOrNot ? (
                  <input
                    type="number"
                    min="1"
                    value={prd.quantity}
                    onChange={(e) => updateQuantity(prd.id, e.target.value)}
                    style={{ width: "70px" }}
                  />
                ) : (
                  <span style={{ color: "white" }}>{prd.quantity}</span>
                )}
              </td>
  
              {ShowOrNot && (
                <td style={tdStyle}>
                  <button
                    onClick={() => DeleteProduct(prd.id)}
                    style={{ color: "red", fontWeight: "bold" }}
                  >
                    X
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  const thStyle = {
    padding: "10px",
    textAlign: "left",
    color: "white"
  };
  
  const tdStyle = {
    padding: "10px",
    verticalAlign: "top"
  };
  