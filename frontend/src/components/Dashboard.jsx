import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell, Shield, Wrench, Clock, FileText, Upload, Check, ArrowRight,
  Calendar, ChevronRight, AlertTriangle, BarChart, PieChart, Settings,
  Plus, FileSearch, LifeBuoy, Download, Smartphone, Tv, Home
} from 'lucide-react';

const Dashboard = () => {
  // State for user data
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the token from localStorage or wherever you store it after login
        const token = localStorage.getItem('token'); // or from your auth context/state

        if (!token) {
          throw new Error('No authentication token found');
        }

        // Include the token in your request headers
        const response = await fetch('http://localhost:8000/api/user/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Calculate warranty status for items
  const calculateWarrantyStatus = (bill) => {
    const purchaseDate = new Date(bill.purchaseDate);
    const warrantyEndDate = new Date(purchaseDate);
    warrantyEndDate.setMonth(purchaseDate.getMonth() + bill.warrantyPeriodMonths);

    const today = new Date();
    const daysRemaining = Math.floor((warrantyEndDate - today) / (1000 * 60 * 60 * 24));

    if (daysRemaining < 0) {
      return { status: 'expired', daysRemaining: 0 };
    } else if (daysRemaining <= bill.reminderBeforeExpiry) {
      return { status: 'expiring-soon', daysRemaining };
    } else {
      return { status: 'active', daysRemaining };
    }
  };

  // Group bills by category function
  const groupBillsByCategory = (bills) => {
    return bills.reduce((acc, bill) => {
      // Simple categorization based on product name
      let category = 'Other';
      if (/tv|television/i.test(bill.productName)) category = 'Electronics';
      else if (/fridge|refrigerator/i.test(bill.productName)) category = 'Appliances';
      else if (/phone|mobile|smartphone/i.test(bill.productName)) category = 'Mobile';
      else if (/ac|air conditioner|cooler/i.test(bill.productName)) category = 'Climate Control';
      else if (/bike|scooter|car|vehicle/i.test(bill.productName)) category = 'Vehicles';

      if (!acc[category]) acc[category] = [];
      acc[category].push(bill);
      return acc;
    }, {});
  };

  // Get upcoming expirations
  const getUpcomingExpirations = (bills) => {
    if (!bills || bills.length === 0) return [];

    return bills
      .map(bill => {
        const status = calculateWarrantyStatus(bill);
        return { ...bill, ...status };
      })
      .filter(bill => bill.status === 'expiring-soon' || bill.status === 'active')
      .sort((a, b) => a.daysRemaining - b.daysRemaining)
      .slice(0, 5);
  };

  // Get recently added items
  const getRecentlyAdded = (bills) => {
    if (!bills || bills.length === 0) return [];

    return [...bills]
      .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))
      .slice(0, 5);
  };

  // Calculate total coverage value (sum of all item amounts)
  const calculateTotalCoverage = (bills) => {
    if (!bills || bills.length === 0) return 0;
    return bills.reduce((sum, bill) => sum + (Number(bill.totalAmount) || 0), 0);
  };

  // Calculate stats
  const calculateStats = (userData) => {
    if (!userData || !userData.bills) return [];

    const bills = userData.bills;
    const totalItems = bills.length;
    const totalCoverage = calculateTotalCoverage(bills);

    const activeWarranties = bills.filter(bill => {
      const status = calculateWarrantyStatus(bill);
      return status.status === 'active' || status.status === 'expiring-soon';
    }).length;

    const expiringWarranties = bills.filter(bill => {
      const status = calculateWarrantyStatus(bill);
      return status.status === 'expiring-soon';
    }).length;

    return [
      { title: 'Total Items', value: totalItems, icon: <FileText size={24} className="text-blue-600" /> },
      { title: 'Total Coverage', value: `₹${totalCoverage.toLocaleString()}`, icon: <Shield size={24} className="text-green-600" /> },
      { title: 'Active Warranties', value: activeWarranties, icon: <Check size={24} className="text-teal-600" /> },
      { title: 'Expiring Soon', value: expiringWarranties, icon: <AlertTriangle size={24} className="text-orange-600" /> }
    ];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <AlertTriangle size={48} className="text-red-600 mx-auto" />
          <h3 className="mt-4 text-xl font-semibold">Failed to load dashboard</h3>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // For demo purposes, provide fallback data if userData is not available
  const fallbackData = {
    name: "User",
    email: "user@example.com",
    bills: []
  };

  const user = userData || fallbackData;
  const stats = calculateStats(user);
  const upcomingExpirations = getUpcomingExpirations(user.bills || []);
  const recentItems = getRecentlyAdded(user.bills || []);
  const categorizedBills = groupBillsByCategory(user.bills || []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-600 mt-2">Manage your assets and stay updated on warranty expirations.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gray-100 p-3 rounded-lg">{stat.icon}</div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.title === 'Expiring Soon' && parseInt(stat.value) > 0
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {stat.title === 'Expiring Soon' && parseInt(stat.value) > 0 ? 'Action Needed' : 'Active'}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.title}</div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Upcoming Warranty Expirations */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Warranty Expirations</h2>
                <Link to="/warranties" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  View All <ChevronRight size={16} />
                </Link>
              </div>

              {upcomingExpirations.length > 0 ? (
                <div className="space-y-4">
                  {upcomingExpirations.map((item, index) => (
                    <div key={index} className="flex items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <div className={`w-2 h-12 rounded-full mr-4 ${
                        item.daysRemaining < 30 ? 'bg-red-500' : 'bg-yellow-500'
                      }`}></div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.productName}</h3>
                        <p className="text-sm text-gray-500">
                          Purchased: {new Date(item.purchaseDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-medium ${
                          item.daysRemaining < 30 ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {item.daysRemaining} days left
                        </span>
                        <p className="text-xs text-gray-500">Warranty ending</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Clock size={32} className="mx-auto mb-2 text-gray-400" />
                  <p>No upcoming warranty expirations</p>
                </div>
              )}
            </div>

            {/* Recently Added Items */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recently Added Items</h2>
                <Link to="/items" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  View All <ChevronRight size={16} />
                </Link>
              </div>

              {recentItems.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3">Purchase Date</th>
                        <th className="px-4 py-3">Store</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentItems.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900">{item.productName}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {new Date(item.purchaseDate).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {item.storeName || 'N/A'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            ₹{Number(item.totalAmount).toLocaleString() || 'N/A'}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <Link to={`/items/${item._id}`} className="text-blue-600 hover:text-blue-800">
                              View Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText size={32} className="mx-auto mb-2 text-gray-400" />
                  <p>No items added yet</p>
                  <Link to="/add-item" className="mt-2 inline-block text-blue-600 hover:text-blue-800">
                    Add Your First Item
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/add-item" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-blue-100 p-3 rounded-full mb-2">
                    <Plus size={20} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-center">Add New Item</span>
                </Link>

                <Link to="/service-request" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-green-100 p-3 rounded-full mb-2">
                    <Wrench size={20} className="text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-center">Service Request</span>
                </Link>

                <Link to="/bill-scanner" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-purple-100 p-3 rounded-full mb-2">
                    <Upload size={20} className="text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-center">Scan Bill</span>
                </Link>

                <Link to="/insurance" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-orange-100 p-3 rounded-full mb-2">
                    <Shield size={20} className="text-orange-600" />
                  </div>
                  <span className="text-sm font-medium text-center">Insurance</span>
                </Link>
              </div>
            </div>

            {/* Items by Category */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Items by Category</h2>

              {Object.keys(categorizedBills).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(categorizedBills).map(([category, items], index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="p-2 rounded-lg mr-4">
                          {category === 'Electronics' && <Tv size={20} className="text-blue-600" />}
                          {category === 'Appliances' && <Home size={20} className="text-green-600" />}
                          {category === 'Mobile' && <Smartphone size={20} className="text-purple-600" />}
                          {category === 'Climate Control' && <Wrench size={20} className="text-teal-600" />}
                          {category === 'Vehicles' && <FileSearch size={20} className="text-orange-600" />}
                          {category === 'Other' && <FileText size={20} className="text-gray-600" />}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{category}</h3>
                          <p className="text-xs text-gray-500">{items.length} items</p>
                        </div>
                      </div>
                      <Link to={`/category/${category.toLowerCase()}`} className="text-blue-600 hover:text-blue-800">
                        <ChevronRight size={20} />
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <PieChart size={32} className="mx-auto mb-2 text-gray-400" />
                  <p>No items categorized yet</p>
                </div>
              )}
            </div>

            {/* Support */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <div className="flex items-start">
                <div className="mr-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <LifeBuoy size={24} className="text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-4">Our support team is ready to assist you with any questions about your items or warranties.</p>
                  <Link to="/support" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;