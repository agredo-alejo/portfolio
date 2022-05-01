import React, { FormEvent, useRef } from 'react'
import emailjs from "@emailjs/browser"

function ContactForm() {
    const form = useRef<HTMLFormElement>(null)

    const sendEmail = async (e: FormEvent) => {
        e.preventDefault()
        if (!form.current) return

        try {
            await emailjs.sendForm(
                process.env.NEXT_PUBLIC_SERVICE_ID || "",
                process.env.NEXT_PUBLIC_TEMPLATE_ID || "",
                form.current,
                process.env.NEXT_PUBLIC_PUBLIC_KEY
            )
        } catch (error) {
            console.error(error)
        }
        form.current.reset()
    }

    return (
        <form ref={form}
            id="contactForm"
            className='flex flex-col max-w-xl mt-4 w-80'
            onSubmit={sendEmail} >

            <div className="inputBox">
                <input required autoComplete="off" type="text" id="name" name="name" placeholder="Name" className="inputs" />
            </div>
            <div className="inputBox">
                <input required autoComplete="off" type="text" name="user_email" id="user_email" placeholder="Email" className="inputs" />
            </div>
            <div className="inputBox">
                <textarea required
                    className="resize-y inputs h-28"
                    autoComplete="off"
                    name="message" id="message"
                    placeholder="Message"
                ></ textarea>
            </div>

            <div className='w-full'>
                <button id="submit"
                    className='float-right p-2 text-white bg-transparent border-none cursor-pointer customShadow'
                    type="submit">Submit</button>
            </div>


        </form>
    )
}

export default ContactForm
