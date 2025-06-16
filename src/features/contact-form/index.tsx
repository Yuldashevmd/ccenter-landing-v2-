'use client';

import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit form:', formData);
    // RTK Query mutation chaqiruv shu yerga keladi
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Biz bilan bog‘laning</h2>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={formData.name}
        placeholder="Ismingiz"
        className="w-full border p-3 rounded"
        required
      />
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={formData.email}
        placeholder="Email manzilingiz"
        className="w-full border p-3 rounded"
        required
      />
      <textarea
        name="message"
        onChange={handleChange}
        value={formData.message}
        placeholder="Xabaringiz"
        className="w-full border p-3 rounded h-32"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
        Yuborish
      </button>
    </form>
  );
}
