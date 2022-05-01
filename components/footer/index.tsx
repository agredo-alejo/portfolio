import React from 'react'
import ContactForm from './contactForm'
import ContactLinks from './contactLinks'

function Footer() {
    return (
        <footer className="topTriangleClipPath w-full bg-[#555] flex flex-col items-center pt-16 pb-8">
            <h2 className='text-2xl text-white' >Contact</h2>
            <ContactForm />
            <ContactLinks />
        </footer>
    )
}

export default Footer