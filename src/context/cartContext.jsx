import axios from "axios";
import { createContext } from "react";
import { useState } from "react";

let headers = {
    token: localStorage.getItem('userToken')
}

export let cartContext = createContext();

export default function CartContextProvider(props) {
    
    let [cartNumber , setCartNumber] = useState(0)

    function addProductToCart(productId){
        return axios.post( `https://ecommerce.routemisr.com/api/v1/cart`,
            { productId: productId },
            { headers: headers }
        )
        .then((response)=>response)
        .catch((error)=>error) 
    }
    
    function getProductToCart(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers: headers 
            }
        ).then((response)=>{
            setCartNumber(response.data.numOfCartItems)
            return response})
        .catch((error)=>error) 
    }


    function deleteProductFromCart(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers: headers 
            }
        ).then((response)=>{
            setCartNumber(response.data.numOfCartItems)
            return response})
        .catch((error)=>error) 
    }

    
    function updateProductInCart(Id,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${Id}`, 
            {count:count},
            {headers:headers},)
            .then((response)=>response)
            .catch((error)=>error)
        
    }

    return <cartContext.Provider value={{ addProductToCart ,getProductToCart ,deleteProductFromCart ,updateProductInCart,cartNumber}}>
    { props.children }
</cartContext.Provider>
}
