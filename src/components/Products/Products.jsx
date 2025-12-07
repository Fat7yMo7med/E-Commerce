import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { cartContext } from '../../context/cartContext';
import toast from "react-hot-toast"
import CategorySlider from "../CategorySlider/CategorySlider"


export default function Products() {

    const [product, setProduct] = useState([])
    
    const [isLoading, setLoading] = useState(true)

    let {addProductToCart} = useContext(cartContext); 
    async function addProductItem(id){
        let response = await addProductToCart(id)
        console.log('response',response); 
        if(response.data.status=='success'){
                toast.success(response.data.message)
            }
            else{
                toast.error(response.data.message)
            }
        }

    function getProducts(){
        axios.get('https://ecommerce.routemisr.com/api/v1/products')
        .then( ({data})=>{console.log(data.data)
            setLoading(false)
            setProduct(data.data)})

            .catch((error) => {
                setLoading(false);
                console.log(error)})
    }

    useEffect( ()=>{

        getProducts();

    } , [])
    return (
        <div className="container">
            <h2 className="text-secondary py-4">Shop Popular Category</h2>

                <CategorySlider />

            <h2 className="text-secondary py-4">All Products</h2>

        {
        !isLoading?  
        <div className="d-flex flex-wrap">
        {product.map( (productInfo)=>{
            return(
            <>
            <div className="w-25 px-4 styleProduct">
                <Link to = {`/productDetails/${productInfo.id}`}>
                <img src={productInfo.imageCover} className="w-100" alt={productInfo.title} />
                <span className="text-info d-block"> {productInfo.category.name} </span>
                <span className=" d-block"> {productInfo.title.split(' ').slice(0,3).join(' ')} </span>
                <div className="d-flex justify-content-between my-2">
                    <span>{productInfo.price} EGP</span>
                    <span>{productInfo.ratingsQuantity}<i className="fas fa-star text-warning"></i></span>
                </div>
                </Link>
                    <button className='btn bg-info text-white p-2 m-2 w-100'>Add To Cart</button>
            </div>
            </>
            ) 
        } )}
        </div>:
        <Loader/>
        }
    </div>
    )
}

