import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ClearIcon from "@mui/icons-material/Clear";
import "../../styles/refrigerator.css";
import axios from "axios";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    color: "#B15120",
    fontSize: "3rem",
    fontWeight: "900",
    "&$selected": {
      color: "#ffffff",
    },
  },
  selected: {},
});
const Refrigerator = () => {
  const [value, setValue] = React.useState(0);
  const [fourBeer, setFourBeer] = useState([]);
  const [drankBeer, setDrankBeer] = useState([]);
  const [fourPage, setFourPage] = useState(0);
  const [drankPage, setDrankPage] = useState(0);
  const [drankTotal, setDrankTotal] = useState(0);
  const [fourTotal, setFourTotal] = useState(0);
  const [beerId, setBeerId] = useState([]);
  const history = useHistory();
  const styleClasses = useStyles();
  const goBack = () => {
    history.push({
      pathname: "/mypage",
    });
  };

  const beerDetails = async (beerInfo) => {
    await axios
      .get(`https://j6b102.p.ssafy.io/api-v1/beer/info/${beerInfo.beerId}`, {
        headers: { "X-AUTH-TOKEN": localStorage.getItem("jwt") },
      })
      .then((res) => {
        history.push({
          pathname: "/main/beerlist/beerdetails",
          state: { beerInfo: res.data },
        });
      });
  };

  useEffect(() => {
    axios
      .get("https://j6b102.p.ssafy.io/api-v1/basket/0", {
        headers: {
          "X-AUTH-TOKEN": localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        const tempBeer = [];
        const tempId = [];
        for (let [key, value] of Object.entries(res.data)) {
          tempId.push(key);
          tempBeer.push(value);
        }
        setBeerId(tempId);
        setFourBeer(tempBeer);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://j6b102.p.ssafy.io/api-v1/basket/drink/0", {
        headers: {
          "X-AUTH-TOKEN": localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setDrankBeer(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://j6b102.p.ssafy.io/api-v1/basket/drink", {
        headers: {
          "X-AUTH-TOKEN": localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setDrankTotal(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://j6b102.p.ssafy.io/api-v1/basket", {
        headers: {
          "X-AUTH-TOKEN": localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setFourTotal(res.data);
      });
  }, []);

  const onDrankPrev = () => {
    axios
      .get(`https://j6b102.p.ssafy.io/api-v1/basket/drink/${drankPage - 1}`, {
        headers: {
          "X-AUTH-TOKEN": localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setDrankBeer(res.data);
      })
      .catch((err) => {
        alert("첫번째 페이지입니다");
      });
  };

  const onDrankNext = () => {
    axios
      .get(`https://j6b102.p.ssafy.io/api-v1/basket/drink/${drankPage + 1}`, {
        headers: {
          "X-AUTH-TOKEN": localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setDrankBeer(res.data);
      })
      .catch((err) => {
        alert("마지막 페이지입니다");
      });
  };

  const showArrow = () => {
    if (drankTotal > 0) {
      if (drankPage === 0) {
        return (
          <ArrowForwardIosIcon
            className="move-next-btn"
            onClick={() => [setDrankPage(drankPage + 1), onDrankNext()]}
          />
        );
      } else if (drankPage === drankTotal) {
        return (
          <ArrowBackIosNewIcon
            className="move-prev-btn"
            onClick={() => [setDrankPage(drankPage - 1), onDrankPrev()]}
          />
        );
      } else {
        return (
          <div>
            <ArrowForwardIosIcon
              className="move-next-btn"
              onClick={() => [setDrankPage(drankPage + 1), onDrankNext()]}
            />
            <ArrowBackIosNewIcon
              className="move-prev-btn"
              onClick={() => [setDrankPage(drankPage - 1), onDrankPrev()]}
            />
          </div>
        );
      }
    }
  };

  const onFourPrev = () => {
    axios
      .get(`https://j6b102.p.ssafy.io/api-v1/basket/${fourPage - 1}`, {
        headers: {
          "X-AUTH-TOKEN": localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        const tempBeer = [];
        const tempId = [];
        for (let [key, value] of Object.entries(res.data)) {
          tempId.push(key);
          tempBeer.push(value);
        }
        setBeerId(tempId);
        setFourBeer(tempBeer);
      })
      .catch((err) => {
        alert("첫번째 페이지입니다");
      });
  };

  const onFourNext = () => {
    axios
      .get(`https://j6b102.p.ssafy.io/api-v1/basket/${fourPage + 1}`, {
        headers: {
          "X-AUTH-TOKEN": localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        const tempBeer = [];
        const tempId = [];
        for (let [key, value] of Object.entries(res.data)) {
          tempId.push(key);
          tempBeer.push(value);
        }
        setBeerId(tempId);
        setFourBeer(tempBeer);
      })
      .catch((err) => {
        alert("마지막 페이지입니다");
      });
  };

  const showFourArrow = () => {
    if (fourTotal > 0) {
      if (fourPage === 0) {
        return (
          <ArrowForwardIosIcon
            className="move-next-btn"
            onClick={() => [setFourPage(fourPage + 1), onFourNext()]}
          />
        );
      } else if (fourPage === fourTotal) {
        return (
          <ArrowBackIosNewIcon
            className="move-prev-btn"
            onClick={() => [setFourPage(fourPage - 1), onFourPrev()]}
          />
        );
      } else {
        return (
          <div>
            <ArrowForwardIosIcon
              className="move-next-btn"
              onClick={() => [setFourPage(fourPage + 1), onFourNext()]}
            />
            <ArrowBackIosNewIcon
              className="move-prev-btn"
              onClick={() => [setFourPage(fourPage - 1), onFourPrev()]}
            />
          </div>
        );
      }
    }
  };

  function deleteFour(groupId) {
    axios
      .delete(`https://j6b102.p.ssafy.io/api-v1/basket/${groupId}`, {
        headers: {
          "X-AUTH-TOKEN": localStorage.getItem("jwt"),
        },
      })
      .then(() => {
        axios
          .get("https://j6b102.p.ssafy.io/api-v1/basket/0", {
            headers: {
              "X-AUTH-TOKEN": localStorage.getItem("jwt"),
            },
          })
          .then((res) => {
            const tempBeer = [];
            const tempId = [];
            for (let [key, value] of Object.entries(res.data)) {
              tempId.push(key);
              tempBeer.push(value);
            }
            setBeerId(tempId);
            setFourBeer(tempBeer);
          });
        setFourPage(0);
      })
  }

  const showBeers = () => {
    if (value) {
      return (
        <div className="drankbeer-box">
          <div className="drankbeer-body">
            {drankBeer.map((beer, index) => (
              <div className="drankbeer-img-div" key={index}>
                <img
                  src={`data:image/png; base64, ${beer.beerImage}`}
                  alt="beerImage"
                  className="drankbeer-img"
                  onClick={() => beerDetails(beer)}
                />
                <div className="drankbeer-index">
                  {drankPage === 0 && index < 6 ? index + 1 : ""}
                </div>
              </div>
            ))}
          </div>
          {showArrow()}
        </div>
      );
    } else {
      return (
        <div className="fourbeer-group">
          <div className="fourbeer-div">
            {fourBeer.map((beerList, index) => (
              <div className="fourbeer-list-div" key={index}>
                {beerList.map((beer, idx) => (
                  <div key={idx} className="fourbeer-img-div">
                    <img
                      src={`data:image/png; base64, ${beer.beerImage}`}
                      alt="beerImage"
                      className="fourbeer-img"
                      onClick={() => beerDetails(beer)}
                    />
                  </div>
                ))}
                <button onClick={() => deleteFour(beerId[index])}>
                  <ClearIcon fontSize="small" />
                </button>
              </div>
            ))}
          </div>
          {showFourArrow()}
        </div>
      );
    }
  };

  return (
    <div className="refrigerator-page">
      <div className="refrigerator-header">
        <div></div>
        <div className="refrigerator-header-div">
          <Box sx={{ width: 250 }}>
            <BottomNavigation
              className="refrigerator-nav"
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction
                className="refrigerator-nav-btn"
                label="맥주 조합"
                onClick={() => setValue(0)}
              />
              <BottomNavigationAction
                className="refrigerator-nav-btn"
                label="내가 마신 맥주"
                onClick={() => setValue(1)}
              />
            </BottomNavigation>
          </Box>
        </div>
        <button onClick={goBack}>
          <ClearIcon />
        </button>
      </div>
      <div className="show-beers">
        {showBeers()}
      </div>
    </div>
  );
};

export default Refrigerator;
