import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser, registerUser, setAuthToken } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const emptyForm = {
  name: '',
  email: '',
  password: ''
};

function AuthPage() {
  const { user, login, setUser, logout: logoutUser } = useContext(AuthContext);
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const nextMode = params.get('mode');
    if (nextMode === 'register' || nextMode === 'login') {
      setMode(nextMode);
    }
  }, [location.search]);

  useEffect(() => {
    if (user) {
      const redirectTo = new URLSearchParams(location.search).get('redirect');
      if (redirectTo) {
        navigate(decodeURIComponent(redirectTo), { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [user, location.search, navigate]);

  const onChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      const payload = mode === 'register'
        ? await registerUser(form)
        : await loginUser({ email: form.email, password: form.password });

      const authToken = payload.data.data.token;
      const authUser = payload.data.data.user;
      setAuthToken(authToken);
      await login(authToken, authUser);
      setUser(authUser);
      setMessage(mode === 'register' ? 'Account created successfully' : 'Welcome back');
      setForm(emptyForm);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Something went wrong');
    }
  };

  const logout = () => {
    logoutUser();
    setMessage('Logged out successfully');
  };

  const handleToggleMode = (nextMode) => {
    setMode(nextMode);
    navigate(`/auth?mode=${nextMode}`, { replace: true });
  };

  return (
    <div className="auth-layout">
      <div className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">Account access</p>
            <h2>{mode === 'register' ? 'Create your account' : 'Welcome back'}</h2>
          </div>
          <div className="chip-row">
            <button type="button" className={`chip ${mode === 'login' ? 'chip-active' : ''}`} onClick={() => handleToggleMode('login')}>Login</button>
            <button type="button" className={`chip ${mode === 'register' ? 'chip-active' : ''}`} onClick={() => handleToggleMode('register')}>Sign Up</button>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label>
              Name
              <input name="name" value={form.name} onChange={onChange} placeholder="Your name" />
            </label>
          )}
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={onChange} required />
          </label>
          <label>
            Password
            <input type="password" name="password" value={form.password} onChange={onChange} required />
          </label>
          <button className="btn btn-full" type="submit">
            {mode === 'register' ? 'Create Account' : 'Login'}
          </button>
        </form>

        {message && <p className="success-text">{message}</p>}
        {error && <p className="error-text">{error}</p>}
      </div>

      <div className="panel">
        <p className="eyebrow">Your account</p>
        <h2>Signed in details</h2>
        {user ? (
          <div className="detail-box">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p className="muted">You can continue shopping or go straight to checkout.</p>
            <button className="btn btn-secondary" type="button" onClick={logout}>Logout</button>
          </div>
        ) : (
          <p className="muted">Log in or create an account to continue.</p>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
