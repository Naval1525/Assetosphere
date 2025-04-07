import { useState } from 'react';
import axios from 'axios';

const BillUpload = () => {
  const [formData, setFormData] = useState({
    productName: '',
    purchaseDate: '',
    warrantyPeriodMonths: '',
    reminderBeforeExpiry: '',
    storeName: '',
    totalAmount: '',
    notes: '',
    invoiceFile: null
  });

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, invoiceFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/bills/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setSuccess('Bill uploaded successfully!');
      setError(null);
    } catch (err) {
      setSuccess(null);
      setError('Upload failed. Make sure you are logged in.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Upload Your Bill</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="productName" placeholder="Product Name" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="date" name="purchaseDate" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="number" name="warrantyPeriodMonths" placeholder="Warranty Period (Months)" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="number" name="reminderBeforeExpiry" placeholder="Reminder Before Expiry (Days)" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="storeName" placeholder="Store Name" onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="number" name="totalAmount" placeholder="Total Amount" onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="notes" placeholder="Notes (optional)" onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} required className="w-full" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Upload</button>
        {success && <p className="text-green-600 text-center mt-2">{success}</p>}
        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default BillUpload;
