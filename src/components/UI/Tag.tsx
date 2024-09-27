import React from "react"

type PropsType = {
    link: string
    name: string
    className?: string | undefined
} 

const Tag: React.FC<PropsType> = ({ link = '#', name, ...props }) => {

    const className = props.className ? props.className : '';
    return (
        <a href={link} className={`
            inline-block 
            py-3 
            px-10 
            bg-dark 
            text-light 
            rounded-full 
            capitalize 
            font-semibold 
            border-2 
            border-solid 
            border-light 
            hover:scale-105 
            transition-all 
            ease-in 
            duration-200 ${className}`}>
            {name}
        </a>
    )
}

export default Tag
