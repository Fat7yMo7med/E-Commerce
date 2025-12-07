import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'
import toast from "react-hot-toast"
import CategorySlider from "../CategorySlider/CategorySlider"
import styles from './Products.module.css'

export default function Products() {

  const [product, setProduct] = useState([])
  const [isLoading, setLoading] = useState(true)

  let { addProductToCart } = useContext(cartContext)

  async function addProductItem(id) {
    let response = await addProductToCart(id)

    if (response.data.status === 'success') {
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }

  function getProducts() {
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then(({ data }) => {
        setLoading(false)
        setProduct(data.data)
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
  }

  useEffect(() => { getProducts() }, [])

  return (
    <div className={styles.productsContainer}>

      <h2 className={styles.title}>Shop Popular Category</h2>
      <CategorySlider />

      <h2 className={styles.title}>All Products</h2>

      {!isLoading ? (
        <div className={styles.productsGrid}>

          {product.map((productInfo) => (
            <div key={productInfo.id} className={styles.card}>

              <Link to={`/productDetails/${productInfo.id}`} className={styles.link}>
                <img src={productInfo.imageCover} alt={productInfo.title} />

                <span className={styles.category}>
                  {productInfo.category.name}
                </span>

                <h6 className={styles.productName}>
                  {productInfo.title.split(' ').slice(0, 3).join(' ')}
                </h6>

                <div className={styles.priceRating}>
                  <span>{productInfo.price} EGP</span>
                  <span>
                    {productInfo.ratingsQuantity}
                    <i className="fas fa-star"></i>
                  </span>
                </div>
              </Link>

              <button
                onClick={() => addProductItem(productInfo.id)}
                className={styles.cartBtn}
              >
                <i className="fas fa-cart-plus"></i> Add To Cart
              </button>

            </div>
          ))}

        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}
