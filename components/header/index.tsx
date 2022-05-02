import React, { MouseEventHandler } from 'react'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

interface HeaderProps {
    scroll: MouseEventHandler<HTMLButtonElement>
}
function Header({ scroll }: HeaderProps) {
    return (
        <header className='relative w-full h-screen flex flex-col justify-center items-center text-[#eee]'>
            <span className='w-[90%] max-w-md'>
                <h1 className='w-full text-4xl'>
                    Hi, I am Alejandro Agredo
                </h1>
                <p className='w-full text-xl'>
                    A web developer fascinated by problem-solving and creating interactive graphic interfaces
                </p>
            </span>
            <button onClick={scroll}
                className='border-none mt-4 bg-[#80808080] hover:shadow-[0_0_.2rem_#808080] rounded-full flex p-1'>
                <KeyboardDoubleArrowDownIcon />
            </button>

        </header>
    )
}

export default Header