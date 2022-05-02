import Image from 'next/image'
import React from 'react'
import ProjectInfo, { ProjectProps } from './projectInfo'



function Project({ project }: ProjectProps) {
    return (
        <div className='flex flex-col items-center w-4/5 mb-4 sm:flex-row sm:justify-center sm:items-start sm:mb-14'>
            <div className='relative pr-[3vw] mb-8 sm:mb-0 '>
                <span className='drop-shadow-[.1rem_.1rem_.1rem_#222] hover:scale-[1.01] w-[50vw] sm:w-[21vw] h-[30vw] sm:h-[13vw] flex'>

                    <Image
                        src={project.desk}
                        alt="monitor preview"
                        priority
                        objectFit='contain'
                        layout='fill'
                    />
                </span>
                <span className='drop-shadow-[.1rem_.1rem_.1rem_#222] hover:scale-[1.01] absolute  right-0 bottom-[-5vw] aspect-[13/25] w-[13vw] sm:w-[7vw]'>
                    <Image
                        src={project.phone}
                        alt="mobile preview"
                        priority
                        objectFit='contain'
                        layout='fill'
                    />
                </span>
            </div>

            <ProjectInfo project={project} />
        </div>
    )
}

export default Project