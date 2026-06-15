import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email: username,
        password: password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Username atau Password salah! (Gunakan format email untuk username)');
    }
  };

  return (
    <div style={{
      backgroundColor: '#121212', color: '#ffffff', height: '100vh',
      display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif'
    }}>
      <form onSubmit={handleLogin} style={{
        backgroundColor: '#1e1e1e', padding: '40px', borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)', width: '320px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#00adb5' }}>BOOTCAMP LOGIN</h2>
        
        {error && <p style={{ color: '#ff6b6b', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Username / Email</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="eve.holt@reqres.in" required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#2d2d2d', color: '#fff', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#2d2d2d', color: '#fff', boxSizing: 'border-box' }} />
        </div>

        <button type="submit" style={{
          width: '100%', padding: '12px', borderRadius: '5px', border: 'none',
          backgroundColor: '#00adb5', color: '#fff', fontWeight: 'bold', cursor: 'pointer'
        }}>LOG IN</button>
      </form>
    </div>
  );
}

export default Login;