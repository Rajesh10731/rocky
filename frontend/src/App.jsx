import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const storeInfo = {
  GST: "33ABCDE1234F1Z5",
  contact: "082488 17165",
  source: "Vaseegrah",
  address:
    "No.09, Vijaya Nagar Wahab Nagar Near, Srinivasapuram Post, Thanjavur, Tamil Nadu - 613009",
};

function StoreInfoPopup({ onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h2>Store Information</h2>
        <p><strong>GST Number:</strong> {storeInfo.GST}</p>
        <p><strong>Contact:</strong> {storeInfo.contact}</p>
        <p><strong>Source:</strong> {storeInfo.source}</p>
        <p><strong>Address:</strong> {storeInfo.address}</p>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    count: "",
    image: null,
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setInputValues(Array(res.data.length).fill(""));
      })
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  const handleImageClick = () => setShowPopup(true);
  const handleClose = () => setShowPopup(false);

  const handleInputChange = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
  };

  const handleUpdate = async (index) => {
    const addCount = parseInt(inputValues[index]);
    if (isNaN(addCount) || addCount <= 0) return;

    const product = products[index];
    const updatedCount = product.count + addCount;

    try {
      await axios.put(`http://localhost:5000/api/products/${product._id}`, {
        count: updatedCount,
      });

      const updatedProducts = [...products];
      updatedProducts[index].count = updatedCount;
      setProducts(updatedProducts);

      const newValues = [...inputValues];
      newValues[index] = "";
      setInputValues(newValues);
    } catch (err) {
      console.error("Error updating product count", err);
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.count || !newProduct.image) return;

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("count", newProduct.count);
    formData.append("image", newProduct.image);

    try {
      const res = await axios.post("http://localhost:5000/api/products/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProducts([...products, res.data]);
      setInputValues([...inputValues, ""]);
      setNewProduct({ name: "", count: "", image: null });
      setShowAddForm(false);
    } catch (err) {
      console.error("Error adding product", err);
    }
  };

  const handleDelete = async (productId, index) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      const updatedProducts = products.filter((_, i) => i !== index);
      const updatedInputValues = inputValues.filter((_, i) => i !== index);
      setProducts(updatedProducts);
      setInputValues(updatedInputValues);
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  return (
    <div className="app">
      <h1>Warehouse Inventory</h1>

      <div className="top-bar">
        <button className="add-product-btn" onClick={() => setShowAddForm(true)}>
          Add Product
        </button>
      </div>

      <div className="product-list">
        {products.map((product, index) => (
          <div className="card" key={product._id}>
            <div className="card-content">
              <img
                src={product.image || "/placeholder.png"}
                alt={product.name}
                className="product-img"
                onClick={handleImageClick}
                onError={(e) => { e.target.src = "/placeholder.png"; }}
              />
              <h3 className="product-title">{product.name}</h3>
              <div className="details">
                <p><strong>Count:</strong> {product.count}</p>
                <p><strong>Source:</strong> {storeInfo.source}</p>
              </div>
            </div>

            <div className="card-footer">
              <input
                type="number"
                placeholder="Enter new count"
                className="input-box"
                value={inputValues[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <button
                  className="update-btn"
                  disabled={!inputValues[index] || isNaN(inputValues[index]) || parseInt(inputValues[index]) <= 0}
                  onClick={() => handleUpdate(index)}
                >
                  Update
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product._id, index)}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showPopup && <StoreInfoPopup onClose={handleClose} />}

      {showAddForm && (
        <div className="popup-overlay" onClick={() => setShowAddForm(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h2>Add Product</h2>

            <div className="form-group">
              <label><strong>Product Name:</strong></label>
              <input
                type="text"
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="input-box"
              />
            </div>

            <div className="form-group">
              <label><strong>Count:</strong></label>
              <input
                type="number"
                placeholder="Enter count"
                value={newProduct.count}
                onChange={(e) => setNewProduct({ ...newProduct, count: e.target.value })}
                className="input-box"
              />
            </div>

            <div className="form-group">
              <label><strong>Image:</strong></label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
              />
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button style={{backgroundColor:"blue",color:"white"}}className="add-btn" onClick={handleAddProduct}>
                Add 
              </button>
              <button style={{backgroundColor:"red",color:"white"}} className="action-btn" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;



