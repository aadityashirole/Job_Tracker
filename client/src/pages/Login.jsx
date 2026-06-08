import { useState } from "react"
function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleLogin() {
    console.log("Email:", email)
    console.log("Password:", password)
  }
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">

      {/* Glow Effect Background */}
      <div className="absolute w-96 h-96 bg-blue-600 opacity-10 rounded-full blur-3xl top-20 left-1/2 -translate-x-1/2"></div>

      <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10">

        {/* Logo + Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-xl font-bold">JT</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-gray-500 mt-1 text-sm">Sign in to your Job Tracker account</p>
        </div>

        {/* Form */}
        <div className="space-y-4">

          <div>
            <label className="text-gray-400 text-sm font-medium">Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg mt-1 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600 text-sm"
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="text-gray-400 text-sm font-medium">Password</label>
              <span className="text-blue-400 text-xs cursor-pointer hover:underline">Forgot password?</span>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg mt-1 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600 text-sm"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg mt-2 transition duration-200 text-sm tracking-wide"
          >
            Sign in →
          </button>

        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-800"></div>
          <span className="text-gray-600 text-xs px-3">or continue with</span>
          <div className="flex-1 border-t border-gray-800"></div>
        </div>

        {/* Google Button */}
        <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-medium py-3 rounded-lg transition duration-200 text-sm flex items-center justify-center gap-2">
          <span>G</span> Sign in with Google
        </button>

        {/* Footer */}
        <p className="text-gray-600 text-center text-xs mt-6">
          Don't have an account?{" "}
          <span className="text-blue-400 cursor-pointer hover:underline">
            Create one free
          </span>
        </p>

      </div>
    </div>
  )
}

export default Login