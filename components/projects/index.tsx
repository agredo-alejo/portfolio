import Image from 'next/image'
import React, { useState } from 'react'
import Modal from '../../utils/modal'
import ProjectCategory from './projectCategory'
import projectCategories from './projects'

function Projects() {
    const [category, setCategory] = useState<number | null>(null)

    const handleClose = () => {
        setCategory(null)
    }

    return (<div className='relative z-20'>
        <Modal handleClose={handleClose} show={category !== null}>
            <ProjectCategory projectCategory={projectCategories[category as number]} />
        </Modal>
        <div className='flex flex-col items-center'>
            <h2 className='mb-8 text-2xl text-white'>Projects</h2>
            <div className='grid grid-cols-2 place-content-center gap-x-[20vw] gap-y-12 max-w-[90%] mb-12 drop-shadow-[.1rem_.1rem_.1rem_#111] sm:flex sm:gap-4'>

                {projectCategories.map((category, key) => (
                    <div key={key} onClick={() => setCategory(key)}
                        className="hexagon flex cursor-pointer justify-center items-center bg-[#454545] hover:bg-[#555] aspect-square w-[25vw] sm:w-[10vw] ">
                        <span className='relative w-[35%] aspect-square'>

                            <Image
                                objectFit='contain'
                                layout='fill'
                                src={`/${category[0].category}.png`}
                                alt=""
                            />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>)
}

export default Projects