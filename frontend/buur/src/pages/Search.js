import React from "react";
import BeerHeader from "../components/Beer/BeerHeader";
import SearchIcon from '@mui/icons-material/Search';
import '../styles/search.css'

const Search = () => {

  return (
    <div>
      <BeerHeader
      pageInfo='검색'
      />
      <div className="search-bar-div">
        <div className="search-bar"><input type="text" placeholder="맥주를 검색하세요" className="search-input"/>
          <SearchIcon sx={{ color: '#E9B940', fontSize: 22 }} className="search-icon"/>
        </div>
        <h5>검색</h5>
      </div>
      <div className="search-page">
        <h4>이 맥주를 찾으셨나요?</h4>
      </div>
    </div>
  )
}

export default Search;