import React from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import BeerItem from "../../components/Beer/BeerItem";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function BeerList({ history, location }) {
  const keyword = location.state.keyword;

  const goBack = () => {
    history.goBack();
  };

  const beerList = [
    { name : '호가든', id:'a', kind:'과일맥주', alcohol:'4.5', origin: '덴마크' },
    { name : '서머스비', id:'b', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
    { name : '서머스비', id:'c', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
    { name : '서머스비', id:'d', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
    { name : '서머스비', id:'e', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
    { name : '서머스비', id:'f', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
    { name : '곰표', id:'g', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
    { name : '서머스비', id:'h', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},]
  return (
    <div className="beerlist">
      <header>
        <button onClick={goBack}><ChevronLeftIcon/></button>
        <p># {keyword}</p>
        <div></div>
      </header>
      <div className="beerlist-body">
        <Box sx={{ flexGrow: 1 }} className="beerbox">
        <Grid container spacing={{ xs: 2 }}>
          {beerList.map(( beer , index) => (
            <Grid item xs={4} key={index}>
              <BeerItem
              beer={beer}
              />
            </Grid>
          ))}
          </Grid>
        </Box>
      </div>
    </div>

  )
}

export default BeerList;