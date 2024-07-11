'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState('');
  const [github, setGithub] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [githubAccessToken, setGithubAccessToken] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    setErrorMessage('');

    // Client-side validation
    if (!name || !email || !password || !github) {
      setErrorMessage('Please fill all the fields.');
      setCreatingUser(false);
      return;
    }

    if (password.length < 5) {
      setErrorMessage('Password must be at least 5 characters long.');
      setCreatingUser(false);
      return;
    }

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, github, githubAccessToken }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
      const errorData = await response.json();
      setErrorMessage(errorData.message || 'An error occurred. Please try again.');
    }
    setCreatingUser(false);
  }

  return (
    <div className="loginMain grid grid-cols-2 mt-20">
      <div className="logindiv pl-40">
        <h1 className="text-center text-3xl font-semibold text-white ">
          Welcome to <br />
          <span className="text-6xl font-bold text-purple-500">Status Quo</span>
        </h1>
        <section className="mt-8">
          <h1 className="text-center text-primary text-4xl mb-4">
            Register
          </h1>
          {userCreated && (
            <div className="my-4 text-center text-white">
              User created.<br />
              Now you can{' '}
              <Link className="underline" href={'/login'}>Login &raquo;</Link>
            </div>
          )}
          {error && (
            <div className="my-4 text-center text-white">
              {errorMessage || 'You have already registered.'}
            </div>
          )}

          {errorMessage && !error && (
            <div className="my-4 text-center text-white">
              {errorMessage}
            </div>
          )}

          <form className="block text-black max-w-xs mx-auto" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Name"
              disabled={creatingUser}
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              disabled={creatingUser}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              disabled={creatingUser}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="GitHub Email"
              disabled={creatingUser}
              value={github}
              onChange={e => setGithub(e.target.value)}
            />
            <p className="text-white">If Private?</p>
            <input
              type="text"
              placeholder="GitHub Access Token"
              disabled={creatingUser}
              value={githubAccessToken}
              onChange={e => setGithubAccessToken(e.target.value)}
            />
            <button type="submit" disabled={creatingUser} className="bg-blue-700 text-white font-semibold">
              Register
            </button>
            <div className="text-center my-4 text-white border-t pt-4">
              Already have an account?{' '}
              <Link className="underline text-blue-700" href={'/login'}>Login here &raquo;</Link>
            </div>
          </form>
        </section>
      </div>
      <div className="image flex items-center justify-start">
        <Image className="rounded-xl" src={'/RegisterImage.jpg'} alt={"RegisterImage"} width={550} height={600}></Image>
      </div>
    </div>
  );
}

/*
'use client'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
export default function Register(){
  const [name,setName]=useState('');
  const [github,setGithub]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [githubAccessToken, setGithubAccessToken] = useState('');
  const [error, setError] = useState(false);
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({email, password,name,github,githubAccessToken}),
      headers: {'Content-Type': 'application/json'},
    });

    
    if (response.ok) {
      setUserCreated(true);
    }
    else {
      setError(true);
    }
    setCreatingUser(false);
  }
    return(
        <div className="loginMain grid grid-cols-2 mt-20">
            <div className="logindiv pl-40">    
                <h1 className="text-center text-3xl font-semibold text-white ">Welcome to <br /><span className="text-6xl font-bold text-purple-500">Status Quo</span></h1>
                <section className="mt-8 " >
                    <h1 className="text-center text-primary text-4xl mb-4">
                    Register
                    </h1>
                    {userCreated && (
                    <div className="my-4 text-center text-white ">
                    User created.<br />
                    Now you can{' '}
                    <Link className="underline" href={'/login'}>Login &raquo;</Link>
                    </div>
                    )}
                    {error && (
                    <div className="my-4 text-center text-white">
                   You have already registered.<br />
                    </div>
                    )}

                    <form  className=" block text-black max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                        <input type="text" placeholder="Name"  disabled={creatingUser} value={name} onChange={e=> setName(e.target.value)}/>
                        <input type="email" placeholder="Email" disabled={creatingUser} value={email} onChange={e=> setEmail(e.target.value)}  />
                        <input type="password" placeholder="password" disabled={creatingUser} value={password} onChange={e=> setPassword(e.target.value)} />
                        <input type="text" placeholder="Github Email" disabled={creatingUser} value={github} onChange={e=> setGithub(e.target.value)} />
                        <p className="text-white">If Private?</p>
                        <input type="text" placeholder="GitHub Access Token" disabled={creatingUser} value={githubAccessToken} onChange={e => setGithubAccessToken(e.target.value)} />
                        <button type="submit" disabled={creatingUser}  className="bg-blue-700 text-white font-semibold">Register</button>
                        <div className="text-center my-4 text-white border-t pt-4">
                            Already have an account?{' '}
                            <Link className="underline text-blue-700" href={'/login'}>Login here &raquo;</Link>
                        </div>
                    </form>
                </section>  

            </div>
            <div className="image flex items-center justify-start ">
                <Image className="rounded-xl" src={'/RegisterImage.jpg'} alt={"RegisterImage"} width={550} height={600}></Image>
            </div>

        </div>
    )
}*/
 /*
'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState('');
  const [github, setGithub] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [githubAccessToken, setGithubAccessToken] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    setErrorMessage('');

    // Client-side validation
    if (!name || !email || !password || !github) {
      setErrorMessage('Please fill all the fields.');
      setCreatingUser(false);
      return;
    }

    if (password.length < 5) {
      setErrorMessage('Password must be at least 5 characters long.');
      setCreatingUser(false);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, name, github, githubAccessToken }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setUserCreated(true);
      } else {
        const errorData = await response.json();
        setError(true);
        setErrorMessage(errorData.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setError(true);
      setErrorMessage('Failed to communicate with the server. Please try again later.');
    }

    setCreatingUser(false);
  }

  return (
    <div className="loginMain grid grid-cols-2 mt-20">
      <div className="logindiv pl-40">
        <h1 className="text-center text-3xl font-semibold text-white ">
          Welcome to <br />
          <span className="text-6xl font-bold text-purple-500">Status Quo</span>
        </h1>
        <section className="mt-8">
          <h1 className="text-center text-primary text-4xl mb-4">
            Register
          </h1>
          {userCreated && (
            <div className="my-4 text-center text-white">
              User created.<br />
              Now you can{' '}
              <Link className="underline" href={'/login'}>Login &raquo;</Link>
            </div>
          )}
          {error && (
            <div className="my-4 text-center text-white">
              {errorMessage || 'An error occurred. Please try again.'}
            </div>
          )}
          {errorMessage && !error && (
            <div className="my-4 text-center text-white">
              {errorMessage}
            </div>
          )}

          <form className="block text-black max-w-xs mx-auto" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Name"
              disabled={creatingUser}
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              disabled={creatingUser}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              disabled={creatingUser}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="GitHub Email"
              disabled={creatingUser}
              value={github}
              onChange={e => setGithub(e.target.value)}
            />
            <p className="text-white">If Private?</p>
            <input
              type="text"
              placeholder="GitHub Access Token"
              disabled={creatingUser}
              value={githubAccessToken}
              onChange={e => setGithubAccessToken(e.target.value)}
            />
            <button type="submit" disabled={creatingUser} className="bg-blue-700 text-white font-semibold">
              Register
            </button>
            <div className="text-center my-4 text-white border-t pt-4">
              Already have an account?{' '}
              <Link className="underline text-blue-700" href={'/login'}>Login here &raquo;</Link>
            </div>
          </form>
        </section>
      </div>
      <div className="image flex items-center justify-start">
        <Image className="rounded-xl" src={'/RegisterImage.jpg'} alt={"RegisterImage"} width={550} height={600} />
      </div>
    </div>
  );
}*/
