import React, { use } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useContext } from 'react';
import { userContext } from '../../context/UserContext.jsx';


export default function Register() {

  let {setLogin } = useContext(userContext);

  let navigate = useNavigate();

  async function handleRegister(dataForm) {
    console.log("Register", dataForm);

    let respose = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', dataForm);
    console.log("Full Respones", respose);

    console.log("Certaion Response", respose.data);
    if (respose.data.message == 'success') {

      localStorage.setItem('userToken', respose.data.token);
      setLogin(respose.data.token);

      navigate('/login');
    }
  }
    
  let validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters').max(15, 'Name must be at most 15 characters'),
    email: Yup.string().required('Email is required').email('Invalid email format'),
    password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{6,8}$/, 'Password must start with an uppercase letter followed by 5 to 10 lowercase letters or digits'),
    rePassword: Yup.string().required('Repassword is required').oneOf([Yup.ref('password')], 'Passwords must match'),
    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Invalid Egyptian phone number')
    })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister
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
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}` } name="name" value={formik.values.name} id="name" placeholder="name" required/>
                            <label htmlFor="firstName" className="form-label">Name</label>
                            {
                              formik.touched.name && formik.errors.name ? <div className="invalid-feedback">{formik.errors.name}</div> : null
                            }
                          </div>
                        </div>


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
                          <div className="form-floating mb-3">
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className={`form-control ${formik.touched.rePassword && formik.errors.rePassword ? 'is-invalid' : ''}` } name="rePassword" value={formik.values.rePassword} id="rePassword" placeholder="Repassword" required/>
                            <label htmlFor="rePassword" className="form-label">Repassword</label>
                            {
                              formik.touched.rePassword && formik.errors.rePassword ? <div className="invalid-feedback">{formik.errors.rePassword}</div> : null
                            }
                          </div>
                        </div>


                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}` } name="phone" value={formik.values.phone} id="phone" placeholder="phone" required/>
                            <label htmlFor="phone" className="form-label">Phone</label>
                            {
                              formik.touched.phone && formik.errors.phone ? <div className="invalid-feedback">{formik.errors.phone}</div> : null
                            }
                          </div>
                        </div>


                        <div className="col-12">
                          <div className="d-grid my-3">
                            <button className="btn btn-primary btn-lg" type="submit">Sign up</button>
                          </div>
                        </div>
                        <div className="col-12">
                          <p className="m-0 text-secondary text-center">Already have an account? <a href="/login" className="link-primary text-decoration-none">Sign in</a></p>
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
