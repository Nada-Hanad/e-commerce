import React, { useEffect, useState } from "react";
import ProductCard from "../components/productCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { CircularProgress } from "@mui/material";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    favorites: [],
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  function getAllProducts() {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function getAllCategories() {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((res) => {
        setCategories(res);
      });
  }
  function getProductsByCategory(category) {
    fetch("https://dummyjson.com/products/category/" + category)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
      });
  }
  function handleChange(event) {
    if (event.target.value == "all") {
      getAllProducts();
    } else {
      getProductsByCategory(event.target.value);
    }
  }
  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);
  return (
    <main className="home">
      <select onChange={handleChange}>
        <option value="all">All</option>
        {categories.map((e) => {
          return (
            <option key={e} value={e}>
              {e.toUpperCase()}
            </option>
          );
        })}
      </select>
      <h2>Favorites</h2>
      <Swiper slidesPerView={3.4} className="swiper1">
        <div className="products">
          {user.favorites.map((e) => {
            return (
              <SwiperSlide className="product-slide" key={e.id}>
                <ProductCard
                  setUser={setUser}
                  user={user}
                  product={e}
                  favorite={true}
                />
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
      <h2>Featured products</h2>
      {loading ? (
        <CircularProgress />
      ) : error !== "" ? (
        <h1>{error}</h1>
      ) : (
        <Swiper slidesPerView={3.4} className="swiper1">
          <div className="products">
            {products.map((e) => {
              return (
                <SwiperSlide className="product-slide" key={e.id}>
                  <ProductCard
                    product={e}
                    user={user}
                    setUser={setUser}
                    isFavorite={false}
                  />
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      )}
    </main>
  );
}
