import React, { useState } from "react";
import { Controller, Control } from "react-hook-form";
import { FaCamera } from "react-icons/fa";

// Define prop types
interface GetImagePreviewProps {
    name: string;
    control: Control<any>;
    label?: string;
    defaultValue?: string;
    className?: string;
    cameraIcon?: boolean;
    cameraSize?: number;
    image?: string;
}

const GetImagePreview: React.FC<GetImagePreviewProps> = ({
    name,
    control,
    label,
    defaultValue = "",
    className = "w-32 h-32 rounded-full object-cover border border-gray-300",
    cameraIcon = false,
    cameraSize = 24,
    image,
}) => {
    const [preview, setPreview] = useState<string | null>(image || null);

    const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
            return file;
        }
        return null;
    };

    return (
        <div className="w-full flex flex-col items-center space-y-2">
            {label && <label className="text-gray-300 text-sm">{label}</label>}

            <label htmlFor={name} className="cursor-pointer relative group">
                <img
                    src={preview || "/default-avatar.png"} // Fallback image
                    className={`${className} transition-all duration-300 hover:brightness-75`}
                    alt="Preview"
                />
                {cameraIcon && (
                    <div className="absolute inset-0 flex justify-center items-center bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full">
                        <FaCamera size={cameraSize} className="text-white" />
                    </div>
                )}
                <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue}
                    render={({ field: { onChange } }) => (
                        <input
                            id={name}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = handlePreview(e);
                                if (file) onChange(file);
                            }}
                        />
                    )}
                    rules={{ required: `${name} is required` }}
                />
            </label>
        </div>
    );
};

export default GetImagePreview;
