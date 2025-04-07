const Signup = () => {
    return (
      <section className="max-w-md mx-auto mt-12 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-6">Create Account</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Name" className="w-full p-3 border rounded" />
          <input type="email" placeholder="Email" className="w-full p-3 border rounded" />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded" />
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
            Sign Up
          </button>
        </form>
      </section>
    )
  }

  export default Signup
