import React from 'react';
import { useHistory } from "react-router";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import '../../styles/mypagebackheader.css'

function MyPageBackHeader({pageInfo}){
    const history = useHistory();

    function moveMypage() {
        history.push({
            pathname: "/mypage"
            })
    }

    return (
        <div className='my-page-back-header'>
            <header>
                <button onClick={()=> moveMypage()}><ChevronLeftIcon/></button>
                <p>{pageInfo}</p>
                <div></div>
            </header>
        </div>
    );


}

export default MyPageBackHeader;