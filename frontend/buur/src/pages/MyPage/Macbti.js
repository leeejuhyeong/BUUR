import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {RadialChart} from 'react-vis';
import {useLocation, useHistory } from "react-router";
import axios from 'axios'


const Macbti = () => {
    const location = useLocation();
    const history = useHistory();
    const image = location.state.image.image;
    const username = location.state.username.username;
    const macbti = '하밀블기'
    const [userMonthData, setUserMonthData] = useState([])
    const monthBeerList = userMonthData.map((beer) => beer.label)
    
    useEffect(() => {
        // macbti 데이터 받기
        // axios.get('https://j6b102.p.ssafy.io/api-v1/beer/month', {
        //     'x-auth-token': ''
        // })
        // .then((res) => console.log(res.data))
        // .catch((err)=> console.log(err))
        const datas = [
            {
                "beerId": 19,
                "id": 2,
                "count": 5,
                "beerName": "호가든"
            },
            {
                "beerId": 14,
                "id": 2,
                "count": 3,
                "beerName": "트롤브루 자몽"
            },
            {
                "beerId": 12,
                "id": 2,
                "count": 2,
                "beerName": "매그너스 쥬시애플"
            },
            {
                "beerId": 9,
                "id": 2,
                "count": 1,
                "beerName": "칼스버그"
            }
        ]
        const graphColor = ['#EED56B','#E6A33A','#E48C34','#FFE578']
        const newMonthDatas = []
        datas.forEach((value, index) => {
            const newMonthData = {
                angle: value.count,
                label: value.beerName,
                color: graphColor[index]
            }
            newMonthDatas.push(newMonthData)
        })
        setUserMonthData(newMonthDatas)
        console.log(newMonthDatas)
    },[]);


    function moveMypage() {
        history.push({
            pathname: "/mypage"
          })
    }

    return (
        <div className='macbti-page '>
            <div className='macbti-header'>
                <div></div>
                <p>MacBTI</p>
                <Button component="span" onClick={()=> moveMypage()}><CloseRoundedIcon sx={{color:"#ffffff"}}/></Button> 
            </div>
            <div className='macbti-content'>
                <div className='macbti-user-info'>
                    <img src={image} alt="프로필 사진" className="profile-img"/>
                    {/* <img :src="`data:{Image}/png;base64,${comment.userProfilePhoto}`" alt="프로필 사진" className="profile-img"/> */}
                    {username}님
                </div>
                <div className='macbti-notice'>Macbti란?</div>
                <div className='macbti-graph-div'>
                    <span className='macbti-month-first'>
                        <p className='macbti-black-word'>이번 달&nbsp;</p> 
                        <p className='macbti-brown-word'>MacBTI&nbsp;</p> 
                        <p className='macbti-black-word'>는</p> 
                    </span>
                    <span className='macbti-month-second'>
                        <p className='macbti-brown-word'>{macbti}</p>
                        <p className='macbti-black-word'>입니다.</p>
                        
                    </span>
                    <div className='macbti-graph'>
                        <RadialChart
                        data={userMonthData}
                        width={230}
                        height={230} 
                        colorType='literal'
                        />
                    </div>
                    <div className='four-beer-div'>
                        <div className="circle-list">
                            <span className="beer-name">
                                <div className="circle1"></div>
                                <span className='beer-name'>{monthBeerList[0]}</span>
                            </span>
                            <span className='beer-name'>
                                <div className='circle2'></div>
                                <span>{monthBeerList[1]}</span>
                            </span>
                        </div>
                        <div className="circle-list">
                            <span className='beer-name'>
                                <div className='circle3'></div>
                                <span className='beer-name'>{monthBeerList[2]}</span>
                            </span>
                            <span className='beer-name'>
                                <div className='circle4'></div>
                                <span>{monthBeerList[3]}</span>
                            </span>
                        </div>
                    </div>
                    <div className='refrigerator-icon-div'>
                        <Button  variant="contained" className="refrigerator-btn">냉장고 둘러보기</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Macbti;