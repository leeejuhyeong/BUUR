import React from "react";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BeerReviews = () => {
  const location = useLocation();
  const beerName = location.state.beerName;
  const beerReviews = location.state.beerReviews;

  // console.log(beerReviews)
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
  const [rankValue, setValue] = React.useState(0);

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
        {beerReviews.map((review, index) => (
          <BeerReviewBox key={index} review={review} />
        ))}
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
          ></textarea>
          <button className="add-comment__dialogbtn">이렇게 평가할래요!</button>
        </Toolbar>
      </Dialog>
    </div>
  );
};

export default BeerReviews;
