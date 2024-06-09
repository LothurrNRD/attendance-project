// components/CardComponent.js
import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ProductCard = ({ product, onAddToCart }) => {
    const { name, price, stock, weight } = product;

    const handleAddToCart = () => {
        onAddToCart(product);
    };

    return (
        <Card>
            <CardMedia component="img" height="140" alt={name} />
            <CardContent>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="h6">{price}$</Typography>
                <Typography variant="body2" color="text.secondary">
                    {stock} stock
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {weight} lb
                </Typography>
                <Button onClick={handleAddToCart} variant="contained" color="primary">
                    Add to cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
