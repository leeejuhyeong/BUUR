import React from 'react';
import { useHistory } from "react-router";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import '../../styles/mypagebackheader.css'

const NoticeDetailHeader = ({pageInfo}) => {
    const history = useHistory();

    function moveMypage() {
        history.push({
            pathname: "/mypage/notice"
            })
    }
    return (
        <div className='notice-detail-header'>
            <header>
                <button onClick={()=> moveMypage()}><ChevronLeftIcon/></button>
                <p>{pageInfo}</p>
                <div></div>
            </header>
        </div>
    );
};

export default NoticeDetailHeader;