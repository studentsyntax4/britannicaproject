import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchProducts } from '../lib/api';

const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await fetchProducts();
        if (active) setProducts(data);
      } catch (e) {
        if (active) setError(e);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const getProduct = (id) => products.find((x) => x.id === id);
  const byCategory = (cat) => products.filter((x) => x.category === cat);
  const bestsellers = () => products.filter((x) => x.tag === 'Bestseller' || x.tag === 'New').slice(0, 8);

  const value = { products, loading, error, getProduct, byCategory, bestsellers };
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
};
