import React, { useEffect, useState } from "react";
import ProductContext from "./ProductContext";
import {
  getAllProducts,
  getSingleProduct,
} from "../../services/productService";

const ProductState = (props) => {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [singleLoading, setSingleLoading] = useState(false);

  const [error, setError] = useState("");
  const [singleError, setSingleError] = useState("");

  const getProducts = async () => {
    try {
      setLoading(true);
      setSingleError("");
      const response = await getAllProducts();
      setProducts(response);
    } catch {
      setError("Products not found");
    } finally {
      setLoading(false);
    }
  };

  const getProductbyId = async (id) => {
    try {
      setSingleLoading(true);
      setSingleError("");
      const response = await getSingleProduct(id);
      setSingleProduct(response);
    } catch {
      setSingleError("Product not found");
    } finally {
      setSingleLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    getProducts();
  }, []);
  return (
    <ProductContext.Provider
      value={{
        products,
        error,
        loading,
        getProductbyId,
        singleLoading,
        singleError,
        singleProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
