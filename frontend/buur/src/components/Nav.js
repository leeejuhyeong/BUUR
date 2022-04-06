import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import "../styles/common/Nav.css";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { grey } from "@mui/material/colors";

const useStyles = makeStyles({
  root: {
    color: grey,
    "&$selected": {
      color: grey[900],
      borderTop: "3px solid #E9B940",
    },
  },
  selected: {},
});

const Nav = () => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  return (
    <nav>
      <Box
        sx={{
          width: 500,
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            classes={classes}
            component={Link}
            to="/home"
            label="홈"
            icon={<HomeRoundedIcon />}
          />
          <BottomNavigationAction
            classes={classes}
            component={Link}
            to="/recommend"
            label="추천"
            icon={<StarBorderRoundedIcon />}
          />
          <BottomNavigationAction
            classes={classes}
            component={Link}
            to="/search"
            label="검색"
            icon={<SearchRoundedIcon />}
          />
          <BottomNavigationAction
            classes={classes}
            component={Link}
            to="/mypage"
            label="마이"
            icon={<AccountCircleRoundedIcon />}
          />
        </BottomNavigation>
      </Box>
    </nav>
  );
};

export default Nav;
