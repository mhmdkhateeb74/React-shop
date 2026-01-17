import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminSettings({ Prodcuts, SetProducts }) {
  const navigate = useNavigate();

  const [mode, setMode] = useState("add"); 

  
  const [sidebarEditId, setSidebarEditId] = useState("");

 
  const [searchId, setSearchId] = useState("");

  
  const [addForm, setAddForm] = useState({
    name: "",
    price: "",
    description: "",
    image: ""
  });

  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    image: ""
  });

  function clearAddForm() {
    setAddForm({
      name: "",
      price: "",
      description: "",
      image: ""
    });
  }

  function clearEditForm() {
    setEditForm({
      id: "",
      name: "",
      price: "",
      description: "",
      image: ""
    });
  }

  function loadProductToEdit(idValue) {
    const idNum = parseInt(idValue);
    if (isNaN(idNum)) {
      alert("Enter valid product ID");
      return;
    }

    const found = Prodcuts.find((p) => p.id === idNum);
    if (!found) {
      alert("Product not found");
      return;
    }

    setEditForm({
      id: found.id,
      name: found.name,
      price: found.price,
      description: found.description,
      image: found.image
    });
  }

  function handleAdd() {
    if (
      addForm.name.trim() === "" ||
      addForm.price === "" ||
      addForm.description.trim() === "" ||
      addForm.image.trim() === ""
    ) {
      alert("Fill all fields");
      return;
    }

    const productToAdd = {
      id: Date.now(),
      name: addForm.name,
      price: Number(addForm.price),
      description: addForm.description,
      image: addForm.image
    };

    SetProducts((prev) => [...prev, productToAdd]);
    clearAddForm();

   
    navigate("/");
  }

  function handleSidebarEditClick() {
    setMode("edit");
    loadProductToEdit(sidebarEditId);
  }

  function handleSearch() {
    loadProductToEdit(searchId);
  }

  function handleUpdate() {
    if (editForm.id === "") {
      alert("Search product first");
      return;
    }

    const updatedList = Prodcuts.map((p) =>
      p.id === editForm.id
        ? {
            ...p,
            name: editForm.name,
            price: Number(editForm.price),
            description: editForm.description,
            image: editForm.image
          }
        : p
    );

    SetProducts(updatedList);

    setSearchId("");
    setSidebarEditId("");
    clearEditForm();

   
    navigate("/");
  }

  return (
    <div style={{ display: "flex", gap: "20px" }}>
    
      <div
        style={{
          width: "260px",
          background: "#1f2b38",
          padding: "15px",
          border: "2px solid black",
          height: "fit-content"
        }}
      >
        <h2 style={{ color: "white", marginTop: 0 }}>Admin</h2>

        <button
          onClick={() => setMode("add")}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            cursor: "pointer"
          }}
        >
          Add Product
        </button>

        <div style={{ marginTop: "10px" }}>
          <button
            onClick={handleSidebarEditClick}
            style={{
              width: "100%",
              padding: "10px",
              cursor: "pointer"
            }}
          >
            Edit Product
          </button>

          <input
            placeholder="Enter Product ID"
            value={sidebarEditId}
            onChange={(e) => setSidebarEditId(e.target.value)}
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "8px",
              boxSizing: "border-box"
            }}
          />
        </div>
      </div>

     
      <div
        style={{
          flex: 1,
          background: "#2c3e50",
          padding: "15px",
          border: "2px solid black",
          minHeight: "300px"
        }}
      >
     
        {mode === "add" && (
          <div>
            <h2 style={{ color: "white" }}>Add Product</h2>

            <input
              placeholder="Name"
              value={addForm.name}
              onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
              style={{ display: "block", marginBottom: "10px", width: "100%" }}
            />

            <input
              placeholder="Price"
              type="number"
              value={addForm.price}
              onChange={(e) => setAddForm({ ...addForm, price: e.target.value })}
              style={{ display: "block", marginBottom: "10px", width: "100%" }}
            />

            <input
              placeholder="Description"
              value={addForm.description}
              onChange={(e) =>
                setAddForm({ ...addForm, description: e.target.value })
              }
              style={{ display: "block", marginBottom: "10px", width: "100%" }}
            />

            <input
              placeholder="Image URL"
              value={addForm.image}
              onChange={(e) => setAddForm({ ...addForm, image: e.target.value })}
              style={{ display: "block", marginBottom: "10px", width: "100%" }}
            />

            <button onClick={handleAdd} style={{ padding: "10px 20px" }}>
              Add
            </button>
          </div>
        )}

        {mode === "edit" && (
          <div>
            <h2 style={{ color: "white" }}>Edit Product</h2>

           
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              <input
                placeholder="Search by Product ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                style={{ flex: 1, padding: "8px" }}
              />
              <button onClick={handleSearch}>Search</button>
            </div>

            <input
              placeholder="Name"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              style={{ display: "block", marginBottom: "10px", width: "100%" }}
            />

            <input
              placeholder="Price"
              type="number"
              value={editForm.price}
              onChange={(e) =>
                setEditForm({ ...editForm, price: e.target.value })
              }
              style={{ display: "block", marginBottom: "10px", width: "100%" }}
            />

            <input
              placeholder="Description"
              value={editForm.description}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
              style={{ display: "block", marginBottom: "10px", width: "100%" }}
            />

            <input
              placeholder="Image URL"
              value={editForm.image}
              onChange={(e) =>
                setEditForm({ ...editForm, image: e.target.value })
              }
              style={{ display: "block", marginBottom: "10px", width: "100%" }}
            />

            <button onClick={handleUpdate} style={{ padding: "10px 20px" }}>
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
