import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import store from '../../store'

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    background: "#E9B940"
  }
}));

export default function CustomizedBadges() {
  return (
    <IconButton aria-label="cart" sx={{ m: 1 }}>
      <StyledBadge badgeContent={store.getState().basket.length} color="primary">
      <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}
