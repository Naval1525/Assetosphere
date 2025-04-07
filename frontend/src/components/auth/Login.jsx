const Login = () => {
    return (
      <section className="max-w-md mx-auto mt-12 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-3 border rounded" />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded" />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Login
          </button>
        </form>
      </section>
    )
  }

  export default Login
