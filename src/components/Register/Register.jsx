import React, { useContext } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userContext } from '../../context/UserContext.jsx';
import styles from './Register.module.css';

export default function Register() {
  const { setLogin } = useContext(userContext);
  const navigate = useNavigate();

  async function handleRegister(dataForm) {
    const response = await axios.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      dataForm
    );

    if (response.data.message === 'success') {
      localStorage.setItem('userToken', response.data.token);
      setLogin(response.data.token);
      navigate('/login');
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(15, 'Name must be at most 15 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^[A-Z][a-z0-9]{6,8}$/,
        'Password must start with an uppercase letter followed by 5-8 lowercase letters or digits'
      ),
    rePassword: Yup.string()
      .required('Repassword is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    phone: Yup.string()
      .required('Phone is required')
      .matches(/^01[0125][0-9]{8}$/, 'Invalid Egyptian phone number'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <section className={`bg-light py-5 ${styles.registerSection}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className={`card rounded-3 shadow-sm ${styles.card}`}>
              <div className="card-body p-4">
                <h2 className={`fs-5 fw-bold text-center mb-4 ${styles.title}`}>
                  Create Your Account
                </h2>

                <form onSubmit={formik.handleSubmit}>
                  {/* Name */}
                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        className={`form-control ${
                          formik.touched.name && formik.errors.name
                            ? 'is-invalid'
                            : ''
                        }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                      />
                      <label htmlFor="name">Name</label>
                      {formik.touched.name && formik.errors.name && (
                        <div className="invalid-feedback">{formik.errors.name}</div>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        className={`form-control ${
                          formik.touched.email && formik.errors.email
                            ? 'is-invalid'
                            : ''
                        }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      <label htmlFor="email">Email</label>
                      {formik.touched.email && formik.errors.email && (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                      )}
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        className={`form-control ${
                          formik.touched.password && formik.errors.password
                            ? 'is-invalid'
                            : ''
                        }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      <label htmlFor="password">Password</label>
                      {formik.touched.password && formik.errors.password && (
                        <div className="invalid-feedback">{formik.errors.password}</div>
                      )}
                    </div>
                  </div>

                  {/* Repassword */}
                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="password"
                        id="rePassword"
                        name="rePassword"
                        placeholder="Repassword"
                        className={`form-control ${
                          formik.touched.rePassword && formik.errors.rePassword
                            ? 'is-invalid'
                            : ''
                        }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rePassword}
                      />
                      <label htmlFor="rePassword">Confirm Password</label>
                      {formik.touched.rePassword && formik.errors.rePassword && (
                        <div className="invalid-feedback">{formik.errors.rePassword}</div>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Phone"
                        className={`form-control ${
                          formik.touched.phone && formik.errors.phone
                            ? 'is-invalid'
                            : ''
                        }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                      />
                      <label htmlFor="phone">Phone</label>
                      {formik.touched.phone && formik.errors.phone && (
                        <div className="invalid-feedback">{formik.errors.phone}</div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid mt-3">
                    <button
                      type="submit"
                      className={`btn btn-primary btn-lg ${styles.registerBtn}`}
                    >
                      Sign Up
                    </button>
                  </div>

                  <p className={`text-center mt-3 ${styles.loginText}`}>
                    Already have an account?{' '}
                    <span
                      onClick={() => navigate('/login')}
                      className={styles.loginLink}
                    >
                      Sign in
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
