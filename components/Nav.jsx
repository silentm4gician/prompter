'use client'

import Image from "next/image"
import Link from "next/link"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useEffect, useState } from "react"

const Nav = () => {
    const {data : session} = useSession()
    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const setProv = async () => {
            const res = await getProviders()

            setProviders(res)
        }

        setProv()
    }, [])

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href={'/'} className="flex gap-2 flex-center">
                <Image
                    src={'/assets/images/logo.svg'}
                    alt="prompter logo"
                    width={50}
                    height={50}
                    className="object-contain"
                />
                <p className="logo_text">Prompter</p>
            </Link>

            {/* {alert(session?.user)} */}
            {/*  desktop nav  */}
            <div className="sm:flex hidden">
                {session?.user
                    ?
                    <div className="flex gap-3 md:gap-5">
                        <Link href={'/create-prompt'} className="black_btn">
                            Create Prompt
                        </Link>
                        <button type="button" onClick={signOut} className="outline_btn">
                            sign out
                        </button>
                        <Link href={'/profile'}>
                            <Image
                                src={session?.user.image}
                                alt="user profile pic"
                                width={37}
                                height={37}
                                className="rounded-full"
                            />
                        </Link>
                    </div>
                    :
                    <div>
                        {providers &&
                            Object.values(providers).map((provider) =>
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    sign in
                                </button>)
                        }
                    </div>
                }
            </div>

            {/* mobile nav */}

            <div className="sm:hidden flex relative">
                {session?.user.image
                    ?
                    <div className="flex">
                        <Image
                            src={session?.user.image}
                            alt="user profile pic"
                            width={37}
                            height={37}
                            className="rounded-full"
                            onClick={() => setToggleDropdown((prev)=> !prev)}
                        />

                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href={'/profile'}
                                    className="dropdown_link"
                                    onClick={()=>setToggleDropdown(false)}
                                >
                                    my profile
                                </Link>
                                <Link
                                    href={'/create-prompt'}
                                    className="dropdown_link"
                                    onClick={()=>setToggleDropdown(false)}
                                >
                                    create prompt
                                </Link>
                                <button
                                    type="button"
                                    onClick={()=>
                                        {
                                            setToggleDropdown(false)
                                            signOut()
                                        }}
                                    className="mt-5 w-full black_btn"
                                > sign out</button>
                            </div>
                        )}
                    </div>
                    :
                    <div>
                        {providers &&
                            Object.values(providers).map((provider) =>
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    sign in
                                </button>)
                        }
                    </div>
                }
            </div>
        </nav>
    )
}

export default Nav