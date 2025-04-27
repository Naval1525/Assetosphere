import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ExpiringBills from './company/ExpiringBills';
import UserBillsList from './company/UserBillsList';
import UserBillsDashboard from './company/UserBillsDashboard';

const CompanyDashboard = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    website: '',
    industry: '',
    description: '',
    address: '',
    logo: ''
  });

  const [planData, setPlanData] = useState({
    name: '',
    price: '',
    features: [''],
    duration: '',
    coverage: '',
    terms: ''
  });

  useEffect(() => {
    if (!localStorage.getItem('token') || localStorage.getItem('isCompany') !== 'true') {
      navigate('/company/login');
      return;
    }

    const fetchCompanyData = async () => {
      try {
        const config = {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        };

        const res = await axios.get('http://localhost:8000/api/companies/me', config);
        setCompany(res.data);
        setProfileData({
          name: res.data.name || '',
          email: res.data.email || '',
          phoneNumber: res.data.phoneNumber || '',
          website: res.data.website || '',
          industry: res.data.industry || '',
          description: res.data.description || '',
          address: res.data.address || '',
          logo: res.data.logo || ''
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load company data');
        setLoading(false);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('isCompany');
          navigate('/company/login');
        }
      }
    };

    fetchCompanyData();
  }, [navigate]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      };

      await axios.put('http://localhost:8000/api/companies/profile', profileData, config);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to update profile');
    }
  };

  const handleAddPlan = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      };

      await axios.post('http://localhost:8000/api/companies/plans', planData, config);
      setIsAddingPlan(false);
      setPlanData({
        name: '',
        price: '',
        features: [''],
        duration: '',
        coverage: '',
        terms: ''
      });
      toast.success('Plan added successfully!');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to add plan');
    }
  };

  const handleUpdatePlan = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      };

      await axios.put(`http://localhost:8000/api/companies/plans/${selectedPlan._id}`, planData, config);
      setIsEditingPlan(false);
      setSelectedPlan(null);
      toast.success('Plan updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to update plan');
    }
  };

  const handleDeletePlan = async (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        const config = {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        };

        await axios.delete(`http://localhost:8000/api/companies/plans/${planId}`, config);
        toast.success('Plan deleted successfully!');
      } catch (err) {
        toast.error(err.response?.data?.msg || 'Failed to delete plan');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isCompany');
    navigate('/company/login');
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'plans', label: 'Plans' },
    { id: 'bills', label: 'Customer Bills' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Company Profile</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company Name</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        type="tel"
                        value={profileData.phoneNumber}
                        onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Website</label>
                      <input
                        type="url"
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Industry</label>
                      <input
                        type="text"
                        value={profileData.industry}
                        onChange={(e) => setProfileData({ ...profileData, industry: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input
                        type="text"
                        value={profileData.address}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={profileData.description}
                      onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Company Name</h3>
                      <p className="mt-1 text-sm text-gray-900">{company.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p className="mt-1 text-sm text-gray-900">{company.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                      <p className="mt-1 text-sm text-gray-900">{company.phoneNumber || 'Not provided'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Website</h3>
                      <p className="mt-1 text-sm text-gray-900">{company.website || 'Not provided'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Industry</h3>
                      <p className="mt-1 text-sm text-gray-900">{company.industry || 'Not provided'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Address</h3>
                      <p className="mt-1 text-sm text-gray-900">{company.address || 'Not provided'}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Description</h3>
                    <p className="mt-1 text-sm text-gray-900">{company.description || 'Not provided'}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );
      case 'plans':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Warranty Plans</h2>
                <button
                  onClick={() => {
                    setIsAddingPlan(true);
                    setPlanData({
                      name: '',
                      price: '',
                      features: [''],
                      duration: '',
                      coverage: '',
                      terms: ''
                    });
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add New Plan
                </button>
              </div>

              {/* Add/Edit Plan Form */}
              {(isAddingPlan || isEditingPlan) && (
                <form
                  onSubmit={isAddingPlan ? handleAddPlan : handleUpdatePlan}
                  className="mb-8 space-y-6 bg-gray-50 p-6 rounded-lg"
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Plan Name</label>
                      <input
                        type="text"
                        value={planData.name}
                        onChange={(e) => setPlanData({ ...planData, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      <input
                        type="text"
                        value={planData.price}
                        onChange={(e) => setPlanData({ ...planData, price: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Duration</label>
                      <input
                        type="text"
                        value={planData.duration}
                        onChange={(e) => setPlanData({ ...planData, duration: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Coverage</label>
                      <input
                        type="text"
                        value={planData.coverage}
                        onChange={(e) => setPlanData({ ...planData, coverage: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Features</label>
                    {planData.features.map((feature, index) => (
                      <div key={index} className="mt-1 flex">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => {
                            const newFeatures = [...planData.features];
                            newFeatures[index] = e.target.value;
                            setPlanData({ ...planData, features: newFeatures });
                          }}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newFeatures = planData.features.filter((_, i) => i !== index);
                            setPlanData({ ...planData, features: newFeatures });
                          }}
                          className="ml-2 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setPlanData({ ...planData, features: [...planData.features, ''] })}
                      className="mt-2 px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                      Add Feature
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Terms & Conditions</label>
                    <textarea
                      value={planData.terms}
                      onChange={(e) => setPlanData({ ...planData, terms: e.target.value })}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingPlan(false);
                        setIsEditingPlan(false);
                        setSelectedPlan(null);
                      }}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      {isAddingPlan ? 'Add Plan' : 'Update Plan'}
                    </button>
                  </div>
                </form>
              )}

              {/* Plans List */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {company.plans && company.plans.length > 0 ? (
                  company.plans.map((plan) => (
                    <motion.div
                      key={plan._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white border rounded-lg shadow-sm overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              plan.active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {plan.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="mt-2 text-2xl font-bold text-gray-900">{plan.price}</p>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-500">Features</h4>
                          <ul className="mt-2 space-y-2">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <svg
                                  className="h-5 w-5 text-green-500 mr-2"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-sm text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-6 flex space-x-4">
                          <button
                            onClick={() => {
                              setSelectedPlan(plan);
                              setIsEditingPlan(true);
                              setPlanData({
                                name: plan.name,
                                price: plan.price,
                                features: plan.features,
                                duration: plan.duration,
                                coverage: plan.coverage,
                                terms: plan.terms
                              });
                            }}
                            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePlan(plan._id)}
                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">No plans created yet. Add your first warranty plan!</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      case 'bills':
        return <UserBillsDashboard />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Company Dashboard</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default CompanyDashboard;