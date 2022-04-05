import React, { useState, useEffect} from "react";
import { useHistory, useLocation } from "react-router";
import BeerReviewBox from "../../components/Beer/BeerReviewBox";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "../../styles/beerdetails.css";
import EditIcon from "@mui/icons-material/Edit";

import Dialog from "@mui/material/Dialog";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import SportsBarRoundedIcon from "@mui/icons-material/SportsBarRounded";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BeerReviews = () => {
  const location = useLocation();
  const beerNo = location.state.beerNo;
  const beerName = location.state.beerName;
  const [rankValue, setValue] = useState(0);
  const [content, setContent] = useState('');

  const [ reviewList, setreviewList ] = useState([]);
  const [ cursor, setCursor] = useState(null);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [stop, setStop] = useState(false)
  
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setValue(0);
    setContent('');
    setOpen(false);
  };

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#E9B940",
    },
    "& .MuiRating-iconHover": {
      color: "#E9B940",
    },
  });


  const handleSubmit = async () => {
    await axios
      .post(`https://j6b102.p.ssafy.io/api-v1/beer/review`, 
      {
        "beerNo": beerNo,
        "content": content,
        "rank": rankValue,
      }
      ,
      {
        headers : {"X-AUTH-TOKEN" : localStorage.getItem('jwt')}
      })
      .then(() => {
        handleClose();
        setTimeout(() => {
          setCursor(cursor => null)
          setreviewList(reviewList => [])
        }, 1000)
        setTimeout(() => {
          setIsLoaded(true);
        }, 2000)
      })
      .catch(() => {
        alert('리뷰 등록 실패')
      })
  }

  useEffect(() => {
    getReviews();
  }, [])

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


  const getReviews = () => {
    var cursorTime = 0
    if (isLoaded && !stop) {
      if (cursor === null) {
        cursorTime = new Date(+new Date() + 3240 * 10000).toISOString().replace('T', ' ').substring(0, 19)
      } else {
        cursorTime = cursor[0] + '-'
          + ('00' + cursor[1]).slice(-2) + '-'
          + ('00' + cursor[2]).slice(-2) + ' '
          + ('00' + cursor[3]).slice(-2) + ':'
          + ('00' + cursor[4]).slice(-2) + ':'
          + ('00' + cursor[5]).slice(-2)
      }
      axios
      .get(`https://j6b102.p.ssafy.io/api-v1/beer/review/${beerNo}/${cursorTime}`, {
        headers: {"X-AUTH-TOKEN" : localStorage.getItem('jwt')}
      })
        .then((res) => {
        console.log('??')
        setreviewList(reviewList => reviewList.concat(res.data));
        setIsLoaded(false);
        if (res.data.length < 10) {
          setStop(true)
        } else {
          setCursor(cursor => res.data[res.data.length - 1].reviewDt);
        }
      })
    }
  }

  useEffect(() => {
    getReviews();
  }, [isLoaded])

  const getMoreReviews = () => {
    setIsLoaded(true);
  }

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreReviews();
      observer.observe(entry.target);
    }
  };

  return (
    <div className="beerreview-all">
      <header>
        <button onClick={goBack}>
          <ChevronLeftIcon />
        </button>
        <p>{beerName}</p>
        <div></div>
      </header>
      <div className="beerreview-body">
        {reviewList.map((review, index) => (
          <BeerReviewBox key={index} review={review} />
        ))}
        <div ref={setTarget}></div>
      </div>

      <button onClick={handleClickOpen} className="add-comment__btn">
        <EditIcon />
      </button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            position: "fixed",
            bottom: 0,
            left: 0,
            top: 350,
            borderRadius: 5,
            pt: 1,
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="add-comment__dialogtitle">
            <div></div>
            <IconButton color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </div>
          <Box sx={{ height: 60 }}>
            <Typography
              component="legend"
              sx={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              {beerName} 평점
            </Typography>
            <StyledRating
              value={rankValue}
              precision={1}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              icon={<SportsBarRoundedIcon sx={{ fontSize: 30, mr: 0.5, mt: 1, mb: 1 }} />}
              emptyIcon={<SportsBarRoundedIcon sx={{ fontSize: 25, mr: 1.2, mt: 1.4, mb: 1 }} />}
            />
          </Box>
          <textarea
            className="add-comment__dialogcontent"
            placeholder="자유롭게 이야기해주세요"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button
          onClick={handleSubmit}
          className="add-comment__dialogbtn">이렇게 평가할래요!</button>
        </Toolbar>
      </Dialog>
    </div>
  );
};

export default BeerReviews;
