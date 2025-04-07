import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BillList = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBills = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/bills/my-bills', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBills(response.data.bills);
    } catch (error) {
      console.error('❌ Failed to fetch bills:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  if (loading) return <div className="text-center mt-10 text-lg text-gray-600">Loading bills...</div>;

  if (bills?.length === 0) {
    return <div className="text-center mt-10 text-gray-500 text-lg">No bills found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">Your Bills</h1>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {bills?.map((bill, idx) => (
          <div
            key={idx}
            className="bg-white/60 backdrop-blur-md shadow-lg border border-blue-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-blue-800 mb-2">{bill.productName}</h2>
            <p className="text-gray-700 mb-1"><strong>Store:</strong> {bill.storeName}</p>
            <p className="text-gray-700 mb-1"><strong>Purchase Date:</strong> {new Date(bill.purchaseDate).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-1"><strong>Warranty:</strong> {bill.warrantyPeriodMonths} months</p>
            <p className="text-gray-700 mb-1"><strong>Reminder:</strong> {bill.reminderBeforeExpiry} days before expiry</p>
            <p className="text-gray-700 mb-1"><strong>Amount:</strong> ₹{bill.totalAmount}</p>
            <p className="text-gray-700 mb-3"><strong>Notes:</strong> {bill.notes || 'N/A'}</p>

            <a
              href={bill.invoiceFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm text-blue-600 font-medium hover:text-blue-800 underline"
            >
              📄 View Invoice
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillList;
