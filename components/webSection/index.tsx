import React, { RefObject } from 'react'
import WebProject from './project'
import webProjects from './webProjects'

interface WebSectionProps {
    scrollRef: RefObject<HTMLElement>
}
function WebSection({ scrollRef }: WebSectionProps) {



    return (
        <section ref={scrollRef} className="flex flex-col items-center pt-4 gap-y-12">
            {webProjects.map((project, key: number) => (
                <WebProject key={key} project={project} />
            ))}
        </section>
    )
}

export default WebSection