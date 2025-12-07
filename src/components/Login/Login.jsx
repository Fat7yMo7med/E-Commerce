import React, { useContext } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userContext } from '../../context/UserContext.jsx';
import styles from './Login.module.css';

export default function Login() {

    let {isLogin, setLogin} = useContext(userContext);
    let navigate = useNavigate();

    async function handleLogin(dataForm) {
        let respose = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', dataForm);

        if (respose.data.message === 'success') {
            localStorage.setItem('userToken', respose.data.token);
            setLogin(respose.data.token);
            navigate('/');
        }
    }

    let validationSchema = Yup.object({
        email: Yup.string().required('Email is required').email('Invalid email format'),
        password: Yup.string().required('Password is required')
            .matches(/^[A-Z][a-z0-9]{6,8}$/, 'Password must start with an uppercase letter followed by 5-8 lowercase letters or digits'),
    });

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleLogin
    });

    return (
        <section className={`bg-light py-5 ${styles.loginSection}`}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className={`card border-light-subtle rounded-3 shadow-sm ${styles.card}`}>
                            <div className="card-body p-4">
                                <h2 className={`fs-5 fw-bold text-center text-secondary mb-4 ${styles.title}`}>Login to your account</h2>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <input
                                                type="email"
                                                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                                name="email"
                                                id="email"
                                                placeholder="name@example.com"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                            />
                                            <label htmlFor="email">Email</label>
                                            {formik.touched.email && formik.errors.email &&
                                                <div className="invalid-feedback">{formik.errors.email}</div>}
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <input
                                                type="password"
                                                className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                                name="password"
                                                id="password"
                                                placeholder="Password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password}
                                            />
                                            <label htmlFor="password">Password</label>
                                            {formik.touched.password && formik.errors.password &&
                                                <div className="invalid-feedback">{formik.errors.password}</div>}
                                        </div>
                                    </div>

                                    <div className="d-grid mt-3">
                                        <button type="submit" className={`btn btn-primary btn-lg ${styles.loginBtn}`}>Log In</button>
                                    </div>
                                </form>

                                <p className={`text-center mt-3 ${styles.registerText}`}>
                                    Don't have an account? <span onClick={()=>navigate('/register')} className={styles.registerLink}>Register</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
