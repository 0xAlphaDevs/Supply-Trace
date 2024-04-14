"use client"

import { ConnectKitButton } from 'connectkit'
import React from 'react'

const Navbar = () => {
    return (
        <div className='flex justify-between'>
            <p>Navbar</p>
            <ConnectKitButton />
        </div>
    )
}

export default Navbar