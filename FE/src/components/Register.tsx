import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface TouchedFields {
  name: boolean;
  email: boolean;
  password: boolean;
}

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({
    name: false,
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  const validatePassword = (password: string): boolean => {
    const validationErrors: string[] = [];

    if (password.length < 8) validationErrors.push('Password must be at least 8 characters long.');
    if (!/[A-Z]/.test(password)) validationErrors.push('Password must contain at least one uppercase letter.');
    if (!/[a-z]/.test(password)) validationErrors.push('Password must contain at least one lowercase letter.');
    if (!/[0-9]/.test(password)) validationErrors.push('Password must contain at least one digit.');
    if (/\s/.test(password)) validationErrors.push('Password must not contain spaces.');

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const checkFormValidity = (): void => {
    setIsFormValid(name.trim() !== '' && email.trim() !== '' && validatePassword(password));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
    checkFormValidity();
  };

  const handleRegister = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5025/api/User', {
        name,
        email,
        password,
      });
      setMessage(response.data.message);
      navigate('/login');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleBlur = (field: keyof TouchedFields): void => {
    setTouchedFields({ ...touchedFields, [field]: true });
  };

  const isValidInput = (field: string): boolean => touchedFields[field as keyof TouchedFields] && !!field;

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Registration illustration"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleRegister}>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Register</p>
              </div>

              {message && (
                <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'} mb-3`} role="alert">
                  {message}
                </div>
              )}

              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-person"></i></span>
                  <input
                    type="text"
                    className={`form-control ${isValidInput(name) ? 'is-valid' : ''}`} // Remove is-invalid class
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setName(e.target.value);
                      checkFormValidity();
                    }}
                    onBlur={() => handleBlur('name')}
                    required
                  />
                  {touchedFields.name && !name && (
                    <div className="invalid-feedback">Name is required.</div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                  <input
                    type="email"
                    className={`form-control ${isValidInput(email) ? 'is-valid' : ''}`} // Remove is-invalid class
                    placeholder="Enter a valid email address"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setEmail(e.target.value);
                      checkFormValidity();
                    }}
                    onBlur={() => handleBlur('email')}
                    required
                  />
                  {touchedFields.email && !email && (
                    <div className="invalid-feedback">Email is required.</div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-lock"></i></span>
                  <input
                    type="password"
                    className={`form-control ${errors.length > 0 ? 'is-invalid' : (touchedFields.password && password ? 'is-valid' : '')}`} // Adjust validity classes
                    placeholder="Create a password"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={() => handleBlur('password')}
                    required
                  />
                  {errors.length > 0 && (
                    <div className="invalid-feedback d-block">
                      <ul className="mb-0">
                        {errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  disabled={!isFormValid}
                >
                  Register
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account? <a href="/login" className="link-danger">Login</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
