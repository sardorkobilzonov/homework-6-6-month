import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    async function fetchProductById() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${productId}`
      );
      const productData = await response.json();
      setProduct(productData);
    }
    if (productId) {
      fetchProductById();
    }
  }, [productId]);

  // useEffect(() => {
  //   if (product) {
  //     console.log(product);
  //   }
  // }, [product]);

  function handleSelectChange(event) {
    setProductId(event.target.value);
  }

  return (
    <div className="App">
      <select
        onChange={handleSelectChange}
        style={{ width: "280px", padding: "4px 5px", fontSize: "18px" }}
      >
        {products.map((product) => (
          <option
            key={product.id}
            value={product.id}
            style={{ fontSize: "18px" }}
          >
            {product.title}
          </option>
        ))}
      </select>

      {product ? (
        <div>
          <h2>{product.title}</h2>
        </div>
      ) : (
        <p style={{ fontSize: "21px" }}>Maxsulot mavjud emas</p>
      )}
    </div>
  );
}
