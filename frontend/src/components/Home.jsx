import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Shield, Wrench, Clock, FileText, Upload, Check, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <PricingSection />
      <FAQ />
      <CallToAction />
    </div>
  );
};

export default Home;

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 text-white py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-400"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-300"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-purple-400"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Never Lose Track of Your <span className="text-blue-300">Assets</span> Again
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed">
            AssetGuard helps you manage warranties, service dates, and insurance for all your household items in one place.
          </p>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center">
            <Link to="/signup" className="bg-white text-blue-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-100 transition-colors duration-200 shadow-lg">
              Get Started
            </Link>
            <Link to="/about" className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-colors duration-200">
              Learn More
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
              <div className="flex justify-center mb-4">
                <FileText size={36} className="text-blue-300" />
              </div>
              <h3 className="text-xl font-medium mb-2">Track Warranties</h3>
              <p className="text-blue-100">Upload bills and track warranty periods for all your household items.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
              <div className="flex justify-center mb-4">
                <Bell size={36} className="text-blue-300" />
              </div>
              <h3 className="text-xl font-medium mb-2">Timely Reminders</h3>
              <p className="text-blue-100">Get notifications before warranties expire or service dates approach.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
              <div className="flex justify-center mb-4">
                <Shield size={36} className="text-blue-300" />
              </div>
              <h3 className="text-xl font-medium mb-2">Insurance Options</h3>
              <p className="text-blue-100">Explore extended coverage options when your warranties expire.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">All Your Assets in One Place</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simplify your life by managing all your household items and their maintenance in a single platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mb-6 mx-auto">
              <Upload className="text-blue-800" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Easy Documentation</h3>
            <p className="text-gray-600 text-center">
              Upload purchase bills and warranty cards with a simple photo snap or document upload.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mb-6 mx-auto">
              <Clock className="text-blue-800" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Service Reminders</h3>
            <p className="text-gray-600 text-center">
              Never miss a service date with customized reminders for all your devices and appliances.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mb-6 mx-auto">
              <Wrench className="text-blue-800" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Instant Support</h3>
            <p className="text-gray-600 text-center">
              Raise complaints directly through our platform when your devices break down or malfunction.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mb-6 mx-auto">
              <Shield className="text-blue-800" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Extended Protection</h3>
            <p className="text-gray-600 text-center">
              Get tailored insurance recommendations when your original warranties expire.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Managing your assets has never been easier with our simple 4-step process.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute left-1/2 top-24 h-2/3 w-1 bg-blue-200 -translate-x-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative">
            <div className="relative">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl absolute -left-6 md:left-auto md:right-0 md:-translate-x-1/2 z-10">1</div>
              <div className="bg-white p-8 rounded-xl shadow-lg ml-8 md:mr-8 md:ml-0 relative">
                <h3 className="text-2xl font-semibold mb-4">Register Your Items</h3>
                <p className="text-gray-600">
                  Add your TV, refrigerator, scooter, or any household item by taking a photo of the bill or warranty card.
                </p>
              </div>
            </div>

            <div className="relative md:translate-y-32">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl absolute -left-6 md:left-0 md:-translate-x-1/2 z-10">2</div>
              <div className="bg-white p-8 rounded-xl shadow-lg ml-8 relative">
                <h3 className="text-2xl font-semibold mb-4">Get Notifications</h3>
                <p className="text-gray-600">
                  Receive timely alerts for upcoming service dates and warranty expirations through email or mobile notifications.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl absolute -left-6 md:left-auto md:right-0 md:-translate-x-1/2 z-10">3</div>
              <div className="bg-white p-8 rounded-xl shadow-lg ml-8 md:mr-8 md:ml-0 relative">
                <h3 className="text-2xl font-semibold mb-4">Quick Support Access</h3>
                <p className="text-gray-600">
                  When something breaks down, raise a complaint through our app with a single click to get quick assistance.
                </p>
              </div>
            </div>

            <div className="relative md:translate-y-32">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl absolute -left-6 md:left-0 md:-translate-x-1/2 z-10">4</div>
              <div className="bg-white p-8 rounded-xl shadow-lg ml-8 relative">
                <h3 className="text-2xl font-semibold mb-4">Extend Protection</h3>
                <p className="text-gray-600">
                  Review and select from curated insurance options to keep your items protected beyond the manufacturer's warranty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "This app saved me thousands when my TV broke down just days after the warranty expired. I had forgotten about it, but AssetGuard reminded me and helped me claim on the extended warranty I purchased through them.",
      author: "Rahul M.",
      title: "Delhi"
    },
    {
      quote: "I used to keep all my bills in a drawer and would never find them when needed. Now everything is digitized and I get timely reminders for servicing my AC and refrigerator.",
      author: "Priya S.",
      title: "Mumbai"
    },
    {
      quote: "The complaint raising feature is fantastic! When my washing machine broke down, I just clicked a button and they connected me directly with the service center. No more searching for contact numbers or waiting on hold.",
      author: "Vijay K.",
      title: "Bangalore"
    }
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who have simplified their asset management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-blue-500 mb-4 text-4xl">"</div>
              <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-800 font-semibold">{testimonial.author[0]}</span>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white border border-gray-200 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Basic</h3>
              <div className="text-4xl font-bold mb-4">Free</div>
              <p className="text-gray-600 mb-6">Perfect for individuals with few items</p>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <Check size={20} className="text-green-500 mr-3" />
                <span>Track up to 5 items</span>
              </div>
              <div className="flex items-center">
                <Check size={20} className="text-green-500 mr-3" />
                <span>Basic warranty reminders</span>
              </div>
              <div className="flex items-center">
                <Check size={20} className="text-green-500 mr-3" />
                <span>Email notifications</span>
              </div>
            </div>
            <Link to="/signup" className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors duration-200 w-full">
              Get Started
            </Link>
          </div>

          <div className="bg-blue-600 text-white p-8 rounded-xl shadow-lg transform md:-translate-y-4 scale-105">
            <div className="text-center">
              <span className="bg-blue-400 text-white text-sm py-1 px-3 rounded-full inline-block mb-4">MOST POPULAR</span>
              <h3 className="text-xl font-semibold mb-2">Premium</h3>
              <div className="text-4xl font-bold mb-4">₹149<span className="text-xl font-normal">/month</span></div>
              <p className="text-blue-100 mb-6">For households with multiple devices</p>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <Check size={20} className="text-blue-300 mr-3" />
                <span>Unlimited items</span>
              </div>
              <div className="flex items-center">
                <Check size={20} className="text-blue-300 mr-3" />
                <span>Priority customer support</span>
              </div>
              <div className="flex items-center">
                <Check size={20} className="text-blue-300 mr-3" />
                <span>Service booking assistance</span>
              </div>
              <div className="flex items-center">
                <Check size={20} className="text-blue-300 mr-3" />
                <span>Discounted insurance offers</span>
              </div>
            </div>
            <Link to="/signup-premium" className="block text-center bg-white hover:bg-blue-100 text-blue-800 py-3 px-6 rounded-lg font-medium transition-colors duration-200 w-full">
              Get Premium
            </Link>
          </div>

          <div className="bg-white border border-gray-200 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Family</h3>
              <div className="text-4xl font-bold mb-4">₹249<span className="text-xl font-normal">/month</span></div>
              <p className="text-gray-600 mb-6">For multiple family members</p>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <Check size={20} className="text-green-500 mr-3" />
                <span>All Premium features</span>
              </div>
              <div className="flex items-center">
                <Check size={20} className="text-green-500 mr-3" />
                <span>Up to 5 family accounts</span>
              </div>
              <div className="flex items-center">
                <Check size={20} className="text-green-500 mr-3" />
                <span>Dedicated relationship manager</span>
              </div>
              <div className="flex items-center">
                <Check size={20} className="text-green-500 mr-3" />
                <span>Best insurance rates</span>
              </div>
            </div>
            <Link to="/signup-family" className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors duration-200 w-full">
              Get Family Plan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "How do I add my devices to the platform?",
      answer: "Simply take a photo of your bill or warranty card using our app. Our system will automatically extract key information like purchase date, warranty period, and service schedules."
    },
    {
      question: "What types of items can I track?",
      answer: "You can track any household item with a warranty or service requirement - TVs, refrigerators, washing machines, air conditioners, vehicles, laptops, mobile phones, and more."
    },
    {
      question: "How do the service reminders work?",
      answer: "Based on manufacturer recommendations and your usage patterns, we'll send you notifications when it's time for routine maintenance. You can customize when and how you receive these alerts."
    },
    {
      question: "What happens when my warranty expires?",
      answer: "We'll notify you before expiration and provide curated extended warranty or insurance options from our partner providers that offer good value and coverage."
    },
    {
      question: "How do I raise a complaint when my device breaks down?",
      answer: "Simply open the app, select the device having issues, and click 'Raise Complaint'. You'll be connected with authorized service centers or our support team will assist you directly."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="py-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-900">{faq.question}</h3>
              </div>
              <p className="mt-3 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-800 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Simplify Your Asset Management?</h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Join thousands of users who have reduced stress and saved money by keeping their warranties and service schedules organized.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link to="/signup" className="bg-white text-blue-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-100 transition-colors duration-200 shadow-lg inline-flex items-center justify-center">
            Get Started <ArrowRight size={20} className="ml-2" />
          </Link>
          <Link to="/demo" className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-colors duration-200 inline-flex items-center justify-center">
            Watch Demo
          </Link>
        </div>
      </div>
    </section>
  );
};