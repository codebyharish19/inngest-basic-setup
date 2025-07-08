'use client';
import { useState } from 'react';

export default function MessageFetcher() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/data');
      const data = await res.json();

      if (data.success) {
        setMessages(data.data);
      } else {
        console.error('❌ Failed to fetch messages');
      }
    } catch (err) {
      console.error('❌ API error:', err);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <button
        onClick={getMessages}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Loading...' : 'Get Data'}
      </button>

      {messages.length > 0 && (
        <div className="mt-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="p-3 border border-gray-300 rounded shadow-sm"
            >
              <p className="text-sm text-gray-600">
                <strong>User:</strong> {msg.username}
              </p>
              <p className="text-gray-800">
                <strong>Message:</strong> {msg.message}
              </p>
              <p className="text-xs text-gray-500">
                <strong>Time:</strong> {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
