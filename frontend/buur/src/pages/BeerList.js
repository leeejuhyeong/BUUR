import React from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


function BeerList({ history, location }) {
  const keyword = location.state.keyword;

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="beerlist">
      <header>
        <button onClick={goBack}><ChevronLeftIcon/></button>
        <p>#{keyword}</p>
        <div></div>
      </header>

    </div>

  )
}

export default BeerList;