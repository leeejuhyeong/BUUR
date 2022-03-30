import React from 'react';
import '../../styles/search.css'


const History = ({searchHistory, removeHistory}) => {
    if (searchHistory.length === 0){
        return <div className='no-result-word'>최근 검색된 기록이 없습니다.</div>
    }
    return (
        <div className='history-container'>
            <div className="history-title">최근 검색어</div>
            {searchHistory.map(( beer, index ) => (
                <div className="history-content" key={index}>
                    {beer.text}
                    <button className='history-delete-btn' onClick={() => {removeHistory(beer.id)}}>삭제</button>
                </div>
            ))}
        </div>
    )
}

export default History;