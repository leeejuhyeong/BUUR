import React, { useEffect, useState } from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import BeerItem from "../../components/Beer/BeerItem";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';

const BeerList = ({ history, location }) => {
  const keyword = location.state.keyword;
  const type = location.state.type;

  const [ beerList, setBeerList ] = useState([]);
  const [ offset, setOffset ] = useState(0);
  const [ target, setTarget ] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);


  useEffect(()=> {
    console.log('변경')
    console.log(beerList)
    console.log(offset)
  }, [beerList, offset])

  const getMoreItem = async() => {
    setIsLoaded(true);
    await axios
      .get(`https://j6b102.p.ssafy.io/api-v1/beer/${type}/${offset}`, {
        headers: {"X-AUTH-TOKEN" : localStorage.getItem('jwt')}
      })
      .then((res) => {
        console.log(res)
        setBeerList(beerList => beerList.concat(res.data));
        setOffset(offset => offset + res.data.length);
        console.log(beerList);
        console.log(offset);
        setIsLoaded(false);
      })
  }


  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };


  const goBack = () => {
    history.goBack();
  };
  

  return (
    <div className="beerlist">
      <header>
        <button onClick={goBack}>
          <ChevronLeftIcon />
        </button>
        <p># {keyword}</p>
        <div></div>
      </header>
      <div className="beerlist-body">
        <Box sx={{ flexGrow: 1 }} className="beerbox">
        <Grid container spacing={{ xs: 2 }}>
          { beerList.map(( beer , index) => (
            <Grid item xs={4} key={index}>
              <BeerItem
              beer={beer}
              />
            </Grid>
          ))}
          <div ref={setTarget}></div>
          </Grid>
        </Box>
      </div>
    </div>
  )
}

export default BeerList;
