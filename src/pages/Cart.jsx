import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Rating, TextField, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../feature/cart-slice';
import { getSubtotal } from '../utils';

export default function Cart() {
    const cart = useSelector(state => state.cart?.value);
    const subtotal = getSubtotal(cart)?.toFixed(2);
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function updateQuantity(e,{product,quantity}){
        const updatedQuantity = e.target.valueAsNumber;
        if (updatedQuantity < quantity){
            dispatch(removeFromCart({product}))
        }else{
            dispatch(addToCart({product}))
        }
    }
    function goToHome(){
        navigate("/");
    }
    function checkoutItems(){
        navigate("/checkout")
    }
  return (
    <Container sx={{py:8}}>
        <Grid container spacing={2}>
            <Grid item container spacing={2} md={8}>
                {cart?.map(({product,quantity})=>{
                    const {title,id,price,description,rating,image} = product;
                    return <Grid item key={id} xs={12}>
                        <Card sx={{display:"flex",py:2}}>
                            <CardMedia component="img" image={image} alt={title} sx={{width:theme.spacing(30), height:theme.spacing(30),objectFit:"contain",pt:theme.spacing()}}/>
                            <CardContent sx={{display:"flex",justifyContent:"space-between",alignItems:"center",flex:1,}}>
                                <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
                                    <Typography variant='h5'>
                                        {title}
                                    </Typography>
                                    <Rating readOnly precision={0.5} value={rating.rate} />
                                    <form>
                                        <TextField onChange={(e)=>updateQuantity(e,{product,quantity})} inputProps={{min:0,max:10}} sx={{width:theme.spacing(8)}} id={`${id}-product-id`} type="number" variant='standard' label="Quantity" value={quantity}></TextField>
                                    </form>
                                </Box>
                                <Box>
                                    <Typography variant='h5' paragraph></Typography>
                                    {getSubtotal([{product,quantity}])?.toFixed(2)}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>  
                })}
            </Grid>
            <Grid item container md={4} sx={{display:"flex",justifyContent:"center",}}>
                <Box sx={{width:"100%",}}>
                    <Card sx={{padding:2,display:"flex",flexDirection:"column",gap:2}}>
                        <Typography variant='h4'> Subtotal</Typography>
                        <Typography variant='h5'>{subtotal}</Typography>
                        {subtotal>0 ? <Button onClick={checkoutItems} variant='contained'>Buy Now</Button>: <Button onClick={goToHome} variant='contained'>Shop Now</Button>}
                    </Card>
                </Box>
            </Grid>

        </Grid>

    </Container>
  )
}

