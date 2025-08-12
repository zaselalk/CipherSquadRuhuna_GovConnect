import React, { FC } from "react";
import AdminSidebar from "../admin/AdminSlidebar";

interface DashboardContainerProps {
    children?: React.ReactNode;
    className?: string;
}

export const DashboardContainer: FC<DashboardContainerProps> = ({
    children,
    className,
}) => {
    let containerClass = "flex min-h-screen bg-gray-100";
    if (className) {
        containerClass += ` ${className}`;
    }
    return (
        <>
            <div className="flex flex-row">
                <div className="md:w-1/6">
                    <AdminSidebar />
                </div>
                <div className="md:w-5/6 p-12">
                    {children}

                </div>
            </div>
        </>
    );
};
