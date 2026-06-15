import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('https://reqres.in/api/users?page=1')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error("Gagal mengambil data API", error);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ backgroundColor: '#121212', color: '#ffffff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #2d2d2d', paddingBottom: '20px', marginBottom: '30px' }}>
        <h1 style={{ color: '#00adb5', margin: 0 }}>Dashboard Anggota</h1>
        <button onClick={handleLogout} style={{
          backgroundColor: '#ff6b6b', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginLeft: 'auto'
        }}>LOGOUT</button>
      </div>

      <p style={{ color: '#aaaaaa', marginBottom: '20px' }}>Berikut adalah daftar data yang ditarik menggunakan Axios dari API publik:</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {users.map(user => (
          <div key={user.id} style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
            <img src={user.avatar} alt={user.first_name} style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '12px', border: '2px solid #00adb5' }} />
            <h3 style={{ margin: '0 0 8px 0' }}>{user.first_name} {user.last_name}</h3>
            <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;