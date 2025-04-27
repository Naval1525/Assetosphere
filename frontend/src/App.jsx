import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import BillUpload from "./components/BillUpload";
import BillList from "./components/BillList";
import InsuranceMarketplace from "./components/InsuranceMarketplace";
import Dashboard from "./components/Dashboard";
import CompanyRegister from "./components/auth/CompanyRegister";
import CompanyLogin from "./components/auth/CompanyLogin";
import CompanyDashboard from "./components/CompanyDashBoard";
import PlanPurchase from "./components/PlanPurchase";
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/uploadbill" element={<BillUpload />} />
            <Route path="/billlist" element={<BillList />} />
            <Route path="/insurance" element={<InsuranceMarketplace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/company/register" element={<CompanyRegister />} />
            <Route path="/company/login" element={<CompanyLogin />} />
            <Route path="/company/dashboard" element={<CompanyDashboard />} />
            <Route path="/company/plans/:planId" element={<PlanPurchase />} />
            <Route path="/purchase" element={<PlanPurchase />} />
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
