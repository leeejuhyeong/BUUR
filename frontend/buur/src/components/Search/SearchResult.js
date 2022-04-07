import React from "react";
import BeerItem from '../Beer/BeerItem.js'
import Grid from '@mui/material/Grid';
import '../../styles/search.css';

const searchBeers = (props) => {
    return (
        <div className="search-result-page">
            <h4>이 맥주를 찾으셨나요?</h4>
            <Grid container>     
                {props.resultBeers.map(( beer , index) => ( 
                <div key={index} className="search-beer-item">
                    <Grid item xs={4} key={index}>
                        <BeerItem
                        beer={beer}
                        />
                    </Grid>
                </div>
                ))}
            </Grid>
        </div>
    )
}

export default searchBeers;