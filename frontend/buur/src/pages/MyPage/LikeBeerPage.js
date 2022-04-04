// import React, { useEffect, useState } from 'react';
import React from 'react';
import MyPageBackHeader from '../../components/MyPage/MyPageBackHeader';
import BeerItem from '../../components/Beer/BeerItem'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import '../../styles/mypage.css'
// import axios from 'axios'

function LikeBeerPage(){
    const beerList = [
        { name : '호가든', id:'a', kind:'과일맥주', alcohol:'4.5', origin: '덴마크' },
        { name : '서머스비', id:'b', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
        { name : '서머스비', id:'c', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
        { name : '서머스비', id:'d', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
        { name : '서머스비', id:'e', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
        { name : '서머스비', id:'f', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
        { name : '곰표', id:'g', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},
        { name : '서머스비', id:'h', kind:'과일맥주', alcohol:'4.5', origin: '덴마크'},]
    // const [beerList, setBeerList] = useState([])

    // useEffect(() => {
    //     axios.get('https://j6b102.p.ssafy.io/api-v1/beer/like', {
    //         headers: {
    //             'x-auth-token': ''
    //         }
    //     })
    //     .then((res) => {
    //         console.log(res.data)
    //         setBeerList(res.data)
    //     })
    //     .catch((err)=> console.log(err))
    // },[]);

    return (
        <div>
            <MyPageBackHeader
            pageInfo="찜한 맥주"
            />
            <div className="like-beer-body">
                <Box sx={{ flexGrow: 1 }} className="beerbox">
                <Grid container spacing={{ xs: 2 }}>
                {beerList.map(( beer , index) => (
                    <Grid item xs={4} key={index}>
                    <BeerItem
                    beer={beer}
                    />
                    </Grid>
                ))}
                </Grid>
                </Box>
            </div>
        </div>
    );


}

export default LikeBeerPage;