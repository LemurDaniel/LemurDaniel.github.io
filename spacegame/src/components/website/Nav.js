import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const navigations = [
    {
        title: 'Spacegame',
        url: '/'
    },
]


const Nav = () => {

    const [path, setPath] = useState(window.location.pathname);


    return (

        <nav className="px-5 py-1 fixed w-full top-0 z-50 border-b border-brand2-100 bg-dark-700 flex justify-evenly text-white font-bold">

            {navigations.map((nav, i) => (
                <Link key={i} to={nav.url} onClick={ e => setPath(nav.url) }
                    className={"py-1 hover:underline " + (nav.url === path ? "text-brand2-100" : "")} >
                    {nav.title}
                </Link>
            ))}

        </nav>


    )

}

export default Nav;