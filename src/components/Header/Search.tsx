import React from "react";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type SearchFormData = {
    query: string;
};

const Search: React.FC = () => {
    const { register, handleSubmit } = useForm<SearchFormData>();
    const navigate = useNavigate();

    const search = (data: SearchFormData) => {
        const query = data.query;
        navigate(`/search/${query}`);
    };

    return (
        <form onSubmit={handleSubmit(search)}>
            <Input
                placeholder="Search "
                {...register("query", { required: true })}
            />
        </form>
    );
};

export default Search;

