/*'use client'
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function Login(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loginProgress,setLoginProgress]=useState(false);
    async function handleFormSubmit(ev){
        ev.preventDefault();
        setLoginProgress(true);
        await signIn('credentials',{email,password,callbackUrl:'/dashboard'})
        setLoginProgress(false);
    }
    return (
        <div className="loginMain grid grid-cols-2 mt-20 mb-10">
            <div className="image flex items-center justify-end ">
                <Image className="rounded-xl" src={'/LoginImage.jpg'} alt={"loginImage"} width={500} height={500}></Image>
            </div>
            <div className="logindiv pt-8 pr-40">
                <h1 className="text-6xl  text-center font-semibold  text-purple-500">Login</h1>
                <section className="mt-8 " >
                    <form  className=" block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                        
                        <input type="email" placeholder="Email" disabled={loginProgress}  value={email } onChange={ev=> setEmail(ev.target.value)} className="text-black"/>
                        <input type="password" placeholder="password" disabled={loginProgress} value={password} onChange={ev=> setPassword(ev.target.value)} className="text-black"/>
                        <button disabled={loginProgress} type="submit" className="bg-blue-700 text-white font-semibold">Login</button>
                        <div className="text-center my-4 text-white border-t pt-4">
                            Dont Have an account?{' '}
                            <Link className="underline text-blue-700" href={'/register'}>Register here &raquo;</Link>
                        </div>
                    </form>
                </section>  

            </div>

        </div>
    )
} */
'use client'
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginProgress, setLoginProgress] = useState(false);
    const [error, setError] = useState('');

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setLoginProgress(true);
        setError('');

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
            callbackUrl: '/dashboard'
        });

        setLoginProgress(false);

        if (result.error) {
            if (result.status === 401) {
                setError('Invalid email or password.');
            } else if (result.status === 404) {
                setError('Email not registered. Please register before logging in.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } else {
            window.location.href = result.url;  // Redirect to dashboard if login is successful
        }
    }

    return (
        <div className="loginMain grid grid-cols-2 mt-20 mb-10">
            <div className="image flex items-center justify-end">
                <Image className="rounded-xl" src={'/LoginImage.jpg'} alt={"loginImage"} width={500} height={500}></Image>
            </div>
            <div className="logindiv pt-8 pr-40">
                <h1 className="text-6xl text-center font-semibold text-purple-500">Login</h1>
                <section className="mt-8">
                    {error && (
                        <div className="my-4 text-center text-red-500">
                            {error}
                        </div>
                    )}
                    <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            disabled={loginProgress}
                            value={email}
                            onChange={ev => setEmail(ev.target.value)}
                            className="text-black"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            disabled={loginProgress}
                            value={password}
                            onChange={ev => setPassword(ev.target.value)}
                            className="text-black"
                        />
                        <button disabled={loginProgress} type="submit" className="bg-blue-700 text-white font-semibold">
                            Login
                        </button>
                        <div className="text-center my-4 text-white border-t pt-4">
                            Don't have an account?{' '}
                            <Link className="underline text-blue-700" href={'/register'}>Register here &raquo;</Link>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}
