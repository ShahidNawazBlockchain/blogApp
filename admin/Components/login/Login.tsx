'use client'
import React, { ChangeEvent, FormEvent, useEffect, useLayoutEffect, useState } from 'react'
import './Login.css'
import useAuthStore from '@/zustand/useAuthStore'
import { useRouter } from 'next/navigation'

const Login = () => {
    const router = useRouter()
    

    const { login } = useAuthStore()
    const [loginData, setloginData] = useState<any>({
        email: "",
        password: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setloginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(loginData)
        router.push('/dashboard')


    }
    return (
        <div>
            <form className="login wrap" onSubmit={handleSubmit}>
                <div className="h1">Login</div>
                <input pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" placeholder="Email" id="email" name="email" type="text" onChange={handleChange} />
                <input placeholder="Password" id="password" name="password" type="password" onChange={handleChange} />
                <input value="Login" className="btn" type="submit" />
            </form>
        </div>
    )
}

export default Login