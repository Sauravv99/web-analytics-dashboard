import { useRef, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import './authpage.css'

function RegisterForm( props ) {
  const { setSignup } = props;
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: "user"
  });

  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async e => {
    e.preventDefault();
     // If the handler is on the form, e.currentTarget is the <form>.
  // If not, fall back to nearest form ancestor.
  const form =
    e.currentTarget instanceof HTMLFormElement
      ? e.currentTarget
      : e.target.closest('form');

  if (!form) {
    // Guard: nothing to validate
    return;
  }

  if (!form.checkValidity()) {
    e.stopPropagation();
  }

  form.classList.add('was-validated');

    if (form.checkValidity()) {
      try {
        const res = await axiosInstance.post('/api/auth/register', formData);
        console.log("res",res);
        // await axios.post('http://localhost:5000/api/auth/register', formData);
        setMessage(res.data.message);
         setTimeout(()=>{
           setMessage('');
           setSignup(false);
        },800);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Error registering');
        setTimeout(()=>{
           setMessage('');
        },2000);
      }
      form.reset();
      form.classList.remove('was-validated');
    }
   

  };

  return (
    <div className='mt-3'>
      <section className="auth-section d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="card-header bg-transparent border-0 p-4">
                  <h2 className="h3 mb-0 fw-bold text-center">Register</h2>
                  <p className="text-center text-muted mt-2 mb-0">
                    Create your account to get started.
                  </p>
                </div>

                <div className="card-body p-4 pt-0">
                  {/* Keep your functions as-is */}
                  <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    <div className="mb-3">
                      <input
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        className="form-control form-control-lg"
                      />
                      <div className="invalid-feedback">Please enter a username.</div>
                    </div>

                    <div className="mb-3">
                      <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="form-control form-control-lg"
                      />
                      <div className="invalid-feedback">Please enter a valid email.</div>
                    </div>

                    <div className="mb-3">
                      <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="form-control form-control-lg"
                        minLength={6}
                      />
                      <div className="form-text">Use at least 6 characters.</div>
                      <div className="invalid-feedback">Please enter a password (min 6 chars).</div>
                    </div>

                    <button type="submit" className="btn dash-btns btn-lg w-100">
                      Register
                    </button>
                  </form>

                  {/* Message stays as you have it */}
                  {message && (
                    <div
                      className={`alert mt-3 mb-0 ${
                        String(message).toLowerCase().includes('success') ? 'alert-success' : 'alert-info'
                      }`}
                      role="alert"
                    >
                      {message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegisterForm;
