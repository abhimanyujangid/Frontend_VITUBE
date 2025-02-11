import React from "react";

interface ContainerProps {
    children: React.ReactNode;
}

function Container({ children }: ContainerProps) {
    return <div className="w-full sm:px-2">{children}</div>;
}

export default Container;
