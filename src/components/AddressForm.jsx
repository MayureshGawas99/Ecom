import { Box, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateAddress } from '../feature/checkout-slice'

export default function AddressForm() {
    const address = useSelector(state => state.checkout?.address)
    const dispatch = useDispatch()
    function handleChange(e){
        const {name,value} = e.target;
        dispatch(updateAddress({ [name]: value}))
    }

  return (
    <>
        <Typography variant="h6"gutterBottom>
            Shipping Address
        </Typography>
        <Box component="form" onChange={handleChange}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField defaultValue={address.firstName ?? ""} required id="firstname" name="firstName" label="First Name" fullWidth autoComplete='given-name' variant='standard'></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField defaultValue={address.lastName ?? ""} required id="lastname" name="lastName" label="Last Name" fullWidth autoComplete='family-name' variant='standard'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField defaultValue={address.address1 ?? ""} required id="address1" name="address1" label="Address Line 1" fullWidth variant='standard'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField defaultValue={address.address2 ?? ""} required id="address2" name="address2" label="Address Line 2" fullWidth variant='standard'></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField defaultValue={address.city ?? ""} required id="city" name="city" label="City" fullWidth variant='standard'></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField defaultValue={address.country ?? ""} required id="country" name="country" label="Country" fullWidth variant='standard'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField defaultValue={address.zipCode ?? ""} required id="zipCode" name="zipCode" label="Zip Code/Postal Code" fullWidth variant='standard'></TextField>
                </Grid>


            </Grid>
        </Box>
    </>
  )
}
