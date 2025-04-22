import { useState } from 'react';

export default function LoginModal({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error('Unauthorized');
      }

      onSuccess();
    } catch (err) {
      setError('❌ Nieprawidłowe hasło');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4">🔐 Logowanie do panelu admina</h2>
        <input
          type="password"
          placeholder="Hasło"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Zaloguj się
        </button>
      </div>
    </div>
  );
}





// const BASE_URL = import.meta.env.VITE_API_URL;


// const handleLogin = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/admin-login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ password }),
//       });
  
//       if (!res.ok) throw new Error('Błędne hasło');
//       const data = await res.json();
  
//       if (data.success) {
//         setIsLoggedIn(true);
//         setShowModal(false);
//       }
//     } catch (err) {
//       alert('Nieprawidłowe hasło');
//     }
//   };