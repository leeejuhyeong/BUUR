import React from 'react';
import '../../styles/search.css'
import SearchIcon from '@mui/icons-material/Search';

const RelatedResult = ({relatedWords, searchBeer}) => {
    if (relatedWords) {
        return (
            <div className='related-result-container'>
                {relatedWords.map(( beer, index ) => (
                    <div className="related-result-content" onClick={() => searchBeer(beer)} key={index}>
                        <SearchIcon sx={{ fontSize: 15 }}/>
                        <p>{beer}</p>
                    </div>
                ))}
            </div>
        )
    }
}

export default RelatedResult;