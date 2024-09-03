import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductPage.css";
import AddProduct from "../component/AddProduct";

export default function ProductPage() {
  const navigate = useNavigate();

  const [productList, setProductList] = useState([]);

  const [updateProduct, setUpdateProduct] = useState({});
  const [isUpdate, setIsUpdate] = useState("");

  const getProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:1920/products");
      setProductList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (productId) => {
    console.log("delete : ", productId);
    const deletedRecords = await axios.delete(
      `http://127.0.0.1:1920/products/${productId}`
    );
    getProducts();
    alert(`${deletedRecords.data} Product deleted successfully`);
  };

  const handleUpdateProduct = (product) => {
    console.log(product);
    // pass product object to addProduct component
    // setUpdateProduct(product);
    setIsUpdate(product.id);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/", { replace: true });

    getProducts();

    // try {
    //   const response = await axios.get("http://127.0.0.1:1920/products");
    //   setProductList(response.data);
    // } catch (err) {
    //   console.log(err);
    // }

    /* setProductList([
      {
        id: 1,
        name: "iPhone 9",
        price: 789,
        category: "smartphones",
        qty: 12,
      },
      {
        id: 2,
        name: "iPhone X",
        price: 899,
        category: "smartphones",
        qty: 15,
      },
      {
        id: 3,
        name: "Samsung Universe 9",
        price: 1249,
        category: "smartphones",
        qty: 30,
      },
      {
        id: 4,
        name: "iPhone 7",
        price: 439,
        category: "smartphones",
        qty: 10,
      },
      {
        id: 5,
        name: "iPhone 8",
        price: 469,
        category: "smartphones",
        qty: 20,
      },
      {
        id: 6,
        name: "iPhone 11",
        price: 1189,
        category: "smartphones",
        qty: 500,
      },
    ]);  */
  }, []);

  const handleLogOff = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    // <React.Fragment>
    <>
      <div className="container">
        <div style={{ textAlign: "right", marginTop: "1rem" }}>
          <button className="btn btn-info" onClick={handleLogOff}>
            Log Off
          </button>
        </div>
        <AddProduct
          updateProductList={() => {
            getProducts();
            setUpdateProduct({});
          }}
          product={updateProduct}
        />
        <table className="table table-bordered table-strip">
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Product Name</th>
              <th>Category Name</th>
              <th>Product Price</th>
              <th>Product Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((productItem) => {
              return (
                <tr key={productItem.id}>
                  <td>
                    <input
                      className="input-disabled"
                      type="text"
                      id="productId"
                      value={productItem.id}
                      disabled={
                        isUpdate === productItem.id ? undefined : "true"
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input-disabled"
                      type="text"
                      id="productName"
                      value={productItem.name}
                      disabled={
                        isUpdate === productItem.id ? undefined : "true"
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input-disabled"
                      type="text"
                      id="categoryName"
                      value={productItem.category}
                      disabled={
                        isUpdate === productItem.id ? undefined : "true"
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      className="input-disabled"
                      type="text"
                      id="productPrice"
                      value={productItem.price}
                      disabled={
                        isUpdate === productItem.id ? undefined : "true"
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      className="input-disabled"
                      type="text"
                      id="productQty"
                      value={productItem.qty}
                      disabled={
                        isUpdate === productItem.id ? undefined : "true"
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      style={{ marginRight: "5px" }}
                      onClick={() => handleUpdateProduct(productItem)}
                    >
                      {isUpdate === productItem.id ? "Save" : "Update"}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(productItem.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
