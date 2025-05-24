"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

const VerifyEmailPage = () => {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const verifyUserEmail = async () => {
    try {
        setLoading(true);
        await axios.post('/api/users/verifyusers', { token });
        setVerified(true);
    } catch (error: any) {
        setError(true);

        // Improved error logging
        if (axios.isAxiosError(error)) {
            console.error("Axios Error:", error.response?.data || error.message);
        } else {
            console.error("Unexpected Error:", error);
        }
    } finally {
        setLoading(false);
    }
};


    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-4xl mb-4'>Verify Email</h1>

            <h2 className='p-2 bg-orange-500 text-black rounded'>
                {token ? `Token: ${token}` : "No token found in URL"}
            </h2>

            {loading && <p className='mt-4 text-blue-500'>Verifying your email...</p>}

            {verified && !loading && (
                <div className='mt-6 text-green-600 text-center'>
                    <h2 className='text-2xl font-semibold'>Email Verified Successfully!</h2>
                    <Link href="/login" className='mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
                        Go to Login
                    </Link>
                </div>
            )}

            {error && !loading && (
                <div className='mt-6 text-center'>
                    <h2 className='text-2xl bg-red-600 text-white px-4 py-2 rounded'>Verification Failed</h2>
                    <p className='text-red-500 mt-2'>Invalid or expired token.</p>
                </div>
            )}
        </div>
    )
}

export default VerifyEmailPage
