import { Typography } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { removeAllItemsFromCart } from '../../actions/cartAction';
import "./Success.css";


const Success = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeAllItemsFromCart());
  }, [dispatch]);
  
  return (
    <div className="orderSuccess">
        <CheckCircle />
        <Typography>Your Order has been placed successfully</Typography>
        <Link to="/orders">View Orders</Link>
    </div>
  )
}

export default Success