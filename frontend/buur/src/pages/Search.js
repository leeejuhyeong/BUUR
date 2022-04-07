import React, { useState } from "react";
import BeerHeader from "../components/Beer/BeerHeader";
import SearchResult from "../components/Search/SearchResult";
import History from "../components/Search/History";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import "../styles/search.css";
import axios from "axios";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isBeer, setBeer] = useState(false);
  const [isHistory, setHistory] = useState(false);
  const [timer, setTimer] = useState(0);
  const [relatedWords, setRelatedWords] = useState([]);
  const [resultBeers, setResultBeers] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  function searchBeer(searchTargetBeer) {
    setHistory(false);
    setRelatedWords([]);
    axios
      .get(`https://j6b102.p.ssafy.io/api-v1/beer/${searchTargetBeer}`, {
        headers: { "X-AUTH-TOKEN": localStorage.getItem("jwt") },
      })
      .then((res) => {
        if (res.data.length) {
          setBeer(true);
          setResultBeers(res.data);
        }
      })

    if (searchTerm.trim()) {
      axios
        .post(
          `https://j6b102.p.ssafy.io/api-v1/search`,
          {
            keyword: searchTerm,
          },
          {
            headers: { "X-AUTH-TOKEN": localStorage.getItem("jwt") },
          }
        )
        .then(() => {
          setSearchTerm("");
        })
      }
    }

  
  function enterKey(searchTerm) {
    if (window.event.keyCode === 13 && searchTerm.trim()) {
      searchBeer(searchTerm);
    }
  }

  function showHistory() {
    if (searchTerm === "") {
      axios
        .get("https://j6b102.p.ssafy.io/api-v1/search", {
          headers: {
            "x-auth-token": localStorage.getItem("jwt"),
          },
        })
        .then((res) => {
          setSearchHistory(res.data);
          setHistory(true);
        })
    }
  }

  function removeHistory(id) {
    const newHistory = searchHistory.filter((history) => {
      return history.searchId !== id;
    });
    setSearchHistory(newHistory);
    axios
      .delete(`https://j6b102.p.ssafy.io/api-v1/search/${id}`, {
        headers: { "X-AUTH-TOKEN": localStorage.getItem("jwt") },
      })
  }

  function handleChange(keyword) {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(async () => {
      try {
        await axios
          .get(`https://j6b102.p.ssafy.io/api-v1/beer/name/${keyword}`, {
            headers: { "X-AUTH-TOKEN": localStorage.getItem("jwt") },
          })
          .then((res) => {
            setRelatedWords(res.data);
          })
      } catch (e) {
        console.error("error", e);
      }
    }, 300);
    setTimer(newTimer);
  }

  function relatedResult() {
    if (searchTerm && relatedWords) {
      return (
        <div className="related-result-container">
          {relatedWords.map((beer, index) => (
            <div
              className="related-result-content"
              onClick={() => searchBeer(beer)}
              key={index}
            >
              <SearchIcon sx={{ fontSize: 15 }} />
              <p>{beer}</p>
            </div>
          ))}
        </div>
      );
    }
  }

  return (
    <div className="search-page-box">
      <BeerHeader pageInfo="검색" />
      <div className="search-page">
        <div className="search-bar-div">
          <div className="search-bar">
            <input
              type="text"
              placeholder="맥주를 검색하세요"
              className="search-input"
              value={searchTerm}
              onClick={() => showHistory()}
              onChange={(e) => [
                setSearchTerm(e.target.value),
                setHistory(false),
                handleChange(e.target.value),
              ]}
              onKeyDown={() => enterKey(searchTerm)}
            />
            <SearchIcon
              sx={{ color: "#E9B940", fontSize: 22 }}
              className="search-icon"
            />
          </div>
          <Button
            onClick={() => [searchBeer(searchTerm)]}
            sx={{ color: "#E9B940" }}
            size="small"
          >
            검색
          </Button>
        </div>
        {isHistory && (
          <History
            searchHistory={searchHistory}
            removeHistory={removeHistory}
            searchBeer={searchBeer}
          />
        )}
        {relatedResult()}
        {isBeer && <SearchResult resultBeers={resultBeers} />}
      </div>
    </div>
  );
}

export default Search;
