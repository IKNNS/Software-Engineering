interface Props {
    className?: string;
    children?: React.ReactNode;
}


const PageCenter: React.FC<Props> = ({ children, className }) => {

    return (
        <div className={`flex flex-col justify-center items-center w-full h-screen overflow-auto ${className}`}>
            {children}
        </div>
    )
}

const PageStart: React.FC<Props> = ({ children, className }) => {

    return (
        <div className={`flex flex-col justify-start items-center w-full h-screen overflow-auto ${className}`}>
            {children}
        </div>
    )
}

const PageEnd: React.FC<Props> = ({ children, className }) => {

    return (
        <div className={`flex flex-col justify-end items-center w-full h-screen overflow-auto ${className}`}>
            {children}
        </div>
    )
}

const PageBetween: React.FC<Props> = ({ children, className }) => {

    return (
        <div className={`flex flex-col justify-between items-center w-full h-screen overflow-auto ${className}`}>
            {children}
        </div>
    )
}

export { PageCenter, PageStart, PageEnd, PageBetween };