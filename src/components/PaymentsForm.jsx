import { Box, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { updatePayment } from '../feature/checkout-slice';

export default function PaymentsForm() {
    const payment = useSelector(state => state.checkout?.payment)
    const dispatch = useDispatch()
    function handleChange(e){
        const {name,value} = e.target;
        dispatch(updatePayment({ [name]: value}))
    }
  return (
    <>
        <Typography variant="h6" gutterBottom>
            Payment Method
        </Typography>
        <Box component="form" onChange={handleChange}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField defaultValue={payment.name ?? ""} name="name" id="name" variant='standard' required label="Name on Card" fullWidth autoComplete='cc-name'/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField defaultValue={payment.cardNumber ?? ""} name="cardNumber" id="cardNumber" variant='standard' required label="Card Number" fullWidth autoComplete='cc-number'/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField defaultValue={payment.expDate ?? ""} name="expDate" id="expDate" variant='standard' required label="Expiry Date" fullWidth autoComplete='cc-exp'/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField defaultValue={payment.cvv ?? ""} name="cvv" id="cvv" type="password" variant='standard' required label="CVV" fullWidth autoComplete='cc-csc'/>
                </Grid>
            </Grid>

        </Box>
    </>
  )
}
