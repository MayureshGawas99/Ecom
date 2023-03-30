import { Route ,createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import { Provider } from 'react-redux'
import {store} from "./store";
import Checkout from './pages/Checkout'
import AuthProvider from './firebase/Auth'
import { useAuth } from './firebase/Auth';
import Register from './pages/Register'


function ProtectedRoute({children}){
  const {user} = useAuth();
  if (!user){
    return <Navigate to={"/login"}/>
  }
  return children;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="/cart" index element={<Cart/>} />
        <Route path="/checkout" index element={
        <ProtectedRoute>
          <Checkout/>
        </ProtectedRoute>}/>
      </Route>
      <Route path="/login" index element={<Login/>} />
      <Route path="/register" index element={<Register/>} />

    </>

  )
)

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </AuthProvider>
  )
}

export default App
