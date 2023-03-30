import { Grid, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import { getSubtotal } from '../utils';

export default function ReviewForm() {
    const cart = useSelector((state) => state.cart.value);
    const address = useSelector((state) => state.checkout.address);
    const addresses = address? Object.values(address): [];
    const payment = useSelector((state) => state.checkout.payment);
    const payments = payment? [{name:"Card type",detail:"Visa"},{name:"Card Number",detail:payment.cardNumber},{name:"Card Name",detail:payment.name},{name:"Expiry Date",detail:payment.expDate}]: [];
    const theme = useTheme();
  return (
    <>
        <Typography variant='h6' gutterBottom>Order Summary</Typography>
        <List disablePadding>
            {cart?.map(({product,quantity})=>(<ListItem key={product.title} sx={{py:1,px:0}}>
              <ListItemText sx={{"& .MuiListItemText-primary":{
                fontWeight: 500,
              },
              "& .MuiListItemText-secondary": {
                fontSize: theme.spacing(2),
              }
              }} primary={product.title} secondary={`Qty: ${quantity}`}></ListItemText>
              <Typography variant="body2">{getSubtotal([{product,quantity}])?.toFixed(2)}</Typography>
            </ListItem>
            ))}
            <ListItem sx={{py:1,px:0}}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" sx={{
                fontWeight:700,
              }}>{getSubtotal(cart).toFixed(2)}</Typography>
            </ListItem>
            <Grid container spacing = {2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom sx={{mt:2}}>
                  Shipping
                </Typography>
                <Typography gutterBottom>
                  {addresses.join(",")}
                </Typography>
              </Grid>
              <Grid item container direction="column" xs={12} sm={6}>
                <Typography variant="h6" sx={{mt:2}}>
                  Payment Details
                </Typography>
                <Grid container>
                  {payments.map(({name,detail}) => <>
                    <Grid key={name} item xs={6}>
                      <Typography>{name}</Typography>
                    </Grid>
                    <Grid key={detail} item xs={6}>
                      <Typography>{detail}</Typography>
                    </Grid>
                  </>)}
                </Grid>

              </Grid>
            </Grid>
        </List>

    </>
  )
}
