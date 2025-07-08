'use client';
import { useState } from 'react';

export default function EmailForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted Email:', email);

    await fetch('/api/hello', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    // Optional: send to your API
    // await fetch('/api/submit', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email }),
    // });

    setEmail('');
  };

  return (
    <div className='flex justify-center items-center h-screen bg-violet-300 text-black'>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ marginBottom: '10px', padding: '8px' }}
      />
      <button onClick={handleSubmit} type="submit" style={{ padding: '8px', backgroundColor: 'blue', color: 'white' }}>
        Submit
      </button>
    </form>
    </div>
  );
}
