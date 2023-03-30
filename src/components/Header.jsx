import { AppBar, Autocomplete, Badge, Button, IconButton, MenuItem, TextField, Toolbar, Select, Typography, useTheme, Menu } from '@mui/material';
import React from 'react';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import { alpha, Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { getItemCount } from '../utils';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { fetchAllCategories } from '../feature/categories-slice';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../firebase/Auth';

const Search = styled("section")(({theme})=> ({
    position:"relative",
    borderRadius: theme.shape.borderRadius,
    display:"flex",
    backgroundColor: alpha(theme.palette.common.white,0.15),
    "&:hover":{
        backgroundColor: alpha(theme.palette.common.white,0.25),
    },
    marginRight:theme.spacing(2),
    marginLeft:0,
    width:"100%",
}))

const StyleAutocomplete = styled(Autocomplete)(({theme})=> ({
    color:"inherit",
    width: "100%",
    "& .MuiTextField-root":{
        paddingRight: `calc(1em + ${theme.spacing(4)})`,
    },
    "& .MuiInputBase-input":{
        color: theme.palette.common.white,
    },
    "& .MuiOutlinedInput-notchedOutline":{
        border: "none",
    }
}))

const SeacrhIconWrapper = styled("section")(({theme})=> ({
    padding: theme.spacing(0,2),
    height:"100%",
    position:"absolute",
    right: 0,
    pointerEvents:"none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}))

const StyledLink = styled(Link)(({theme})=> ({
    color:theme.palette.common.white,
    textDecoration:"none"
}))

function Searchbar(){
    const theme = useTheme();
    const products = useSelector((state) => state.products.value);
    const categories = useSelector((state) => state.categories.value);
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    const searchText = searchParams.get("searchTerm")
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        setSelectedCategory(category? category: "all");
    }, [category]);

    function handleCatChange(e){
        setSelectedCategory(e.target.value);
        navigate(e.target.value ==="all" ? "/" : `/?category=${e.target.value}${searchText? "&searchterm="+searchText : ""}`);
    }

    function handleSearchChange(searchTerm){
        if(searchTerm){
            navigate(selectedCategory==="all"? `?searchterm=${searchTerm}` : `/?category=${selectedCategory}&searchterm=${searchTerm}`);
        }else{
            navigate(selectedCategory==="all"? `/` : `/?category=${selectedCategory}`);
        }

    }
    if(!categories.length){
        dispatch(fetchAllCategories());
    }
    return (
    <Search>
        <Select 
            value={selectedCategory} 
            size="small" 
            sx={{
                m:1,
                textTransform:"capitalize",
                "&":{
                    "::before":{
                        ":hover":{
                            border: "none",
                        },
                    },
                    "::before, &::after":{
                        border:"none",
                    },
                    ".MuiSelect-standard":{
                        color: "common.white",
                    },
                    ".MuiSelect-icon":{
                        fill: theme.palette.common.white,
                    }
                },
            }}
            variant="standard" 
            labelId="selected-category" 
            id='selected-category-id' 
            onChange={(e) => handleCatChange(e)}
        >
            <MenuItem sx={{textTransform:"capitalize",}} value="all">all</MenuItem>
            {categories?.map(cat => <MenuItem sx={{textTransform:"capitalize",}} key={cat} value={cat}>{cat}</MenuItem>)}
        </Select>
        <StyleAutocomplete
            freeSolo
            id = "selected-product"
            value={selectedProduct}
            onChange={(e,value) =>{handleSearchChange(value?.label)}}
            disablePortal
            options={Array.from(selectedCategory === "all"?  products : products.filter((prod) => prod.category === selectedCategory), prod => ({id:prod.id,label:prod.title}))}
            renderInput={(params) => <TextField {...params}  />}
        />
        <SeacrhIconWrapper>
            <SearchIcon/>
        </SeacrhIconWrapper>
    </Search>)
}

export default function Header() {
    const {user,signOut} = useAuth();
    const cartItems = useSelector(state => state.cart?.value);
    const count = getItemCount(cartItems);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    function navigateToCart(){
        navigate("/cart")
    }
    function handleProfileMenuOpen(e){
        setAnchorEl(e.currentTarget);
    }
    function handleMenuClose(){
        setAnchorEl(null);
    }
    async function logout(){
        await signOut();
        navigate("/login");
    }
    const renderMenu = (
        <Menu id='user-profile-menu' keepMounted transformOrigin={{horizontal:"right",vertical:"top",}} anchorOrigin={{horizontal:"right",vertical:"bottom",}} open={isMenuOpen} onClose={handleMenuClose} anchorEl={anchorEl}>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
    )
  return (
    <>
        <AppBar position='sticky' sx={{
            py:0.5,mb:3
        }} >
            <Toolbar sx = {{display:"flex",gap:2}}>
                <img  height="40px" src='https://drive.google.com/file/d/1hZwKRSyy5Slg0-lrpRQ6daqJCmFC9Yda/view?usp=share_link' alt="" />
                <Typography variant='h6' color="inherit" sx={{
                    flexGrow:1,
                }}>
                    <StyledLink to="/">
                        Ecomm
                    </StyledLink>
                </Typography>
                <Searchbar/>
                <Box flexBasis={400} sx={{display:{md:"flex"}}}>
                    <IconButton onClick={navigateToCart} size="large" aria-label='shows cart items count' color='inherit'>
                        <Badge badgeContent={count} color="error"><ShoppingCartSharpIcon/></Badge>
                    </IconButton>
                    {user? <Button onClick={handleProfileMenuOpen} color="inherit">{user?.displayName ?? user.email}</Button>:<Button color="inherit" >Login</Button> }
                </Box>
                
            </Toolbar>
        </AppBar>
        {renderMenu}
    </>

  )
}
