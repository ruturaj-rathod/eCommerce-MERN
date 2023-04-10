import { Typography } from '@mui/material'
import React from 'react'

const SpecialOffer = () => {
    return (
        <div className="container bg-special-offer my-5">
            <div className="p-3 p-sm-5 text-center text-md-start">
                <Typography variant='h6' component='div'>Limited Time Offer</Typography>
                <Typography variant='h4' component='div'>Special Edition</Typography>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse placeat, .</p>
                <div className="fw-bold">Buy Headphones At 20% discount, Use Code OFF20</div>
                <button className='btn btn-light rounded-0 my-4'>BUY NOW</button>
            </div>
        </div>
    )
}

export default SpecialOffer