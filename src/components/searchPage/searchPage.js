import React, {useState} from 'react';
import axios from 'axios';
import "./searchPage.css";

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
        const params = {
            q: query,
            media_type: 'image' 
        }
        if (startYear) {
            params.year_start = startYear;
        }

        if (endYear) {
            params.year_end = endYear;
        }
        const response = await axios.get('https://images-api.nasa.gov/search', {params});
        setSearchResults(response.data.collection.items);
        console.log("responseee::", response);
        console.log("searchResultsss:", searchResults);
    }
    catch (error) {
        console.error(error);
    }
} 

    return (
        <div className='container'>
            <h1 id="pageTitle">NASA Media Library Search</h1>
            <div className='form'>
                <div className='inputFields'>
                    <label>Find:</label>
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <div className='inputFields'>
                    <label>Start Year:</label>
                    <input type="text" value={startYear} onChange={(e) => setStartYear(e.target.value)} />
                </div>
                <div className='inputFields'>
                    <label>End Year:</label>
                    <input type="text" value={endYear} onChange={(e) => setEndYear(e.target.value)} />
                </div>
                <div id='button'>
                    <button id="subBtn" onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div id="resultContainer">
                {searchResults.map((item) => (
                    <div key={item.data[0].nasa_id} className="photoItem">
                        <img id="photo" src={item.links[0].href} alt={item.data[0].title} />
                        <h2 id="photoTitle">{item.data[0].title}</h2>
                        <p id="location">{item.data[0].location}</p>
                        <p id="photographer">{item.data[0].photographer}</p>
                        <a href={`/show/${item.data[0].nasa_id} `} id='details'>View Details</a>
                    </div>
                ))}
            </div>
        </div>

    )
}
export default SearchPage;