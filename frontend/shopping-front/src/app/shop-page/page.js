// pages/products.js
'use client'

import Head from 'next/head';
import Grid from '@mui/material/Grid';
import ProductCard from '../components/CardComponent';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/product').then((res) => {
            console.log(res.data.products);
            setProducts(res.data.products);
        })
    }, [])
    const handleAddToCart = (product) => {
        const existingItems = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItems = [...existingItems, product];
        localStorage.setItem('cart', JSON.stringify(cartItems))
    };
    return (
        <div>
            <Head>
                <title>Products</title>
                <meta name="description" content="All Products" />
            </Head>

            <main>
                <h1>Products</h1>
                <Grid container spacing={2}>
                    {products.map((products, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <ProductCard product={products} onAddToCart={handleAddToCart} />
                        </Grid>
                    ))}
                </Grid>
            </main>
        </div>
    );
};

export default ProductsPage;
