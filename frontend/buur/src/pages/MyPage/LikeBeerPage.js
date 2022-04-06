import React, { useEffect, useState } from 'react';
// import React from 'react';
import MyPageBackHeader from '../../components/MyPage/MyPageBackHeader';
import BeerItem from '../../components/Beer/BeerItem'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import '../../styles/mypage.css'
import axios from 'axios'

function LikeBeerPage(){
    const [beerList, setBeerList] = useState([])

    useEffect(() => {
        axios.get('https://j6b102.p.ssafy.io/api-v1/beer/like', {
            headers: {
                'x-auth-token': localStorage.getItem('jwt')
            }
        })
        .then((res) => {
            console.log(res.data)
            setBeerList(res.data)
        })
        .catch((err)=> console.log(err))
    },[]);

    return (
        <div className='like-beer-page'>
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