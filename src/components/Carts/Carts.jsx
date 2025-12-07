
import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/cartContext";
import styles from "./Carts.module.css";

export default function Carts() {
    let [product, setProduct] = useState(null);
    let { getProductToCart, deleteProductFromCart, updateProductInCart } =
        useContext(cartContext);

    async function getProduct() {
        let { data } = await getProductToCart();
        console.log(data?.data);
        setProduct(data?.data);
    }

    async function deleteProduct(id) {
        let response = await deleteProductFromCart(id);
        setProduct(response?.data?.data);
    }

    async function updateProduct(id, count) {
        if (count < 1) return;
        let response = await updateProductInCart(id, count);
        console.log("response", response?.data?.data);
        setProduct(response?.data?.data);
    }

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <>
        <section className={`h-100 ${styles.cartSection}`}>
            {product?.products?.length > 0 ? (
            <>
                <div className="container h-100 py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-10">

                    <div className={`d-flex justify-content-between align-items-center mb-4 ${styles.header}`}>
                        <h3 className="fw-normal mb-0">Shopping Cart</h3>
                        <p className="m-0">
                        <span className="fw-medium">Total Price:</span>{" "}
                        {product?.totalCartPrice} EGP
                        </p>
                    </div>

                    {product?.products?.map((item) => (
                        <div key={item._id} className={`card rounded-3 mb-4 ${styles.cartCard}`}>
                        <div className="card-body p-4">
                            <div className="row d-flex justify-content-between align-items-center">

                            <div className="col-md-2 col-lg-2 col-xl-2">
                                <img src={item?.product?.imageCover} className={`img-fluid rounded-3 ${styles.productImg}`} alt={item?.product?.title}/>
                            </div>

                            <div className="col-md-3 col-lg-3 col-xl-3">
                                <p className={`lead fw-normal mb-2 ${styles.productTitle}`}>
                                {item?.product?.title}
                                </p>
                            </div>

                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex align-items-center">
                                <button onClick={() => updateProduct(item?.product?.id,item?.count - 1)} className={`btn btn-link px-2 ${styles.qtyBtn}`}>
                                <i className="fas fa-minus" />
                                </button>
                                <input min={1} value={item?.count} type="number" readOnly className={`form-control form-control-sm text-center ${styles.qtyInput}`}/>

                                <button onClick={() => updateProduct( item?.product?.id, item?.count + 1)} className={`btn btn-link px-2 ${styles.qtyBtn}`}>
                                <i className="fas fa-plus" />
                                </button>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h5 className={`mb-0 ${styles.price}`}>{item?.price} EGP</h5>
                            </div>

                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                <button onClick={() => deleteProduct(item?.product?.id)} className={`btn text-danger ${styles.deleteBtn}`}>
                                <i className="fas fa-trash fa-lg" />
                                </button>
                            </div>

                            </div>
                        </div>
                        </div>
                    ))}
                    <div className={`card ${styles.checkoutCard}`}>
                        <div className="card-body">
                        <button className={`btn btn-warning btn-block btn-lg w-100 ${styles.checkoutBtn}`}>
                            Proceed to Pay
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </>
            ) : (
            <h1 className={`text-success text-center my-5 ${styles.empty}`}>
                There is no data
            </h1>
            )}
        </section>
        </>
    );
}
