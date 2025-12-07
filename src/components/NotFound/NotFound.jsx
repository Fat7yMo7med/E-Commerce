import React from 'react'
import { useState } from 'react';
import notFound from '../../assets/Images/404.png';

export default function NotFound() {
    return (
        <div className='d-flex flex-wrap justify-content-center align-content-center m-auto'>
            <h2 className='text-center'>There Is An Error In Server</h2>
            <div className='w-100 m-auto d-flex justify-content-center'>
                <img src={notFound} className='w-75' alt="Image Not Found" />
            </div>
        </div>
    )
}
