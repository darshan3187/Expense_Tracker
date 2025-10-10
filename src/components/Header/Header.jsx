import React from 'react'
// import { LogoutBtn } from './LogoutBtn'
import { Link } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import Logo from '../Logo'

function Header() {

    return (
        <div className="flex justify-between items-center border-b-2 border-white sm:p-4 p-2">
            <div className='flex justify-between items-center'>
                <Logo />
                <h1 className="m-2 text-white lg:text-2xl text-xl">Expense Tracker</h1>
            </div>
                <LogoutBtn />
        </div>
    )
}

export default Header




