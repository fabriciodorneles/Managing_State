import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PageNotFound from "./PageNotFound";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";

export default function Detail(props) {
  const { id } = useParams();
  const skuRef = useRef();
  const { data: product, loading, error } = useFetch("products/" + id);
  const navigate = useNavigate();

  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <select id="size" ref={skuRef}>
        <option value="">What size?</option>
        {product.skus.map((s) => (
          <option key={s.sku} value={s.sku}>
            {s.size}
          </option>
        ))}
      </select>
      <p>
        <button
          className="btn btn-primary"
          onClick={() => {
            const sku = skuRef.current.value;
            if (!sku) return alert("select size.");
            props.addToCart(id, sku);
            navigate("/cart");
          }}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
