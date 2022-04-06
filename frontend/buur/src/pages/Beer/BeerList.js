import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import BeerItem from "../../components/Beer/BeerItem";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Spinner from "../../components/Spinner";

const BeerList = ({ history, location }) => {
  const keyword = location.state.keyword;
  const type = location.state.type;

  const [beerList, setBeerList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [stop, setStop] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    let observer;
    if (target && !stop) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, isLoaded]);

  useEffect(() => {
    if (isLoaded && !stop) {
      axios
        .get(`https://j6b102.p.ssafy.io/api-v1/beer/${type}/${offset}`, {
          headers: { "X-AUTH-TOKEN": localStorage.getItem("jwt") },
        })
        .then((res) => {
          setBeerList((beerList) => beerList.concat(res.data));
          setOffset((offset) => offset + res.data.length);
          setIsLoaded(false);
          if (res.data.length < 12) {
            setStop(true);
          }
        });
    }
  }, [isLoaded]);

  const getMoreItem = () => {
    setIsLoaded(true);
  };

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

  const showSpinner = () => {
    if (loading) {
      return <Spinner />;
    }
  };

  return (
    <div className="beerlist">
      {showSpinner()}
      <div className="beerlist-header">
        <button onClick={goBack}>
          <ChevronLeftIcon />
        </button>
        <p># {keyword}</p>
        <div></div>
      </div>
      <div className="beerlist-body">
        <Box sx={{ flexGrow: 1 }} className="beerbox">
          <Grid container spacing={{ xs: 2 }}>
            {beerList.map((beer, index) => (
              <Grid item xs={4} key={index}>
                <BeerItem beer={beer} />
              </Grid>
            ))}
            <div ref={setTarget}></div>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default BeerList;
