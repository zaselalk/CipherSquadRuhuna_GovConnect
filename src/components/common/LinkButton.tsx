import React, { FC } from 'react'
import { Link } from 'react-router'
import { Button } from './Button';
interface LinkButtonProps {
    children: React.ReactNode;
    to: string;
    className?: string;
}

export const LinkButton: FC<LinkButtonProps> = ({ to, children, className }) => {
    let buttonClass = `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:shadow-lg"
    transition duration-300 ease-in-out mouser-pointer`;

    if (className) {
        buttonClass += ` ${className}`;
    }
    return (
        <Link className={className} to={to}>
            <Button className='cursor-pointer flex p-5 justify-center items-center'>{children}</Button>
        </Link>
    )
}
