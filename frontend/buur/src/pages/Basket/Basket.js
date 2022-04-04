import React from "react";
import {useHistory} from "react-router";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import beerBalnk from "../../assets/beer_blank.png";
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import Slide from '@mui/material/Slide';
import store from '../../store'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Basket() {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const goCombine = (combineBeer) => {
    history.push({
      pathname: "/main/basket/combine",
      state: { combineBeer : combineBeer}
    })
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const basketList = store.getState().beer.basket
  console.log(basketList)

  const beerList = () => {
    let arr = JSON.parse(JSON.stringify(basketList));
    let blank = { img: beerBalnk, name: '' }
    for (let i=0; i < 4-basketList.length; i++) {
      arr.push(blank)
    }
    return arr
  }

  const combineBeerBtn = () => {
    if (basketList.length !== 4) {
      return (
        <button className="combine-btn lack-beer-btn">
          맥주가 부족해요
        </button>
      )
    } else {
      return (
        <button
        onClick={() => goCombine(beerList())}
        className="combine-btn full-beer-btn">
          조합하기
        </button>
      )
    }
  }

  const basketImage = (beer) => {
    if (beer.name === '') {
      return (
        <img src={beer.img}  alt='blankBeer'/>
      )
    } else {
      return (
        <img src={`data:image/png; base64, ${beer.beerImage}`}  alt='basketBeer'/>
      )
    }
  }

  return (
    <div className="basket">
      <div className="basket-header">
        <CloseRoundedIcon 
        onClick={goBack}
        sx={{ fontSize: 30, m:1}}/>
      </div>
      <div className="basket-body">
        { beerList().map((beer, index) => (
          <div className="basket-body-item" key={index}>
            {basketImage(beer)}
            <p>{beer.name}</p>
          </div>
        ))}
      </div>
      <div>
      <button onClick={handleClickOpen} className="small-basket-btn">
        <KeyboardArrowUpRoundedIcon />
      </button>
      
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{ sx: { 
          position: "fixed", 
          bottom: 0, left: 0, top: 380,
          borderRadius: 5,
          pt: 1
        } }}
      >
        <Toolbar sx={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div sx={{display: 'flex', justifyContent: 'center'}}>
            <KeyboardArrowDownRoundedIcon
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{ m: 1}}
            />
          </div>
          <div className="small-basket-body">
        { beerList().map((beer, index) => (
          <div key={index}>
            {basketImage(beer)}
          </div>
        ))}
      </div>
        {combineBeerBtn()}
        </Toolbar>
      </Dialog>
      </div>
    </div>

  )
}

export default Basket;