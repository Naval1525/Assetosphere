// // // // // import React, { useEffect, useState } from 'react';
// // // // // import axios from 'axios';

// // // // // const BillList = () => {
// // // // //   const [bills, setBills] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   const fetchBills = async () => {
// // // // //     try {
// // // // //       const token = localStorage.getItem('token');
// // // // //       const response = await axios.get('http://localhost:8000/api/bills/my-bills', {
// // // // //         headers: {
// // // // //           Authorization: `Bearer ${token}`,
// // // // //         },
// // // // //       });
// // // // //       setBills(response.data.bills);
// // // // //     } catch (error) {
// // // // //       console.error('❌ Failed to fetch bills:', error);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchBills();
// // // // //   }, []);

// // // // //   if (loading) return <div className="text-center mt-10 text-lg text-gray-600">Loading bills...</div>;

// // // // //   if (bills?.length === 0) {
// // // // //     return <div className="text-center mt-10 text-gray-500 text-lg">No bills found</div>;
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
// // // // //       <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">Your Bills</h1>
// // // // //       <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
// // // // //         {bills?.map((bill, idx) => (
// // // // //           <div
// // // // //             key={idx}
// // // // //             className="bg-white/60 backdrop-blur-md shadow-lg border border-blue-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
// // // // //           >
// // // // //             <h2 className="text-xl font-semibold text-blue-800 mb-2">{bill.productName}</h2>
// // // // //             <p className="text-gray-700 mb-1"><strong>Store:</strong> {bill.storeName}</p>
// // // // //             <p className="text-gray-700 mb-1"><strong>Purchase Date:</strong> {new Date(bill.purchaseDate).toLocaleDateString()}</p>
// // // // //             <p className="text-gray-700 mb-1"><strong>Warranty:</strong> {bill.warrantyPeriodMonths} months</p>
// // // // //             <p className="text-gray-700 mb-1"><strong>Reminder:</strong> {bill.reminderBeforeExpiry} days before expiry</p>
// // // // //             <p className="text-gray-700 mb-1"><strong>Amount:</strong> ₹{bill.totalAmount}</p>
// // // // //             <p className="text-gray-700 mb-3"><strong>Notes:</strong> {bill.notes || 'N/A'}</p>

// // // // //             <a
// // // // //               href={bill.invoiceFileUrl}
// // // // //               target="_blank"
// // // // //               rel="noopener noreferrer"
// // // // //               className="inline-block mt-2 text-sm text-blue-600 font-medium hover:text-blue-800 underline"
// // // // //             >
// // // // //               📄 View Invoice
// // // // //             </a>
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default BillList;
// // // // import React, { useEffect, useState } from 'react';
// // // // import axios from 'axios';

// // // // const BillList = () => {
// // // //   const [bills, setBills] = useState([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   const fetchBills = async () => {
// // // //     try {
// // // //       const token = localStorage.getItem('token');
// // // //       const response = await axios.get('http://localhost:8000/api/bills/my-bills', {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });
// // // //       setBills(response.data.bills);
// // // //     } catch (error) {
// // // //       console.error('❌ Failed to fetch bills:', error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchBills();
// // // //   }, []);

// // // //   const isExpiringSoon = (purchaseDate, warrantyMonths, reminderDays) => {
// // // //     const purchase = new Date(purchaseDate);
// // // //     const expiry = new Date(purchase.setMonth(purchase.getMonth() + warrantyMonths));
// // // //     const reminderDate = new Date(expiry);
// // // //     reminderDate.setDate(expiry.getDate() - reminderDays);
// // // //     const today = new Date();

// // // //     return today >= reminderDate && today <= expiry;
// // // //   };

// // // //   if (loading) return <div className="text-center mt-10 text-lg text-gray-600">Loading bills...</div>;

// // // //   if (bills?.length === 0) {
// // // //     return <div className="text-center mt-10 text-gray-500 text-lg">No bills found</div>;
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
// // // //       <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">Your Bills</h1>
// // // //       <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
// // // //         {bills?.map((bill, idx) => {
// // // //           const expiringSoon = isExpiringSoon(
// // // //             bill.purchaseDate,
// // // //             bill.warrantyPeriodMonths,
// // // //             bill.reminderBeforeExpiry
// // // //           );

// // // //           return (
// // // //             <div
// // // //               key={idx}
// // // //               className={`bg-white/60 backdrop-blur-md shadow-lg border rounded-2xl p-6 transition-all duration-300 ${
// // // //                 expiringSoon ? 'border-orange-400 shadow-orange-200' : 'border-blue-100'
// // // //               }`}
// // // //             >
// // // //               <h2 className="text-xl font-semibold text-blue-800 mb-2">{bill.productName}</h2>
// // // //               <p className="text-gray-700 mb-1"><strong>Store:</strong> {bill.storeName}</p>
// // // //               <p className="text-gray-700 mb-1"><strong>Purchase Date:</strong> {new Date(bill.purchaseDate).toLocaleDateString()}</p>
// // // //               <p className="text-gray-700 mb-1"><strong>Warranty:</strong> {bill.warrantyPeriodMonths} months</p>
// // // //               <p className="text-gray-700 mb-1"><strong>Amount:</strong> ₹{bill.totalAmount}</p>

// // // //               <a
// // // //                 href={bill.invoiceFileUrl}
// // // //                 target="_blank"
// // // //                 rel="noopener noreferrer"
// // // //                 className="mt-3 inline-block text-blue-600 underline hover:text-blue-800"
// // // //               >
// // // //                 View Invoice
// // // //               </a>

// // // //               {expiringSoon && (
// // // //                 <div className="mt-4 bg-yellow-100 p-3 rounded-lg">
// // // //                   <p className="text-yellow-800 font-medium mb-2">⚠️ Warranty expiring soon!</p>
// // // //                   <a
// // // //                     href={`/insurance?product=${bill.productName}`}
// // // //                     className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
// // // //                   >
// // // //                     Explore Insurance Plans
// // // //                   </a>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           );
// // // //         })}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default BillList;
// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';

// // // const BillList = () => {
// // //   const [bills, setBills] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   const fetchBills = async () => {
// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       const response = await axios.get('http://localhost:8000/api/bills/my-bills', {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       setBills(response.data.bills);
// // //     } catch (error) {
// // //       console.error('❌ Failed to fetch bills:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchBills();
// // //   }, []);

// // //   const isExpiringSoon = (purchaseDate, warrantyMonths, reminderDays) => {
// // //     const purchase = new Date(purchaseDate);
// // //     const expiry = new Date(purchase.setMonth(purchase.getMonth() + warrantyMonths));
// // //     const reminderDate = new Date(expiry);
// // //     reminderDate.setDate(expiry.getDate() - reminderDays);
// // //     const today = new Date();

// // //     return today >= reminderDate && today <= expiry;
// // //   };

// // //   const getIconForProduct = (productName) => {
// // //     const name = productName.toLowerCase();
// // //     if (name.includes('tv') || name.includes('television')) return '📺';
// // //     if (name.includes('fridge') || name.includes('refrigerator')) return '❄️';
// // //     if (name.includes('washing')) return '🧺';
// // //     if (name.includes('phone') || name.includes('mobile')) return '📱';
// // //     if (name.includes('laptop') || name.includes('computer')) return '💻';
// // //     if (name.includes('bike') || name.includes('scooty') || name.includes('scooter')) return '🛵';
// // //     if (name.includes('car')) return '🚗';
// // //     if (name.includes('ac') || name.includes('air conditioner')) return '❄️';
// // //     if (name.includes('oven') || name.includes('microwave')) return '🔥';
// // //     return '📄';
// // //   };

// // //   if (loading) return (
// // //     <div className="flex justify-center items-center h-64">
// // //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800"></div>
// // //     </div>
// // //   );

// // //   if (bills?.length === 0) {
// // //     return (
// // //       <div className="bg-white shadow-lg rounded-lg p-10 text-center mt-10 mx-6 md:mx-20">
// // //         <h2 className="text-2xl text-gray-600 font-serif mb-6">No Bills Found</h2>
// // //         <p className="text-gray-500">You haven't uploaded any bills yet. Start tracking your warranties!</p>
// // //         <Link to="/uploadbill" className="mt-6 inline-block bg-blue-800 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200">
// // //           Upload Your First Bill
// // //         </Link>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 p-6 md:p-10">
// // //       <h1 className="text-4xl font-serif font-bold text-center text-blue-800 mb-2">Your Assets</h1>
// // //       <p className="text-gray-600 text-center mb-10">Track and manage all your product warranties in one place</p>

// // //       <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
// // //         {bills?.map((bill, idx) => {
// // //           const expiringSoon = isExpiringSoon(
// // //             bill.purchaseDate,
// // //             bill.warrantyPeriodMonths,
// // //             bill.reminderBeforeExpiry
// // //           );

// // //           // Calculate warranty expiry date
// // //           const purchaseDate = new Date(bill.purchaseDate);
// // //           const expiryDate = new Date(purchaseDate);
// // //           expiryDate.setMonth(expiryDate.getMonth() + bill.warrantyPeriodMonths);

// // //           return (
// // //             <div
// // //               key={idx}
// // //               className={`bg-white rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl ${
// // //                 expiringSoon ? 'border-l-4 border-orange-500' : ''
// // //               }`}
// // //             >
// // //               <div className="bg-gradient-to-r from-blue-800 to-indigo-900 px-6 py-4 flex items-center space-x-3">
// // //                 <span className="text-3xl">{getIconForProduct(bill.productName)}</span>
// // //                 <h2 className="text-xl font-serif font-semibold text-white">{bill.productName}</h2>
// // //               </div>

// // //               <div className="p-6">
// // //                 <div className="grid grid-cols-2 gap-2 mb-4">
// // //                   <div>
// // //                     <p className="text-gray-500 text-sm">Purchased From</p>
// // //                     <p className="font-medium text-gray-800">{bill.storeName}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="text-gray-500 text-sm">Amount</p>
// // //                     <p className="font-medium text-gray-800">₹{bill.totalAmount}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="text-gray-500 text-sm">Purchase Date</p>
// // //                     <p className="font-medium text-gray-800">{new Date(bill.purchaseDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="text-gray-500 text-sm">Warranty Until</p>
// // //                     <p className="font-medium text-gray-800">{expiryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex justify-between items-center mt-6">
// // //                   <a
// // //                     href={bill.invoiceFileUrl}
// // //                     target="_blank"
// // //                     rel="noopener noreferrer"
// // //                     className="text-blue-700 hover:text-blue-800 font-medium flex items-center"
// // //                   >
// // //                     <span className="mr-2">📄</span> View Invoice
// // //                   </a>

// // //                   <button className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors duration-200">
// // //                     Report Issue
// // //                   </button>
// // //                 </div>

// // //                 {expiringSoon && (
// // //                   <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
// // //                     <p className="text-orange-800 font-medium mb-3 flex items-center">
// // //                       <span className="text-xl mr-2">⚠️</span> Warranty expiring soon!
// // //                     </p>
// // //                     <a
// // //                       href={`/insurance?product=${bill.productName}`}
// // //                       className="inline-block w-full bg-gradient-to-r from-blue-800 to-indigo-900 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-colors duration-200 text-center font-medium"
// // //                     >
// // //                       Explore Insurance Plans
// // //                     </a>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           );
// // //         })}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default BillList;
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { Link } from 'react-router-dom';

// // const BillList = () => {
// //   const [bills, setBills] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const fetchBills = async () => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await axios.get('http://localhost:8000/api/bills', {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setBills(response.data.bills);
// //     } catch (error) {
// //       console.error('❌ Failed to fetch bills:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchBills();
// //   }, []);

// //   const isExpiringSoon = (purchaseDate, warrantyMonths, reminderDays) => {
// //     const purchase = new Date(purchaseDate);
// //     const expiry = new Date(purchase.setMonth(purchase.getMonth() + warrantyMonths));
// //     const reminderDate = new Date(expiry);
// //     reminderDate.setDate(expiry.getDate() - reminderDays);
// //     const today = new Date();

// //     return today >= reminderDate && today <= expiry;
// //   };

// //   const getIconForProduct = (productName) => {
// //     const name = productName.toLowerCase();
// //     if (name.includes('tv') || name.includes('television')) return '📺';
// //     if (name.includes('fridge') || name.includes('refrigerator')) return '❄️';
// //     if (name.includes('washing')) return '🧺';
// //     if (name.includes('phone') || name.includes('mobile')) return '📱';
// //     if (name.includes('laptop') || name.includes('computer')) return '💻';
// //     if (name.includes('bike') || name.includes('scooty') || name.includes('scooter')) return '🛵';
// //     if (name.includes('car')) return '🚗';
// //     if (name.includes('ac') || name.includes('air conditioner')) return '❄️';
// //     if (name.includes('oven') || name.includes('microwave')) return '🔥';
// //     return '📄';
// //   };

// //   if (loading) return (
// //     <div className="flex justify-center items-center h-64">
// //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800"></div>
// //     </div>
// //   );

// //   if (bills?.length === 0) {
// //     return (
// //       <div className="bg-white shadow-lg rounded-lg p-10 text-center mt-10 mx-6 md:mx-20">
// //         <h2 className="text-2xl text-gray-600 font-serif mb-6">No Bills Found</h2>
// //         <p className="text-gray-500">You haven't uploaded any bills yet. Start tracking your warranties!</p>
// //         <Link to="/uploadbill" className="mt-6 inline-block bg-blue-800 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200">
// //           Upload Your First Bill
// //         </Link>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6 md:p-10">
// //       <h1 className="text-4xl font-serif font-bold text-center text-blue-800 mb-2">Your Assets</h1>
// //       <p className="text-gray-600 text-center mb-10">Track and manage all your product warranties in one place</p>

// //       <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
// //         {bills?.map((bill, idx) => {
// //           const expiringSoon = isExpiringSoon(
// //             bill.purchaseDate,
// //             bill.warrantyPeriodMonths,
// //             bill.reminderBeforeExpiry
// //           );

// //           // Calculate warranty expiry date
// //           const purchaseDate = new Date(bill.purchaseDate);
// //           const expiryDate = new Date(purchaseDate);
// //           expiryDate.setMonth(expiryDate.getMonth() + bill.warrantyPeriodMonths);

// //           return (
// //             <div
// //               key={idx}
// //               className={`bg-white rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl ${
// //                 expiringSoon ? 'border-l-4 border-orange-500' : ''
// //               }`}
// //             >
// //               <div className="bg-gradient-to-r from-blue-800 to-indigo-900 px-6 py-4 flex items-center space-x-3">
// //                 <span className="text-3xl">{getIconForProduct(bill.productName)}</span>
// //                 <h2 className="text-xl font-serif font-semibold text-white">{bill.productName}</h2>
// //               </div>

// //               <div className="p-6">
// //                 <div className="grid grid-cols-2 gap-2 mb-4">
// //                   <div>
// //                     <p className="text-gray-500 text-sm">Purchased From</p>
// //                     <p className="font-medium text-gray-800">{bill.storeName}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-gray-500 text-sm">Amount</p>
// //                     <p className="font-medium text-gray-800">₹{bill.totalAmount}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-gray-500 text-sm">Purchase Date</p>
// //                     <p className="font-medium text-gray-800">{new Date(bill.purchaseDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-gray-500 text-sm">Warranty Until</p>
// //                     <p className="font-medium text-gray-800">{expiryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
// //                   </div>
// //                 </div>

// //                 <div className="flex justify-between items-center mt-6">
// //                   <a
// //                     href={bill.invoiceFileUrl}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className="text-blue-700 hover:text-blue-800 font-medium flex items-center"
// //                   >
// //                     <span className="mr-2">📄</span> View Invoice
// //                   </a>

// //                   <button className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors duration-200">
// //                     Report Issue
// //                   </button>
// //                 </div>

// //                 {expiringSoon && (
// //                   <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
// //                     <p className="text-orange-800 font-medium mb-3 flex items-center">
// //                       <span className="text-xl mr-2">⚠️</span> Warranty expiring soon!
// //                     </p>
// //                     <a
// //                       href={`/insurance?product=${bill.productName}`}
// //                       className="inline-block w-full bg-gradient-to-r from-blue-800 to-indigo-900 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-colors duration-200 text-center font-medium"
// //                     >
// //                       Explore Insurance Plans
// //                     </a>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // };

// // export default BillList;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const BillList = () => {
//   const [bills, setBills] = useState([]);
//   const [filteredBills, setFilteredBills] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filters, setFilters] = useState({
//     status: 'all', // all, active, expiring, expired
//     sortBy: 'newest', // newest, oldest, priceHigh, priceLow
//     priceRange: [0, 100000],
//     category: 'all', // all, electronics, appliances, vehicles, etc.
//   });

//   const fetchBills = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:8000/api/bills', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBills(response.data.bills);
//       setFilteredBills(response.data.bills);
//     } catch (error) {
//       console.error('❌ Failed to fetch bills:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBills();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [searchTerm, filters, bills]);

//   // Calculate warranty status
//   const getWarrantyStatus = (purchaseDate, warrantyMonths, reminderDays) => {
//     const purchase = new Date(purchaseDate);
//     const expiry = new Date(purchase);
//     expiry.setMonth(purchase.getMonth() + warrantyMonths);
//     const reminderDate = new Date(expiry);
//     reminderDate.setDate(expiry.getDate() - reminderDays);
//     const today = new Date();

//     if (today > expiry) {
//       return 'expired';
//     } else if (today >= reminderDate) {
//       return 'expiring';
//     } else {
//       return 'active';
//     }
//   };

//   const getCategoryFromProduct = (productName) => {
//     const name = productName.toLowerCase();
//     if (name.includes('tv') || name.includes('television') ||
//         name.includes('phone') || name.includes('mobile') ||
//         name.includes('laptop') || name.includes('computer')) {
//       return 'electronics';
//     }
//     if (name.includes('fridge') || name.includes('refrigerator') ||
//         name.includes('washing') || name.includes('ac') ||
//         name.includes('air conditioner') || name.includes('oven') ||
//         name.includes('microwave')) {
//       return 'appliances';
//     }
//     if (name.includes('bike') || name.includes('scooty') ||
//         name.includes('scooter') || name.includes('car')) {
//       return 'vehicles';
//     }
//     return 'other';
//   };

//   const applyFilters = () => {
//     let result = [...bills];

//     // Apply search term filter
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       result = result.filter(bill =>
//         bill.productName.toLowerCase().includes(term) ||
//         bill.storeName.toLowerCase().includes(term)
//       );
//     }

//     // Apply status filter
//     if (filters.status !== 'all') {
//       result = result.filter(bill => {
//         const status = getWarrantyStatus(
//           bill.purchaseDate,
//           bill.warrantyPeriodMonths,
//           bill.reminderBeforeExpiry
//         );
//         return status === filters.status;
//       });
//     }

//     // Apply category filter
//     if (filters.category !== 'all') {
//       result = result.filter(bill =>
//         getCategoryFromProduct(bill.productName) === filters.category
//       );
//     }

//     // Apply price filter
//     result = result.filter(bill =>
//       bill.totalAmount >= filters.priceRange[0] &&
//       bill.totalAmount <= filters.priceRange[1]
//     );

//     // Apply sorting
//     switch (filters.sortBy) {
//       case 'newest':
//         result.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
//         break;
//       case 'oldest':
//         result.sort((a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate));
//         break;
//       case 'priceHigh':
//         result.sort((a, b) => b.totalAmount - a.totalAmount);
//         break;
//       case 'priceLow':
//         result.sort((a, b) => a.totalAmount - b.totalAmount);
//         break;
//       default:
//         break;
//     }

//     setFilteredBills(result);
//   };

//   const getIconForProduct = (productName) => {
//     const name = productName.toLowerCase();
//     if (name.includes('tv') || name.includes('television')) return '📺';
//     if (name.includes('fridge') || name.includes('refrigerator')) return '❄️';
//     if (name.includes('washing')) return '🧺';
//     if (name.includes('phone') || name.includes('mobile')) return '📱';
//     if (name.includes('laptop') || name.includes('computer')) return '💻';
//     if (name.includes('bike') || name.includes('scooty') || name.includes('scooter')) return '🛵';
//     if (name.includes('car')) return '🚗';
//     if (name.includes('ac') || name.includes('air conditioner')) return '❄️';
//     if (name.includes('oven') || name.includes('microwave')) return '🔥';
//     return '📄';
//   };

//   const handlePriceRangeChange = (e, index) => {
//     const newRange = [...filters.priceRange];
//     newRange[index] = parseInt(e.target.value);
//     setFilters({...filters, priceRange: newRange});
//   };

//   // Count bills by status
//   const statusCounts = {
//     all: bills.length,
//     active: bills.filter(bill => getWarrantyStatus(bill.purchaseDate, bill.warrantyPeriodMonths, bill.reminderBeforeExpiry) === 'active').length,
//     expiring: bills.filter(bill => getWarrantyStatus(bill.purchaseDate, bill.warrantyPeriodMonths, bill.reminderBeforeExpiry) === 'expiring').length,
//     expired: bills.filter(bill => getWarrantyStatus(bill.purchaseDate, bill.warrantyPeriodMonths, bill.reminderBeforeExpiry) === 'expired').length,
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center h-64">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800"></div>
//     </div>
//   );

//   if (bills?.length === 0) {
//     return (
//       <div className="bg-white shadow-lg rounded-lg p-10 text-center mt-10 mx-6 md:mx-20">
//         <h2 className="text-2xl text-gray-600 font-serif mb-6">No Bills Found</h2>
//         <p className="text-gray-500">You haven't uploaded any bills yet. Start tracking your warranties!</p>
//         <Link to="/uploadbill" className="mt-6 inline-block bg-blue-800 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200">
//           Upload Your First Bill
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen mt-24 bg-gray-50 p-6 md:p-10">
//       <h1 className="text-4xl font-serif font-bold text-center text-blue-800 mb-2">Your Assets</h1>
//       <p className="text-gray-600 text-center mb-10">Track and manage all your product warranties in one place</p>

//       {/* Search and Filter Section */}
//       <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//         <div className="mb-6">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search by product name or store..."
//               className="w-full px-10 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <div className="absolute left-3 top-3 text-gray-400">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {/* Warranty Status Filter */}
//           <div>
//             <h3 className="text-sm font-medium text-gray-700 mb-2">Warranty Status</h3>
//             <div className="flex flex-wrap gap-2">
//               {['all', 'active', 'expiring', 'expired'].map((status) => (
//                 <button
//                   key={status}
//                   onClick={() => setFilters({...filters, status})}
//                   className={`px-3 py-1 rounded-full text-sm ${
//                     filters.status === status
//                       ? 'bg-blue-800 text-white'
//                       : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
//                   }`}
//                 >
//                   {status.charAt(0).toUpperCase() + status.slice(1)} ({statusCounts[status]})
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Category Filter */}
//           <div>
//             <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
//             <select
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={filters.category}
//               onChange={(e) => setFilters({...filters, category: e.target.value})}
//             >
//               <option value="all">All Categories</option>
//               <option value="electronics">Electronics</option>
//               <option value="appliances">Appliances</option>
//               <option value="vehicles">Vehicles</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           {/* Price Range Filter */}
//           <div>
//             <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range (₹)</h3>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="number"
//                 min="0"
//                 placeholder="Min"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={filters.priceRange[0]}
//                 onChange={(e) => handlePriceRangeChange(e, 0)}
//               />
//               <span>to</span>
//               <input
//                 type="number"
//                 placeholder="Max"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={filters.priceRange[1]}
//                 onChange={(e) => handlePriceRangeChange(e, 1)}
//               />
//             </div>
//           </div>

//           {/* Sort By Filter */}
//           <div>
//             <h3 className="text-sm font-medium text-gray-700 mb-2">Sort By</h3>
//             <select
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={filters.sortBy}
//               onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
//             >
//               <option value="newest">Newest First</option>
//               <option value="oldest">Oldest First</option>
//               <option value="priceHigh">Price: High to Low</option>
//               <option value="priceLow">Price: Low to High</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Results summary */}
//       <div className="mb-6 flex justify-between items-center">
//         <p className="text-gray-700">
//           Showing {filteredBills.length} of {bills.length} items
//         </p>
//         <button
//           onClick={() => {
//             setSearchTerm('');
//             setFilters({
//               status: 'all',
//               sortBy: 'newest',
//               priceRange: [0, 100000],
//               category: 'all',
//             });
//           }}
//           className="text-blue-800 hover:text-blue-700 text-sm font-medium"
//         >
//           Clear all filters
//         </button>
//       </div>

//       {/* Bills Grid */}
//       {filteredBills.length === 0 ? (
//         <div className="bg-white shadow-lg rounded-lg p-10 text-center">
//           <h2 className="text-2xl text-gray-600 font-serif mb-4">No matching bills found</h2>
//           <p className="text-gray-500">Try adjusting your filters or search term</p>
//         </div>
//       ) : (
//         <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {filteredBills.map((bill, idx) => {
//             const warrantyStatus = getWarrantyStatus(
//               bill.purchaseDate,
//               bill.warrantyPeriodMonths,
//               bill.reminderBeforeExpiry
//             );

//             // Calculate warranty expiry date
//             const purchaseDate = new Date(bill.purchaseDate);
//             const expiryDate = new Date(purchaseDate);
//             expiryDate.setMonth(expiryDate.getMonth() + bill.warrantyPeriodMonths);

//             // Status styles
//             const statusStyles = {
//               expired: 'border-l-4 border-red-500',
//               expiring: 'border-l-4 border-orange-500',
//               active: 'border-l-4 border-green-500'
//             };

//             return (
//               <div
//                 key={idx}
//                 className={`bg-white rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl ${
//                   statusStyles[warrantyStatus]
//                 }`}
//               >
//                 <div className="bg-gradient-to-r from-blue-800 to-indigo-900 px-6 py-4 flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <span className="text-3xl">{getIconForProduct(bill.productName)}</span>
//                     <h2 className="text-xl font-serif font-semibold text-white">{bill.productName}</h2>
//                   </div>
//                   <div className="flex">
//                     {warrantyStatus === 'active' && (
//                       <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
//                         Active
//                       </span>
//                     )}
//                     {warrantyStatus === 'expiring' && (
//                       <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
//                         Expiring Soon
//                       </span>
//                     )}
//                     {warrantyStatus === 'expired' && (
//                       <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
//                         Expired
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   <div className="grid grid-cols-2 gap-2 mb-4">
//                     <div>
//                       <p className="text-gray-500 text-sm">Purchased From</p>
//                       <p className="font-medium text-gray-800">{bill.storeName}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500 text-sm">Amount</p>
//                       <p className="font-medium text-gray-800">₹{bill.totalAmount}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500 text-sm">Purchase Date</p>
//                       <p className="font-medium text-gray-800">{new Date(bill.purchaseDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500 text-sm">Warranty Until</p>
//                       <p className="font-medium text-gray-800">{expiryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
//                     </div>
//                   </div>

//                   <div className="flex justify-between items-center mt-6">
//                     <a
//                       href={bill.invoiceFileUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-700 hover:text-blue-800 font-medium flex items-center"
//                     >
//                       <span className="mr-2">📄</span> View Invoice
//                     </a>

//                     <button className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors duration-200">
//                       Report Issue
//                     </button>
//                   </div>

//                   {warrantyStatus === 'expiring' && (
//                     <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
//                       <p className="text-orange-800 font-medium mb-3 flex items-center">
//                         <span className="text-xl mr-2">⚠️</span> Warranty expiring soon!
//                       </p>
//                       <a
//                         href={`/insurance?product=${bill.productName}`}
//                         className="inline-block w-full bg-gradient-to-r from-blue-800 to-indigo-900 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-colors duration-200 text-center font-medium"
//                       >
//                         Explore Insurance Plans
//                       </a>
//                     </div>
//                   )}

//                   {warrantyStatus === 'expired' && (
//                     <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
//                       <p className="text-red-800 font-medium mb-3 flex items-center">
//                         <span className="text-xl mr-2">❗</span> Warranty has expired!
//                       </p>
//                       <div className="flex space-x-2">
//                         <a
//                           href={`/insurance?product=${bill.productName}`}
//                           className="flex-1 bg-gradient-to-r from-blue-800 to-indigo-900 text-white px-2 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-colors duration-200 text-center font-medium"
//                         >
//                           Insurance Plans
//                         </a>
//                         <a
//                           href={`/service?product=${bill.productName}`}
//                           className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-3 rounded-lg hover:from-orange-400 hover:to-red-400 transition-colors duration-200 text-center font-medium"
//                         >
//                           Find Service
//                         </a>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BillList;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BillList = () => {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all', // all, active, expiring, expired
    sortBy: 'newest', // newest, oldest, priceHigh, priceLow
    priceRange: [0, 500000], // Increased max range to accommodate high-value items like bikes
    category: 'all', // all, electronics, appliances, vehicles, etc.
  });

  const fetchBills = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/bills', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.bills) {
        setBills(response.data.bills);
        setFilteredBills(response.data.bills);
      } else {
        console.error('❌ Unexpected API response format:', response.data);
        setBills([]);
        setFilteredBills([]);
      }
    } catch (error) {
      console.error('❌ Failed to fetch bills:', error);
      setBills([]);
      setFilteredBills([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  // Calculate warranty status
  const getWarrantyStatus = (purchaseDate, warrantyMonths, reminderDays) => {
    if (!purchaseDate || !warrantyMonths) return 'unknown';

    try {
      const purchase = new Date(purchaseDate);
      const expiry = new Date(purchase);
      expiry.setMonth(purchase.getMonth() + parseInt(warrantyMonths));

      const reminderDate = new Date(expiry);
      reminderDate.setDate(expiry.getDate() - (reminderDays || 0));

      const today = new Date();

      if (today > expiry) {
        return 'expired';
      } else if (today >= reminderDate) {
        return 'expiring';
      } else {
        return 'active';
      }
    } catch (error) {
      console.error('Error calculating warranty status:', error);
      return 'unknown';
    }
  };

  // Apply filters whenever search terms, filters, or bills change
  useEffect(() => {
    if (bills.length > 0) {
      applyFilters();
    }
  }, [searchTerm, filters, bills]);

  const getCategoryFromProduct = (productName) => {
    if (!productName) return 'other';

    const name = productName.toLowerCase();
    if (name.includes('tv') || name.includes('television') ||
        name.includes('phone') || name.includes('mobile') ||
        name.includes('laptop') || name.includes('computer')) {
      return 'electronics';
    }
    if (name.includes('fridge') || name.includes('refrigerator') ||
        name.includes('washing') || name.includes('ac') ||
        name.includes('air conditioner') || name.includes('oven') ||
        name.includes('microwave')) {
      return 'appliances';
    }
    if (name.includes('bike') || name.includes('scooty') ||
        name.includes('scooter') || name.includes('car')) {
      return 'vehicles';
    }
    return 'other';
  };

  const applyFilters = () => {
    try {
      let result = [...bills];

      // Apply search term filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        result = result.filter(bill =>
          (bill.productName && bill.productName.toLowerCase().includes(term)) ||
          (bill.storeName && bill.storeName.toLowerCase().includes(term))
        );
      }

      // Apply status filter
      if (filters.status !== 'all') {
        result = result.filter(bill => {
          const status = getWarrantyStatus(
            bill.purchaseDate,
            bill.warrantyPeriodMonths,
            bill.reminderBeforeExpiry
          );
          return status === filters.status;
        });
      }

      // Apply category filter
      if (filters.category !== 'all') {
        result = result.filter(bill =>
          getCategoryFromProduct(bill.productName) === filters.category
        );
      }

      // Apply price filter - ensure numeric comparison
      result = result.filter(bill => {
        const amount = parseFloat(bill.totalAmount) || 0;
        return amount >= filters.priceRange[0] && amount <= filters.priceRange[1];
      });

      // Apply sorting - with error handling
      switch (filters.sortBy) {
        case 'newest':
          result.sort((a, b) => {
            try {
              return new Date(b.purchaseDate) - new Date(a.purchaseDate);
            } catch (e) {
              return 0;
            }
          });
          break;
        case 'oldest':
          result.sort((a, b) => {
            try {
              return new Date(a.purchaseDate) - new Date(b.purchaseDate);
            } catch (e) {
              return 0;
            }
          });
          break;
        case 'priceHigh':
          result.sort((a, b) => parseFloat(b.totalAmount || 0) - parseFloat(a.totalAmount || 0));
          break;
        case 'priceLow':
          result.sort((a, b) => parseFloat(a.totalAmount || 0) - parseFloat(b.totalAmount || 0));
          break;
        default:
          break;
      }

      setFilteredBills(result);
    } catch (error) {
      console.error('Error applying filters:', error);
      setFilteredBills(bills || []);
    }
  };

  const getIconForProduct = (productName) => {
    if (!productName) return '📄';

    const name = productName.toLowerCase();
    if (name.includes('tv') || name.includes('television')) return '📺';
    if (name.includes('fridge') || name.includes('refrigerator')) return '❄️';
    if (name.includes('washing')) return '🧺';
    if (name.includes('phone') || name.includes('mobile')) return '📱';
    if (name.includes('laptop') || name.includes('computer')) return '💻';
    if (name.includes('bike') || name.includes('scooty') || name.includes('scooter')) return '🛵';
    if (name.includes('car')) return '🚗';
    if (name.includes('ac') || name.includes('air conditioner')) return '❄️';
    if (name.includes('oven') || name.includes('microwave')) return '🔥';
    return '📄';
  };

  const handlePriceRangeChange = (e, index) => {
    try {
      const newRange = [...filters.priceRange];
      const value = e.target.value === '' ? (index === 0 ? 0 : 500000) : parseInt(e.target.value);
      newRange[index] = value;
      setFilters({...filters, priceRange: newRange});
    } catch (error) {
      console.error('Error handling price range change:', error);
    }
  };

  // Count bills by status - with error handling
  const calculateStatusCounts = () => {
    try {
      return {
        all: bills.length,
        active: bills.filter(bill => getWarrantyStatus(bill.purchaseDate, bill.warrantyPeriodMonths, bill.reminderBeforeExpiry) === 'active').length,
        expiring: bills.filter(bill => getWarrantyStatus(bill.purchaseDate, bill.warrantyPeriodMonths, bill.reminderBeforeExpiry) === 'expiring').length,
        expired: bills.filter(bill => getWarrantyStatus(bill.purchaseDate, bill.warrantyPeriodMonths, bill.reminderBeforeExpiry) === 'expired').length,
      };
    } catch (error) {
      console.error('Error calculating status counts:', error);
      return { all: bills.length, active: 0, expiring: 0, expired: 0 };
    }
  };

  const statusCounts = calculateStatusCounts();

  // Safe format date function
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800"></div>
    </div>
  );

  if (!bills || bills.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-10 text-center mt-10 mx-6 md:mx-20">
        <h2 className="text-2xl text-gray-600 font-serif mb-6">No Bills Found</h2>
        <p className="text-gray-500">You haven't uploaded any bills yet. Start tracking your warranties!</p>
        <Link to="/uploadbill" className="mt-6 inline-block bg-blue-800 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200">
          Upload Your First Bill
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-24 bg-gray-50 p-6 md:p-10">
      <h1 className="text-4xl font-serif font-bold text-center text-blue-800 mb-2">Your Assets</h1>
      <p className="text-gray-600 text-center mb-10">Track and manage all your product warranties in one place</p>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by product name or store..."
              className="w-full px-10 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Warranty Status Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Warranty Status</h3>
            <div className="flex flex-wrap gap-2">
              {['all', 'active', 'expiring', 'expired'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilters({...filters, status})}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.status === status
                      ? 'bg-blue-800 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)} ({statusCounts[status]})
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="appliances">Appliances</option>
              <option value="vehicles">Vehicles</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range (₹)</h3>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="0"
                placeholder="Min"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(e, 0)}
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(e, 1)}
              />
            </div>
          </div>

          {/* Sort By Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Sort By</h3>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="priceLow">Price: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results summary */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-700">
          Showing {filteredBills.length} of {bills.length} items
        </p>
        <button
          onClick={() => {
            setSearchTerm('');
            setFilters({
              status: 'all',
              sortBy: 'newest',
              priceRange: [0, 500000],
              category: 'all',
            });
          }}
          className="text-blue-800 hover:text-blue-700 text-sm font-medium"
        >
          Clear all filters
        </button>
      </div>

      {/* Bills Grid */}
      {filteredBills.length === 0 ? (
        <div className="bg-white shadow-lg rounded-lg p-10 text-center">
          <h2 className="text-2xl text-gray-600 font-serif mb-4">No matching bills found</h2>
          <p className="text-gray-500">Try adjusting your filters or search term</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredBills.map((bill, idx) => {
            const warrantyStatus = getWarrantyStatus(
              bill.purchaseDate,
              bill.warrantyPeriodMonths,
              bill.reminderBeforeExpiry
            );

            // Calculate warranty expiry date safely
            let expiryDate;
            try {
              const purchaseDate = new Date(bill.purchaseDate);
              expiryDate = new Date(purchaseDate);
              expiryDate.setMonth(purchaseDate.getMonth() + parseInt(bill.warrantyPeriodMonths));
            } catch (error) {
              console.error('Error calculating expiry date:', error);
              expiryDate = new Date(); // Fallback to current date
            }

            // Status styles
            const statusStyles = {
              expired: 'border-l-4 border-red-500',
              expiring: 'border-l-4 border-orange-500',
              active: 'border-l-4 border-green-500',
              unknown: 'border-l-4 border-gray-300'
            };

            return (
              <div
                key={idx}
                className={`bg-white rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl ${
                  statusStyles[warrantyStatus] || ''
                }`}
              >
                <div className="bg-gradient-to-r from-blue-800 to-indigo-900 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{getIconForProduct(bill.productName)}</span>
                    <h2 className="text-xl font-serif font-semibold text-white">{bill.productName || 'Unnamed Product'}</h2>
                  </div>
                  <div className="flex">
                    {warrantyStatus === 'active' && (
                      <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                        Active
                      </span>
                    )}
                    {warrantyStatus === 'expiring' && (
                      <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
                        Expiring Soon
                      </span>
                    )}
                    {warrantyStatus === 'expired' && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                        Expired
                      </span>
                    )}
                    {warrantyStatus === 'unknown' && (
                      <span className="px-2 py-1 bg-gray-500 text-white text-xs font-medium rounded-full">
                        Unknown
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div>
                      <p className="text-gray-500 text-sm">Purchased From</p>
                      <p className="font-medium text-gray-800">{bill.storeName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Amount</p>
                      <p className="font-medium text-gray-800">₹{bill.totalAmount?.toLocaleString() || '0'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Purchase Date</p>
                      <p className="font-medium text-gray-800">{formatDate(bill.purchaseDate)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Warranty Until</p>
                      <p className="font-medium text-gray-800">{formatDate(expiryDate)}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    {bill.invoiceFileUrl ? (
                      <a
                        href={bill.invoiceFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-800 font-medium flex items-center"
                      >
                        <span className="mr-2">📄</span> View Invoice
                      </a>
                    ) : (
                      <span className="text-gray-400">No invoice available</span>
                    )}

                    <button className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors duration-200">
                      Report Issue
                    </button>
                  </div>

                  {warrantyStatus === 'expiring' && (
                    <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <p className="text-orange-800 font-medium mb-3 flex items-center">
                        <span className="text-xl mr-2">⚠️</span> Warranty expiring soon!
                      </p>
                      <a
                        href={`/insurance?product=${encodeURIComponent(bill.productName || '')}`}
                        className="inline-block w-full bg-gradient-to-r from-blue-800 to-indigo-900 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-colors duration-200 text-center font-medium"
                      >
                        Explore Insurance Plans
                      </a>
                    </div>
                  )}

                  {warrantyStatus === 'expired' && (
                    <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800 font-medium mb-3 flex items-center">
                        <span className="text-xl mr-2">❗</span> Warranty has expired!
                      </p>
                      <div className="flex space-x-2">
                        <a
                          href={`/insurance?product=${encodeURIComponent(bill.productName || '')}`}
                          className="flex-1 bg-gradient-to-r from-blue-800 to-indigo-900 text-white px-2 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-colors duration-200 text-center font-medium"
                        >
                          Insurance Plans
                        </a>
                        <a
                          href={`/service?product=${encodeURIComponent(bill.productName || '')}`}
                          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-3 rounded-lg hover:from-orange-400 hover:to-red-400 transition-colors duration-200 text-center font-medium"
                        >
                          Find Service
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BillList;