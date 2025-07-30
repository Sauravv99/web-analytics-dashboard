import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import axiosInstance from "../../utils/axiosInstance";

function LoginForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     const form =
    e.currentTarget instanceof HTMLFormElement
      ? e.currentTarget
      : e.target.closest('form');

  if (!form) return;

  if (!form.checkValidity()) {
    e.stopPropagation();
    // (optional) focus first invalid control for better UX
    form.querySelector(':invalid')?.focus();
  }

  form.classList.add('was-validated');

  if (form.checkValidity()) {
    try {
      const res = await axiosInstance.post("/api/auth/login", formData);
      // await axios.post('http://localhost:5000/api/auth/login', formData);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  }
  
  };

  return (
    <section className="auth-section d-flex align-items-center mt-3">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="card-header bg-transparent border-0 p-4">
                <h2 className="h3 mb-0 fw-bold text-center">Login</h2>
                <p className="text-center text-muted mt-2 mb-0">
                  Welcome back sign in to continue.
                </p>
              </div>

              <div className="card-body p-4 pt-0">
                {/* Keep your functions as-is */}
                <form
                  onSubmit={handleSubmit}
                  className="needs-validation"
                  noValidate
                >
                  <div className="mb-3">
                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={handleChange}
                      required
                      className="form-control form-control-lg"
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email.
                    </div>
                  </div>

                  <div className="mb-3">
                    <input
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                      required
                      className="form-control form-control-lg"
                    />
                    <div className="invalid-feedback">
                      Please enter your password.
                    </div>
                  </div>

                  <button type="submit" className="btn dash-btns btn-lg w-100">
                    Login
                  </button>
                </form>

                {/* Your existing error display, styled to match */}
                {error && (
                  <div className="alert alert-danger mt-3 mb-0" role="alert">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
