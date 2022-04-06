import React from "react";
import "../../styles/search.css";

const History = ({ searchHistory, removeHistory, searchBeer }) => {
  if (searchHistory.length === 0) {
    return <div className="no-result-word">최근 검색된 기록이 없습니다.</div>;
  }
  return (
    <div className="history-container">
      <div className="history-title">최근 검색어</div>
      {searchHistory.map((word, index) => (
        <div className="history-content" key={index}>
          <span
            onClick={() => {
              searchBeer(word.keyword);
            }}
          >
            {word.keyword}
          </span>
          <button
            className="history-delete-btn"
            onClick={() => {
              removeHistory(word.searchId);
            }}
          >
            삭제
          </button>
        </div>
      ))}
    </div>
  );
};

export default History;
