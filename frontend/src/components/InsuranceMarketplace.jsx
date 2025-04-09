// // src/pages/InsuranceMarketplace.jsx
// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const InsuranceMarketplace = () => {
//   const query = new URLSearchParams(useLocation().search);
//   const product = query.get('product');

//   const plans = [
//     {
//         name: 'SafeCover Warranty+',
//         price: '₹399/year',
//         features: [
//           'Covers mechanical & electrical failure',
//           'Free pickup & repair',
//           '24x7 claims support',
//         ],
//         url: 'https://partner1.com/safecover?ref=yourRefID',
//       },
//       {
//         name: 'Extended Guard by Guardify',
//         price: '₹499/year',
//         features: [
//           'Covers accidental damage',
//           'Up to ₹10,000 claim',
//           'No paperwork needed',
//         ],
//         url: 'https://partner2.com/guardify?ref=yourRefID',
//       },
//       {
//         name: 'AssurePlan Essentials',
//         price: '₹349/year',
//         features: [
//           'Breakdown cover',
//           'On-site service',
//           'Instant activation',
//         ],
//         url: 'https://partner3.com/assureplan?ref=yourRefID',
//       },
//       {
//         name: 'Gadget Secure Plan',
//         price: '₹499/year',
//         features: [
//           'Covers accidental damage',
//           'Screen cracks & water damage',
//           'Hassle-free claims process',
//         ],
//         url: 'https://www.policybazaar.com/gadget-insurance',
//       },
//       {
//         name: 'Electronics Extended Warranty',
//         price: '₹799/year',
//         features: [
//           'Extends warranty by up to 2 years',
//           'Free repairs & doorstep service',
//           'Covers breakdown after OEM warranty',
//         ],
//         url: 'https://www.godigit.com/electronics-insurance',
//       },
//       {
//         name: 'ACKO Mobile Protection',
//         price: '₹599/year',
//         features: [
//           'Covers accidental & liquid damage',
//           'One-time screen replacement',
//           'Pickup & drop service',
//         ],
//         url: 'https://www.acko.com/mobile-insurance',
//       },
//       {
//         name: 'OneAssist Device Protection',
//         price: '₹699/year',
//         features: [
//           'Repair or replace damaged devices',
//           'Covers theft, accidental damage',
//           '24x7 support & doorstep assistance',
//         ],
//         url: 'https://www.oneassist.in/device-protection',
//       },
//     ];

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-tr from-white to-blue-50">
//       <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Insurance Marketplace</h1>
//       <p className="text-center text-gray-600 mb-10">Showing plans for <span className="font-semibold">{product}</span></p>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {plans.map((plan, idx) => (
//           <div
//             key={idx}
//             className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
//           >
//             <h2 className="text-xl font-semibold text-blue-700 mb-2">{plan.name}</h2>
//             <p className="text-lg text-gray-800 mb-3">{plan.price}</p>
//             <ul className="list-disc list-inside text-gray-600 mb-4">
//               {plan.features.map((feature, fIdx) => (
//                 <li key={fIdx}>{feature}</li>
//               ))}
//             </ul>
//             <a
//               href={plan.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//             >
//               Buy Plan
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InsuranceMarketplace;
// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const InsuranceMarketplace = () => {
//   const query = new URLSearchParams(useLocation().search);
//   const product = query.get('product');

//   const plans = [
//     {
//       name: 'SafeCover Warranty+',
//       price: '₹399/year',
//       company: 'TrustShield Insurance',
//       features: [
//         'Covers mechanical & electrical failure',
//         'Free pickup & repair',
//         '24x7 claims support',
//       ],
//       bestFor: 'Electronics',
//       url: 'https://partner1.com/safecover?ref=yourRefID',
//     },
//     {
//       name: 'Extended Guard',
//       price: '₹499/year',
//       company: 'Guardify',
//       features: [
//         'Covers accidental damage',
//         'Up to ₹10,000 claim',
//         'No paperwork needed',
//       ],
//       bestFor: 'Phones & Laptops',
//       url: 'https://partner2.com/guardify?ref=yourRefID',
//     },
//     {
//       name: 'AssurePlan Essentials',
//       price: '₹349/year',
//       company: 'AssureTech',
//       features: [
//         'Breakdown cover',
//         'On-site service',
//         'Instant activation',
//       ],
//       bestFor: 'Home Appliances',
//       url: 'https://partner3.com/assureplan?ref=yourRefID',
//     },
//     {
//       name: 'Gadget Secure Plan',
//       price: '₹499/year',
//       company: 'PolicyBazaar',
//       features: [
//         'Covers accidental damage',
//         'Screen cracks & water damage',
//         'Hassle-free claims process',
//       ],
//       bestFor: 'Smartphones & Tablets',
//       url: 'https://www.policybazaar.com/gadget-insurance',
//     },
//     {
//       name: 'Electronics Extended Warranty',
//       price: '₹799/year',
//       company: 'Digit Insurance',
//       features: [
//         'Extends warranty by up to 2 years',
//         'Free repairs & doorstep service',
//         'Covers breakdown after OEM warranty',
//       ],
//       bestFor: 'High-value Electronics',
//       url: 'https://www.godigit.com/electronics-insurance',
//     },
//     {
//       name: 'ACKO Mobile Protection',
//       price: '₹599/year',
//       company: 'ACKO',
//       features: [
//         'Accidental & liquid damage',
//         'One-time screen replacement',
//         'Pickup & drop service',
//       ],
//       bestFor: 'Mobile Phones',
//       url: 'https://www.acko.com/mobile-insurance',
//     },
//   ];

//   const getRandomRating = () => {
//     return (4 + Math.random()).toFixed(1).substring(0, 3);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-6">
//       <div className="container mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-serif font-bold text-blue-900 mb-4">Insurance Marketplace</h1>
//           <p className="text-xl text-gray-600">
//             Protect your <span className="font-semibold text-blue-800">{product}</span> with the perfect coverage plan
//           </p>
//         </div>

//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {plans.map((plan, idx) => {
//             const rating = getRandomRating();

//             return (
//               <div
//                 key={idx}
//                 className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
//               >
//                 <div className="border-b p-6">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <span className="text-sm text-blue-600 font-medium">{plan.company}</span>
//                       <h2 className="text-2xl font-serif font-bold text-gray-900 mt-1">{plan.name}</h2>
//                     </div>
//                     <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//                       {plan.bestFor}
//                     </div>
//                   </div>

//                   <div className="mt-4 flex items-end">
//                     <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
//                     <div className="ml-4 flex items-center">
//                       <div className="flex text-yellow-400">
//                         {'★'.repeat(Math.floor(rating))}
//                         {rating % 1 !== 0 ? '☆' : ''}
//                         {'☆'.repeat(5 - Math.ceil(rating))}
//                       </div>
//                       <span className="ml-1 text-gray-600">{rating}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   <h3 className="font-medium text-gray-700 mb-3">What's Covered:</h3>
//                   <ul className="space-y-3 mb-6">
//                     {plan.features.map((feature, fIdx) => (
//                       <li key={fIdx} className="flex items-start">
//                         <span className="text-green-500 mr-2">✓</span>
//                         <span className="text-gray-600">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>

//                   <a
//                     href={plan.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block w-full bg-gradient-to-r from-blue-800 to-indigo-900 text-white text-center py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-colors duration-200 shadow-md"
//                   >
//                     Get Protected
//                   </a>
//                 </div>

//                 <div className="bg-gray-50 px-6 py-3 text-center text-sm text-gray-500">
//                   30-day money-back guarantee
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="mt-12 bg-blue-800 text-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
//           <h2 className="text-2xl font-serif font-bold mb-4">Need a custom insurance solution?</h2>
//           <p className="text-blue-100 mb-6">Our insurance experts can help find the perfect coverage for your specific needs.</p>
//           <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
//             />
//             <button className="bg-white text-blue-800 px-6 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200">
//               Get Expert Advice
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InsuranceMarketplace;
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const InsuranceMarketplace = () => {
  const query = new URLSearchParams(useLocation().search);
  const product = query.get('product');

  // State to track selected plan ID instead of the plan object
  const [expandedPlanId, setExpandedPlanId] = useState(null);

  const handleGetProtected = (idx, e) => {
    e.preventDefault();
    setExpandedPlanId(expandedPlanId === idx ? null : idx);
  };

  const plans = [
    {
      name: 'SafeCover Warranty+',
      price: '₹399/year',
      company: 'TrustShield Insurance',
      features: [
        'Covers mechanical & electrical failure',
        'Free pickup & repair',
        '24x7 claims support',
      ],
      bestFor: 'Electronics',
      url: 'https://partner1.com/safecover?ref=yourRefID',
      details: {
        description: 'SafeCover Warranty+ is a comprehensive protection plan designed for all your electronics. With our hassle-free claims process, you can enjoy peace of mind knowing your devices are protected.',
        coverage: [
          'Mechanical failures and breakdowns',
          'Electrical malfunctions',
          'Manufacturing defects beyond manufacturer warranty',
          'Power surge damage',
          'Component failure'
        ],
        exclusions: [
          'Accidental damage',
          'Liquid damage',
          'Theft or loss',
          'Cosmetic damage that doesnt affect functionality',
          'Pre-existing conditions'
        ],
        claimProcess: 'Simply call our 24/7 helpline or use our mobile app to register your claim. Our technician will pick up your device within 24 hours, and repairs are typically completed within 3-5 business days.',
        maxClaim: '₹20,000 per claim, unlimited claims per year',
        waitingPeriod: '15 days from purchase of policy'
      }
    },
    {
      name: 'Extended Guard',
      price: '₹499/year',
      company: 'Guardify',
      features: [
        'Covers accidental damage',
        'Up to ₹10,000 claim',
        'No paperwork needed',
      ],
      bestFor: 'Phones & Laptops',
      url: 'https://partner2.com/guardify?ref=yourRefID',
      details: {
        description: 'Extended Guard provides comprehensive protection for your phones and laptops against accidental damage. Our paperless claims process ensures quick resolution so you can get back to using your devices.',
        coverage: [
          'Accidental drops and falls',
          'Screen damage and cracks',
          'Internal component damage from accidents',
          'Liquid spills and submersion',
          'Camera and button malfunctions from accidents'
        ],
        exclusions: [
          'Normal wear and tear',
          'Theft or loss',
          'Intentional damage',
          'Mechanical or electrical failures',
          'Software issues'
        ],
        claimProcess: 'Submit your claim through our mobile app or website with photos of the damaged device. Once approved, choose between repair at an authorized center or doorstep service.',
        maxClaim: '₹10,000 per claim, maximum 2 claims per year',
        waitingPeriod: '7 days from purchase of policy'
      }
    },
    {
      name: 'AssurePlan Essentials',
      price: '₹349/year',
      company: 'AssureTech',
      features: [
        'Breakdown cover',
        'On-site service',
        'Instant activation',
      ],
      bestFor: 'Home Appliances',
      url: 'https://partner3.com/assureplan?ref=yourRefID',
      details: {
        description: 'AssurePlan Essentials is specially designed for home appliances, offering on-site service for breakdowns. With instant activation, your appliances are protected from day one.',
        coverage: [
          'Mechanical breakdowns',
          'Electrical failures',
          'Motor burnout',
          'Compressor failure',
          'Heating element issues'
        ],
        exclusions: [
          'Cosmetic damage',
          'Accessories and attachments',
          'Routine maintenance',
          'User negligence',
          'Commercial use'
        ],
        claimProcess: 'Call our service center to schedule an on-site technician visit. For smaller appliances that need workshop repair, we provide free pickup and delivery.',
        maxClaim: 'Up to replacement value of appliance, maximum ₹15,000',
        waitingPeriod: 'No waiting period, instant coverage'
      }
    },
    {
      name: 'Gadget Secure Plan',
      price: '₹499/year',
      company: 'PolicyBazaar',
      features: [
        'Covers accidental damage',
        'Screen cracks & water damage',
        'Hassle-free claims process',
      ],
      bestFor: 'Smartphones & Tablets',
      url: 'https://www.policybazaar.com/gadget-insurance',
      details: {
        description: 'Gadget Secure Plan offers complete protection for smartphones and tablets against accidental damage including screen cracks and water damage. Our hassle-free claims process ensures minimal downtime.',
        coverage: [
          'Accidental damage to screen and body',
          'Water and liquid damage',
          'Camera lens damage',
          'Button and port malfunctions',
          'Charging port issues'
        ],
        exclusions: [
          'Theft or loss',
          'Manufacturer defects covered under warranty',
          'Jailbroken or rooted devices',
          'Data loss or recovery',
          'Battery deterioration'
        ],
        claimProcess: 'Submit your claim online and drop your device at any of our 500+ service centers nationwide or opt for doorstep pickup (available in select cities).',
        maxClaim: '₹12,000 per claim, 2 claims per policy period',
        waitingPeriod: '10 days from purchase of policy'
      }
    },
    {
      name: 'Electronics Extended Warranty',
      price: '₹799/year',
      company: 'Digit Insurance',
      features: [
        'Extends warranty by up to 2 years',
        'Free repairs & doorstep service',
        'Covers breakdown after OEM warranty',
      ],
      bestFor: 'High-value Electronics',
      url: 'https://www.godigit.com/electronics-insurance',
      details: {
        description: 'Electronics Extended Warranty picks up where your manufacturer warranty ends, providing up to 2 additional years of coverage for high-value electronics with doorstep service.',
        coverage: [
          'Mechanical and electrical failures post-manufacturer warranty',
          'Component replacements',
          'Circuit board failures',
          'Display issues',
          'Power supply problems'
        ],
        exclusions: [
          'Accidental damage',
          'Software issues',
          'Consumable parts (batteries, filters)',
          'Cosmetic damage',
          'Unauthorized repairs'
        ],
        claimProcess: 'Register your claim online or via phone, and schedule a convenient time for doorstep pickup. For select products, we offer on-site repairs by certified technicians.',
        maxClaim: 'Up to original purchase value of device, maximum ₹50,000',
        waitingPeriod: 'Coverage begins after manufacturer warranty expires'
      }
    },
    {
      name: 'ACKO Mobile Protection',
      price: '₹599/year',
      company: 'ACKO',
      features: [
        'Accidental & liquid damage',
        'One-time screen replacement',
        'Pickup & drop service',
      ],
      bestFor: 'Mobile Phones',
      url: 'https://www.acko.com/mobile-insurance',
      details: {
        description: 'ACKO Mobile Protection focuses specifically on mobile phones, covering accidental and liquid damage with a guaranteed one-time screen replacement and convenient pickup/drop service.',
        coverage: [
          'Accidental drops and impacts',
          'Liquid damage',
          'One free screen replacement',
          'Internal component damage',
          'Camera module failures from accidents'
        ],
        exclusions: [
          'Theft or loss',
          'Normal wear and tear',
          'Software issues and viruses',
          'Manufacturer defects',
          'Unauthorized repairs'
        ],
        claimProcess: 'File a claim through the ACKO app, and schedule a pickup. We repair your device at authorized service centers and return it to your doorstep.',
        maxClaim: '₹15,000 per claim, 1 screen replacement + 1 additional claim per year',
        waitingPeriod: '3 days from purchase of policy'
      }
    },
  ];

  const getRandomRating = () => {
    return (4 + Math.random()).toFixed(1).substring(0, 3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-blue-900 mb-4">Insurance Marketplace</h1>
          <p className="text-xl text-gray-600">
            Protect your <span className="font-semibold text-blue-800">{product}</span> with the perfect coverage plan
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, idx) => {
            const rating = getRandomRating();
            const isExpanded = expandedPlanId === idx;

            return (
              <React.Fragment key={idx}>
                {/* Regular card */}
                {!isExpanded && (
                  <div className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="border-b p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-sm text-blue-600 font-medium">{plan.company}</span>
                          <h2 className="text-2xl font-serif font-bold text-gray-900 mt-1">{plan.name}</h2>
                        </div>
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {plan.bestFor}
                        </div>
                      </div>

                      <div className="mt-4 flex items-end">
                        <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                        <div className="ml-4 flex items-center">
                          <div className="flex text-yellow-400">
                            {'★'.repeat(Math.floor(rating))}
                            {rating % 1 !== 0 ? '☆' : ''}
                            {'☆'.repeat(5 - Math.ceil(rating))}
                          </div>
                          <span className="ml-1 text-gray-600">{rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-medium text-gray-700 mb-3">What's Covered:</h3>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        className="block w-full bg-gradient-to-r from-blue-800 to-indigo-900 text-white text-center py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-colors duration-200 shadow-md"
                        onClick={(e) => handleGetProtected(idx, e)}
                      >
                        Get Protected
                      </button>
                    </div>

                    <div className="bg-gray-50 px-6 py-3 text-center text-sm text-gray-500">
                      30-day money-back guarantee
                    </div>
                  </div>
                )}

                {/* Expanded card - takes full width */}
                {isExpanded && (
                  <div className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden col-span-full">
                    <div className="border-b p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-sm text-blue-600 font-medium">{plan.company}</span>
                          <h2 className="text-2xl font-serif font-bold text-gray-900 mt-1">{plan.name}</h2>
                        </div>
                        <button
                          onClick={(e) => handleGetProtected(idx, e)}
                          className="text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Plan summary banner */}
                      <div className="flex flex-wrap gap-4 mb-8 bg-blue-50 p-6 rounded-xl">
                        <div className="flex-1 min-w-max">
                          <span className="text-sm text-gray-600">Price</span>
                          <p className="text-xl font-bold text-gray-900">{plan.price}</p>
                        </div>
                        <div className="flex-1 min-w-max">
                          <span className="text-sm text-gray-600">Best For</span>
                          <p className="text-xl font-bold text-gray-900">{plan.bestFor}</p>
                        </div>
                        <div className="flex-1 min-w-max">
                          <span className="text-sm text-gray-600">Waiting Period</span>
                          <p className="text-xl font-bold text-gray-900">{plan.details.waitingPeriod}</p>
                        </div>
                        <div className="flex-1 min-w-max">
                          <span className="text-sm text-gray-600">Max Claim</span>
                          <p className="text-xl font-bold text-gray-900">{plan.details.maxClaim}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Plan Description</h3>
                        <p className="text-gray-700 leading-relaxed">{plan.details.description}</p>
                      </div>

                      {/* Coverage and Exclusions */}
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            What's Covered
                          </h3>
                          <ul className="space-y-3 bg-gray-50 p-4 rounded-xl">
                            {plan.details.coverage.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-gray-600">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                            <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            What's Not Covered
                          </h3>
                          <ul className="space-y-3 bg-gray-50 p-4 rounded-xl">
                            {plan.details.exclusions.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-red-500 mr-2">✕</span>
                                <span className="text-gray-600">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Claims Process */}
                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Claims Process</h3>
                        <div className="bg-gray-50 p-6 rounded-xl">
                          <p className="text-gray-700">{plan.details.claimProcess}</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={(e) => handleGetProtected(idx, e)}
                          className="flex-1 bg-white border border-blue-700 text-blue-700 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
                        >
                          Back to Summary
                        </button>
                        <button
                          className="flex-1 bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-colors duration-200 shadow-md"
                        >
                          Buy This Plan
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 px-6 py-4 text-center">
                      <p className="text-sm text-gray-500">
                        30-day money-back guarantee • 24/7 customer support • Instant policy issuance
                      </p>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="mt-12 bg-blue-800 text-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif font-bold mb-4">Need a custom insurance solution?</h2>
          <p className="text-blue-100 mb-6">Our insurance experts can help find the perfect coverage for your specific needs.</p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-white"
            />
            <button className="bg-white text-blue-800 px-6 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200">
              Get Expert Advice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceMarketplace;