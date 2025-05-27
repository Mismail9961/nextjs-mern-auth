'use client'
import React, { useState, FormEvent } from 'react'
import axios from 'axios'

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setMessage('')
    setError('')
    setIsLoading(true)

    try {
      const response = await axios.post('/api/users/forgotpassword', { email })

      if (response.status === 200) {
        setMessage('Password reset email sent successfully. Please check your inbox.')
        setEmail('')
      } else {
        setError(response.data.error || 'Something went wrong. Please try again.')
      }
    } catch (err: any) {
      setError(
        err.response?.data?.error || 'Failed to connect to the server. Please try again later.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Forgot Password
        </h2>
        <p className="text-gray-600 mb-4 text-center">
          Enter your email address to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          {message && (
            <p className="text-green-500 text-sm text-center">{message}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword