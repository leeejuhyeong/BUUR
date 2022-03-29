import React from "react";
import beerImg from "../../assets/beer_sample.png";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import store from '../../store'
import { ADD_BASKET } from '../../actions/action-types'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import addBasketIcon from '../../assets/add_basket_icon.png'
import '../../styles/beerbasket.css';
import { Typography } from "@mui/material";

class BeerDetailsInfo extends React.Component {
  state = {
    warnBasketOpen: false,
    successBasketOpen: false,
  }
  render () {
    const beerInfo = this.props.beerInfo

    function addBasket(beerInfo) {
      // console.log(beerInfo)

      if (store.getState().basket.length === 4) {
        handleClickOpenWarn()
        console.log(store.getState().basket)
      } else {
        store.dispatch({type:ADD_BASKET, data: beerInfo});
        handleClickOpenSuccess()
        console.log(store.getState().basket);
      }
    }
  
    const handleClickOpenWarn = () => {
      this.setState({warnBasketOpen : true});
    };

    const handleClickOpenSuccess = () => {
      this.setState({successBasketOpen : true});
    };
  
    const handleClose = () => {
      this.setState({warnBasketOpen : false});
      this.setState({successBasketOpen : false});
    };

    return (
      <div className="beer-details-info">
        <img src={beerImg} alt="beerImg"/>
        <div className="beer-textinfo">
          <div className="beer-textinfo__title">
            <h3>{beerInfo.name}</h3>
            <FavoriteBorderRoundedIcon sx={{ color: '#CB0000', fontSize: 22 }}/>
          </div>
          <div className="beer-textinfo__catergory"><h5>알코올</h5> <span>{beerInfo.alcohol}</span></div>
          <div className="beer-textinfo__catergory"><h5>종류 </h5> <span>{beerInfo.kind}</span></div>
          <div className="beer-textinfo__catergory"><h5>원산지 </h5> <span>{beerInfo.origin}</span></div>
          <button 
          onClick={() => addBasket(beerInfo)}
          ><WorkOutlineRoundedIcon sx={{ fontSize: 20, mx:0.5}}/>이 맥주 마시고 싶어요!</button>
        </div>

        <div className="warn-basket-dialog">
            <Dialog
            open={this.state.warnBasketOpen}
            // open={false}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{ sx: { 
              borderRadius: 10,
              width: 274,
              height: 232,
            } }}
          >
            <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', justifyContent: 'flex-end', p: 1}}>
              <Button onClick={handleClose} sx={{ display: 'inline'}}>
                <CloseRoundedIcon sx={{ color : 'black', p: 0}}/>
              </Button>
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <img src={addBasketIcon} alt="addBasket"/>
              <DialogContentText id="alert-dialog-description">
                {/* <div className="alert"> */}
                  {/* <Typography component={'span'}>{beerInfo.name}</Typography>맥주가 */}
                {/* </div> */}
                {/* <Typography component={'p'}>장바구니에 성공적으로 담겼습니다</Typography> */}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              
              <Button onClick={handleClose} autoFocus>
                확인하러 갈래요
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div className="success-basket-dialog">
            <Dialog
            open={this.state.successBasketOpen}
            // open={true}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{ sx: { 
              borderRadius: 10,
              width: 274,
              height: 232,
            } }}
          >
            <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', justifyContent: 'flex-end', p: 1}}>
              <Button onClick={handleClose} sx={{ display: 'inline'}}>
                <CloseRoundedIcon sx={{ color : 'black', p: 0}}/>
              </Button>
            </DialogTitle>
            <DialogContent 
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <img src={addBasketIcon} alt="addBasket"/>
              <DialogContentText id="alert-dialog-description">
                {/* <div className="alert-success-content"> */}
                  {/* <Typography component={'span'}>{beerInfo.name}</Typography>맥주가 */}
                {/* </div> */}
                {/* <Typography>장바구니에 성공적으로 담겼습니다</Typography> */}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              
              <Button onClick={handleClose} autoFocus>
                확인하러 갈래요
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    )
  }
}

export default BeerDetailsInfo;