import React, { use } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useContext } from 'react';
import { userContext } from '../../context/UserContext.jsx';


export default function Login() {

    let {isLogin, setLogin} = useContext(userContext);

    let navigate = useNavigate();

    async function handleLogin(dataForm) {
        console.log("Login is Done", dataForm);

        let respose = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', dataForm);
        console.log("Full Respones", respose);

        console.log("Certaion Response", respose.data);
        if (respose.data.message == 'success') {
            
            localStorage.setItem('userToken', respose.data.token);
            setLogin(respose.data.token);
            console.log("isLogin After Login", isLogin);

        navigate('/');
        }
    }
        
    let validationSchema = Yup.object({
        email: Yup.string().required('Email is required').email('Invalid email format'),
        password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{6,8}$/, 'Password must start with an uppercase letter followed by 5 to 10 lowercase letters or digits'),
        })

    let formik = useFormik({
        initialValues: {
        email: '',
        password: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleLogin
    })


        return (
        <>
            <section className="bg-light py-3 py-md-5">
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                    <div className="card border border-light-subtle rounded-3 shadow-sm">
                    <div className="card-body p-3 p-md-4 p-xl-5">
                        <div className="text-center mb-3">
                        <a href="#!">
                            {/* <img src={img} alt="BootstrapBrain Logo" width="175" height="57"/> */}
                        </a>
                        </div>
                        <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Enter your details to register</h2>
                        <form onSubmit={formik.handleSubmit} action="#!">
                        <div className="row gy-2 overflow-hidden">


                            <div className="col-12">
                            <div className="form-floating mb-3">
                                <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}` } name="email" value={formik.values.email} id="email" placeholder="name@example.com" required/>
                                <label htmlFor="email" className="form-label">Email</label>
                                {
                                formik.touched.email && formik.errors.email ? <div className="invalid-feedback">{formik.errors.email}</div> : null
                                }
                            </div>
                            </div>


                            <div className="col-12">
                            <div className="form-floating mb-3">
                                <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}` } name="password" value={formik.values.password} id="password" placeholder="Password" required/>
                                <label htmlFor="password" className="form-label">Password</label>
                                {
                                formik.touched.password && formik.errors.password ? <div className="invalid-feedback">{formik.errors.password}</div> : null
                                }
                            </div>
                            </div>


                            <div className="col-12">
                            <div className="d-grid my-3">
                                <button className="btn btn-primary btn-lg" type="submit">Log in</button>
                            </div>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </>
    )
}
