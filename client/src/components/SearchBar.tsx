import { useState } from "react";
import "../assets/styles/searchbar.scss"
import Button from "./Button"
import Input from "./Input";

interface IProps {
    onSearch: (searchString: string) => void,
    onClear: () => void,
}

const SearchBar: React.FC<IProps> = ({ onSearch, onClear }) => {
    const [formData, setFormData] = useState({
        search: ""
    })

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(formData.search);
    }

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-row gap-2 mb-3 search-bar">
            <Input type="text" name="search" value={formData.search} onChange={handleInputChange} placeholder="Search" className="search-input" />
            <Button type="submit" className="search-bar-button search-button">Search</Button>
            <Button type="submit" onClick={() => {
                setFormData({
                    ...formData,
                    search: ""
                })
                onClear()
            }} className="search-bar-button clear-button">Clear</Button>
        </form>
    )
}

export default SearchBar;