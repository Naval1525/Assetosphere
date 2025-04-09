// // // import { useState } from 'react';
// // // import axios from 'axios';

// // // const BillUpload = () => {
// // //   const [formData, setFormData] = useState({
// // //     productName: '',
// // //     purchaseDate: '',
// // //     warrantyPeriodMonths: '',
// // //     reminderBeforeExpiry: '',
// // //     storeName: '',
// // //     totalAmount: '',
// // //     notes: '',
// // //     invoiceFile: null
// // //   });

// // //   const [success, setSuccess] = useState(null);
// // //   const [error, setError] = useState(null);

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData({ ...formData, [name]: value });
// // //   };

// // //   const handleFileChange = (e) => {
// // //     setFormData({ ...formData, invoiceFile: e.target.files[0] });
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     const token = localStorage.getItem('token');
// // //     const data = new FormData();

// // //     for (const key in formData) {
// // //       data.append(key, formData[key]);
// // //     }

// // //     try {
// // //       const response = await axios.post('http://localhost:8000/api/bills/upload', data, {
// // //         headers: {
// // //           'Content-Type': 'multipart/form-data',
// // //           Authorization: `Bearer ${token}`
// // //         }
// // //       });
// // //       setSuccess('Bill uploaded successfully!');
// // //       setError(null);
// // //     } catch (err) {
// // //       setSuccess(null);
// // //       setError('Upload failed. Make sure you are logged in.');
// // //     }
// // //   };

// // //   return (
// // //     <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
// // //       <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Upload Your Bill</h2>
// // //       <form onSubmit={handleSubmit} className="space-y-4">
// // //         <input type="text" name="productName" placeholder="Product Name" onChange={handleChange} required className="w-full p-2 border rounded" />
// // //         <input type="date" name="purchaseDate" onChange={handleChange} required className="w-full p-2 border rounded" />
// // //         <input type="number" name="warrantyPeriodMonths" placeholder="Warranty Period (Months)" onChange={handleChange} required className="w-full p-2 border rounded" />
// // //         <input type="number" name="reminderBeforeExpiry" placeholder="Reminder Before Expiry (Days)" onChange={handleChange} required className="w-full p-2 border rounded" />
// // //         <input type="text" name="storeName" placeholder="Store Name" onChange={handleChange} className="w-full p-2 border rounded" />
// // //         <input type="number" name="totalAmount" placeholder="Total Amount" onChange={handleChange} className="w-full p-2 border rounded" />
// // //         <textarea name="notes" placeholder="Notes (optional)" onChange={handleChange} className="w-full p-2 border rounded" />
// // //         <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} required className="w-full" />
// // //         <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Upload</button>
// // //         {success && <p className="text-green-600 text-center mt-2">{success}</p>}
// // //         {error && <p className="text-red-600 text-center mt-2">{error}</p>}
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default BillUpload;
// // import { useState } from 'react';
// // import axios from 'axios';

// // const BillUpload = () => {
// //   const [formData, setFormData] = useState({
// //     productName: '',
// //     purchaseDate: '',
// //     warrantyPeriodMonths: '',
// //     reminderBeforeExpiry: '30', // Default value
// //     storeName: '',
// //     totalAmount: '',
// //     notes: '',
// //     invoiceFile: null
// //   });

// //   const [success, setSuccess] = useState(null);
// //   const [error, setError] = useState(null);
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleFileChange = (e) => {
// //     setFormData({ ...formData, invoiceFile: e.target.files[0] });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);

// //     const token = localStorage.getItem('token');
// //     const data = new FormData();

// //     for (const key in formData) {
// //       data.append(key, formData[key]);
// //     }

// //     try {
// //       const response = await axios.post('http://localhost:8000/api/bills/upload', data, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //           Authorization: `Bearer ${token}`
// //         }
// //       });
// //       setSuccess('Bill uploaded successfully!');
// //       setError(null);
// //       // Reset form after successful upload
// //       setFormData({
// //         productName: '',
// //         purchaseDate: '',
// //         warrantyPeriodMonths: '',
// //         reminderBeforeExpiry: '30',
// //         storeName: '',
// //         totalAmount: '',
// //         notes: '',
// //         invoiceFile: null
// //       });
// //       // Reset file input
// //       document.getElementById('invoiceFileInput').value = '';
// //     } catch (err) {
// //       console.log(err)
// //       setSuccess(null);
// //       setError('Upload failed. Make sure you are logged in.');
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-12 px-4">
// //       <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
// //         <div className="bg-gradient-to-r from-blue-800 to-indigo-900 p-6 text-white">
// //           <h2 className="text-3xl font-serif font-bold">Upload Your Bill</h2>
// //           <p className="mt-2 opacity-80">Track warranties, get timely reminders and secure your assets</p>
// //         </div>

// //         <form onSubmit={handleSubmit} className="p-8">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             <div className="col-span-2">
// //               <label className="block text-gray-700 font-medium mb-2">Product Name</label>
// //               <input
// //                 type="text"
// //                 name="productName"
// //                 value={formData.productName}
// //                 placeholder="e.g., Samsung Smart TV"
// //                 onChange={handleChange}
// //                 required
// //                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-gray-700 font-medium mb-2">Purchase Date</label>
// //               <input
// //                 type="date"
// //                 name="purchaseDate"
// //                 value={formData.purchaseDate}
// //                 onChange={handleChange}
// //                 required
// //                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-gray-700 font-medium mb-2">Store Name</label>
// //               <input
// //                 type="text"
// //                 name="storeName"
// //                 value={formData.storeName}
// //                 placeholder="e.g., Amazon, Reliance Digital"
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-gray-700 font-medium mb-2">Warranty Period (Months)</label>
// //               <input
// //                 type="number"
// //                 name="warrantyPeriodMonths"
// //                 value={formData.warrantyPeriodMonths}
// //                 placeholder="12, 24, 36, etc."
// //                 onChange={handleChange}
// //                 required
// //                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-gray-700 font-medium mb-2">Total Amount (₹)</label>
// //               <input
// //                 type="number"
// //                 name="totalAmount"
// //                 value={formData.totalAmount}
// //                 placeholder="e.g., 45000"
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-gray-700 font-medium mb-2">Reminder Before Expiry (Days)</label>
// //               <input
// //                 type="number"
// //                 name="reminderBeforeExpiry"
// //                 value={formData.reminderBeforeExpiry}
// //                 placeholder="30"
// //                 onChange={handleChange}
// //                 required
// //                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
// //               />
// //             </div>

// //             <div className="col-span-2">
// //               <label className="block text-gray-700 font-medium mb-2">Notes (optional)</label>
// //               <textarea
// //                 name="notes"
// //                 value={formData.notes}
// //                 placeholder="Additional information about your purchase"
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 h-24"
// //               />
// //             </div>

// //             <div className="col-span-2">
// //               <label className="block text-gray-700 font-medium mb-2">Upload Invoice</label>
// //               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
// //                 <input
// //                   id="invoiceFileInput"
// //                   type="file"
// //                   accept="image/*,application/pdf"
// //                   onChange={handleFileChange}
// //                   required
// //                   className="hidden"
// //                 />
// //                 <label htmlFor="invoiceFileInput" className="cursor-pointer">
// //                   <div className="flex flex-col items-center space-y-2">
// //                     <span className="text-3xl">📄</span>
// //                     <span className="text-blue-700 font-medium">Select File</span>
// //                     <span className="text-sm text-gray-500">
// //                       {formData.invoiceFile ? `Selected: ${formData.invoiceFile.name}` : "PDF or Image formats accepted"}
// //                     </span>
// //                   </div>
// //                 </label>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="mt-8">
// //             <button
// //               type="submit"
// //               disabled={isSubmitting}
// //               className={`w-full bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-colors duration-200 flex justify-center items-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
// //             >
// //               {isSubmitting ? (
// //                 <>
// //                   <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
// //                   Uploading...
// //                 </>
// //               ) : 'Upload Bill'}
// //             </button>

// //             {success && (
// //               <div className="mt-4 bg-green-50 text-green-800 p-4 rounded-lg flex items-center">
// //                 <span className="text-xl mr-2">✅</span>
// //                 <p>{success}</p>
// //               </div>
// //             )}

// //             {error && (
// //               <div className="mt-4 bg-red-50 text-red-800 p-4 rounded-lg flex items-center">
// //                 <span className="text-xl mr-2">❌</span>
// //                 <p>{error}</p>
// //               </div>
// //             )}
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BillUpload;
// import { useState } from 'react';
// import axios from 'axios';

// const BillUpload = () => {
//   const [formData, setFormData] = useState({
//     productName: '',
//     purchaseDate: '',
//     warrantyPeriodMonths: '',
//     reminderBeforeExpiry: '30', // Default value
//     storeName: '',
//     totalAmount: '',
//     notes: '',
//     invoiceFile: null
//   });

//   const [success, setSuccess] = useState(null);
//   const [error, setError] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, invoiceFile: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       // Get the JWT token from localStorage
//       const token = localStorage.getItem('token');

//       if (!token) {
//         throw new Error('Authentication token not found. Please log in again.');
//       }

//       // Create FormData object for multipart/form-data submission
//       const data = new FormData();

//       // Append all form fields to FormData
//       Object.keys(formData).forEach(key => {
//         if (key === 'invoiceFile' && formData[key]) {
//           data.append('invoiceFile', formData[key]);
//         } else if (formData[key] !== null && formData[key] !== '') {
//           data.append(key, formData[key]);
//         }
//       });

//       // Make the API request
//       const response = await axios.post('http://localhost:8000/api/bills/upload', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       // Handle successful response
//       setSuccess('Bill uploaded successfully!');

//       // Reset form after successful upload
//       setFormData({
//         productName: '',
//         purchaseDate: '',
//         warrantyPeriodMonths: '',
//         reminderBeforeExpiry: '30',
//         storeName: '',
//         totalAmount: '',
//         notes: '',
//         invoiceFile: null
//       });

//       // Reset file input
//       document.getElementById('invoiceFileInput').value = '';

//     } catch (err) {
//       console.error('Upload error:', err);
//       setError(err.response?.data?.message || err.message || 'Upload failed. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
//         <div className="bg-gradient-to-r from-blue-800 to-indigo-900 p-6 text-white">
//           <h2 className="text-3xl font-serif font-bold">Upload Your Bill</h2>
//           <p className="mt-2 opacity-80">Track warranties, get timely reminders and secure your assets</p>
//         </div>

//         <form onSubmit={handleSubmit} className="p-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="col-span-2">
//               <label className="block text-gray-700 font-medium mb-2">Product Name</label>
//               <input
//                 type="text"
//                 name="productName"
//                 value={formData.productName}
//                 placeholder="e.g., Samsung Smart TV"
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Purchase Date</label>
//               <input
//                 type="date"
//                 name="purchaseDate"
//                 value={formData.purchaseDate}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Store Name</label>
//               <input
//                 type="text"
//                 name="storeName"
//                 value={formData.storeName}
//                 placeholder="e.g., Amazon, Reliance Digital"
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Warranty Period (Months)</label>
//               <input
//                 type="number"
//                 name="warrantyPeriodMonths"
//                 value={formData.warrantyPeriodMonths}
//                 placeholder="12, 24, 36, etc."
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Total Amount (₹)</label>
//               <input
//                 type="number"
//                 name="totalAmount"
//                 value={formData.totalAmount}
//                 placeholder="e.g., 45000"
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Reminder Before Expiry (Days)</label>
//               <input
//                 type="number"
//                 name="reminderBeforeExpiry"
//                 value={formData.reminderBeforeExpiry}
//                 placeholder="30"
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
//               />
//             </div>

//             <div className="col-span-2">
//               <label className="block text-gray-700 font-medium mb-2">Notes (optional)</label>
//               <textarea
//                 name="notes"
//                 value={formData.notes}
//                 placeholder="Additional information about your purchase"
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 h-24"
//               />
//             </div>

//             <div className="col-span-2">
//               <label className="block text-gray-700 font-medium mb-2">Upload Invoice</label>
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                 <input
//                   id="invoiceFileInput"
//                   type="file"
//                   name="invoiceFile"
//                   accept="image/*,application/pdf"
//                   onChange={handleFileChange}
//                   required
//                   className="hidden"
//                 />
//                 <label htmlFor="invoiceFileInput" className="cursor-pointer">
//                   <div className="flex flex-col items-center space-y-2">
//                     <span className="text-3xl">📄</span>
//                     <span className="text-blue-700 font-medium">Select File</span>
//                     <span className="text-sm text-gray-500">
//                       {formData.invoiceFile ? `Selected: ${formData.invoiceFile.name}` : "PDF or Image formats accepted"}
//                     </span>
//                   </div>
//                 </label>
//               </div>
//             </div>
//           </div>

//           <div className="mt-8">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`w-full bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-colors duration-200 flex justify-center items-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
//                   Uploading...
//                 </>
//               ) : 'Upload Bill'}
//             </button>

//             {success && (
//               <div className="mt-4 bg-green-50 text-green-800 p-4 rounded-lg flex items-center">
//                 <span className="text-xl mr-2">✅</span>
//                 <p>{success}</p>
//               </div>
//             )}

//             {error && (
//               <div className="mt-4 bg-red-50 text-red-800 p-4 rounded-lg flex items-center">
//                 <span className="text-xl mr-2">❌</span>
//                 <p>{error}</p>
//               </div>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BillUpload;
import { useState } from 'react';
import axios from 'axios';

const BillUpload = () => {
  const [formData, setFormData] = useState({
    productName: '',
    purchaseDate: '',
    warrantyPeriodMonths: '',
    reminderBeforeExpiry: '30', // Default value
    storeName: '',
    totalAmount: '',
    notes: '',
    invoiceFile: null
  });

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, invoiceFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // Form validation
      if (!formData.productName || !formData.purchaseDate || !formData.warrantyPeriodMonths) {
        throw new Error('Please fill in all required fields');
      }

      if (!formData.invoiceFile) {
        throw new Error('Please upload an invoice file');
      }

      // Get the JWT token from localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      // Create FormData object for multipart/form-data submission
      const data = new FormData();

      // Append all form fields to FormData
      data.append('productName', formData.productName);
      data.append('purchaseDate', formData.purchaseDate);
      data.append('warrantyPeriodMonths', formData.warrantyPeriodMonths);
      data.append('reminderBeforeExpiry', formData.reminderBeforeExpiry);

      if (formData.storeName) {
        data.append('storeName', formData.storeName);
      }

      if (formData.totalAmount) {
        data.append('totalAmount', formData.totalAmount);
      }

      if (formData.notes) {
        data.append('notes', formData.notes);
      }

      // Append the file
      data.append('invoiceFile', formData.invoiceFile);

      // Log what's being sent (for debugging)
      console.log('Sending form data:');
      for (let [key, value] of data.entries()) {
        console.log(`${key}: ${key === 'invoiceFile' ? value.name : value}`);
      }

      // Make the API request
      const response = await axios.post('http://localhost:8000/api/bills/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Response:', response.data);

      // Handle successful response
      setSuccess('Bill uploaded successfully!');

      // Reset form after successful upload
      setFormData({
        productName: '',
        purchaseDate: '',
        warrantyPeriodMonths: '',
        reminderBeforeExpiry: '30',
        storeName: '',
        totalAmount: '',
        notes: '',
        invoiceFile: null
      });

      // Reset file input
      document.getElementById('invoiceFileInput').value = '';

    } catch (err) {
      console.error('Upload error:', err);

      // More detailed error handling
      if (err.response) {
        // The server responded with an error status
        console.error('Server response:', err.response.data);
        setError(err.response.data.message || 'Server error. Please try again.');
      } else if (err.request) {
        // The request was made but no response received
        console.error('No response received');
        setError('No response from server. Please check your connection.');
      } else {
        // Error in request setup
        setError(err.message || 'Upload failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-800 to-indigo-900 p-6 text-white">
          <h2 className="text-3xl font-serif font-bold">Upload Your Bill</h2>
          <p className="mt-2 opacity-80">Track warranties, get timely reminders and secure your assets</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Product Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                placeholder="e.g., Samsung Smart TV"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Purchase Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Store Name</label>
              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                placeholder="e.g., Amazon, Reliance Digital"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Warranty Period (Months) <span className="text-red-500">*</span></label>
              <input
                type="number"
                name="warrantyPeriodMonths"
                value={formData.warrantyPeriodMonths}
                placeholder="12, 24, 36, etc."
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Total Amount (₹)</label>
              <input
                type="number"
                name="totalAmount"
                value={formData.totalAmount}
                placeholder="e.g., 45000"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Reminder Before Expiry (Days)</label>
              <input
                type="number"
                name="reminderBeforeExpiry"
                value={formData.reminderBeforeExpiry}
                placeholder="30"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Notes (optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                placeholder="Additional information about your purchase"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 h-24"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Upload Invoice <span className="text-red-500">*</span></label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  id="invoiceFileInput"
                  type="file"
                  name="invoiceFile"
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={handleFileChange}
                  required
                  className="hidden"
                />
                <label htmlFor="invoiceFileInput" className="cursor-pointer">
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-3xl">📄</span>
                    <span className="text-blue-700 font-medium">Select File</span>
                    <span className="text-sm text-gray-500">
                      {formData.invoiceFile ? `Selected: ${formData.invoiceFile.name}` : "PDF or Image formats (JPG, PNG) accepted"}
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-colors duration-200 flex justify-center items-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                  Uploading...
                </>
              ) : 'Upload Bill'}
            </button>

            {success && (
              <div className="mt-4 bg-green-50 text-green-800 p-4 rounded-lg flex items-center">
                <span className="text-xl mr-2">✅</span>
                <p>{success}</p>
              </div>
            )}

            {error && (
              <div className="mt-4 bg-red-50 text-red-800 p-4 rounded-lg flex items-center">
                <span className="text-xl mr-2">❌</span>
                <p>{error}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillUpload;