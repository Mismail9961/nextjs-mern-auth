'use client'
import React, { useState, FormEvent } from 'react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

const ResetPassword = () => {
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Get token and email from URL query parameters
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setMessage('')
    setError('')
    setIsLoading(true)


    if (password.length < 8) {
      setError('Password must be at least 8 characters long.')
      setIsLoading(false)
      return
    }

    try {
      const response = await axios.post('/api/reset-password', {
        email,
        newPassword: password,
      })

      if (response.status === 200) {
        setMessage('Password reset successfully. You can now log in with your new password.')
        setPassword('')
        setConfirmPassword('')
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
          Reset Password
        </h2>
        <p className="text-gray-600 mb-4 text-center">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm new password"
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
            disabled={isLoading || !token || !email}
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isLoading || !token || !email ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword