import React, { useState } from "react";
import BeerHeader from "../components/Beer/BeerHeader";
import SearchResult from "../components/Search/SearchResult";
import History from "../components/Search/History"
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import '../styles/search.css'



function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isBeer, setBeer] = useState(true);
    const [isHistory, setHistory] = useState(false);
    // const [keywords, setKeywords ] = useState(searchHistory || '[]')
    const resultBeers = [
      { name : '호가든', id:'a', kind:'과일맥주', alcohol:'4.5', origin: '덴마크' },
      { name : '서머스비', id:'b', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
      { name : '서머스비', id:'c', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
      { name : '서머스비', id:'d', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
      { name : '서머스비', id:'e', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
    ]
    
    const [searchHistory, setSearchHistory] = useState([
      { text : '호가든', id: 'a'},
      { text : '호가든', id: 'b'},
    ]);

    function handleAddKeyword(searchTerm) {
      if (searchTerm.trim()) {

        const newKeyword = {
          text: searchTerm,
          id: 'c'
        }
        setSearchHistory([newKeyword, ...searchHistory])
        setSearchTerm("")
      }
    }

    function searchBeer(searchTargetBeer) {
      // 검색 히스토리에 저장, 검색 결과 불러오기
      // 검색 결과 있을 경우 isBeer -> true로 변경
      // 검색 결과 resultBeers에 저장
      console.log(searchTargetBeer)
      console.log(setBeer)
      setSearchTerm("")
    }

    function enterkey(searchTerm) {
      if (window.event.keyCode === 13 && searchTerm.trim()) {
        handleAddKeyword(searchTerm)
        searchBeer(searchTerm)
      }
    }

    function showHistory() {
      if (searchTerm === "") {
        setHistory(true)
      }
    }

    // 검색어 삭제
    function  removeHistory(id) {
      console.log(id)
      const newHistory = searchHistory.filter((history) => {
        return history.id !== id
      })
      setSearchHistory(newHistory)
      console.log(searchHistory)
    }

    return (
      <div>
        <BeerHeader
        pageInfo='검색'
        />
        <div className="search-bar-div">
          <div className="search-bar">
            <input type="text" placeholder="맥주를 검색하세요" className="search-input" 
            value={searchTerm}
            onClick={()=> showHistory()}
            onChange={(e) => [setSearchTerm(e.target.value), setHistory(false)]}
            onKeyDown={() =>  enterkey(searchTerm)}
            />
            <SearchIcon sx={{ color: '#E9B940', fontSize: 22 }} className="search-icon"/>
          </div>
          <Button onClick={() => [searchBeer(searchTerm), handleAddKeyword(searchTerm)]} sx={{ color: '#E9B940' }} size="small">검색</Button>
        </div>
        { isHistory && <History searchHistory={searchHistory} removeHistory={removeHistory}/>}
        <div>
          {isBeer && <SearchResult resultBeers={resultBeers}/>}
        </div>
      </div>
    )
  
}

export default Search;