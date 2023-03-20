import { Typography } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { removeAllItemsFromCart } from '../../actions/cartAction';
import "./Success.css";


const Success = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeAllItemsFromCart());
  }, []);
  
  return (
    <div className="orderSuccess">
        <CheckCircle />
        <Typography>Your Order has been placed successfully</Typography>
        <Link to="/orders">View Orders</Link>
    </div>
  )
}

export default Success