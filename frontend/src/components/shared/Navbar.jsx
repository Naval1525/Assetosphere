import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Assetosphere</h1>
        <nav className="space-x-4 text-gray-700">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/login" className="hover:text-blue-600">Login</Link>
          <Link to="/signup" className="hover:text-blue-600">Signup</Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
