import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const links = [
    {
        link: "mailto:agredoalejo@gmail.com",
        icon: <EmailIcon />
    },
    {
        link: "https://www.linkedin.com/in/alejandro-agredo-portilla/",
        icon: <LinkedInIcon />
    },
    {
        link: "https://github.com/agredo-alejo",
        icon: <GitHubIcon />
    },
    {
        link: "/resume-alejandro-agredo.pdf",
        icon: <AttachFileIcon/>
    }
]

function ContactLinks() {
    return (
        <div className="flex flex-wrap justify-center w-full my-4 text-gray-300">
            {links.map((link, key) => (
                <span key={key}
                    className="flex m-2 hover:text-white hover:drop-shadow-[0_0_.1rem_gray] ">
                    <a
                        href={link.link}
                        target="_blank"
                        rel="noreferrer"
                        className='flex drop-shadow-[.1rem_.1rem_.1rem_#454545]'
                        download={key === 3}
                    >
                        {link.icon}

                    </a>
                </span>
            ))}
        </div>
    )
}

export default ContactLinks
