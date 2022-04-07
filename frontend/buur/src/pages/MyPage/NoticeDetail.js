import React from 'react';
import NoticeDetailHeader from '../../components/MyPage/NoticeDetailHeader'

const NoticeDetail = () => {
    return (
        <div className='notice-detail-page'>
            <NoticeDetailHeader
                pageInfo='공지사항'
            />
            <div className='notice-detail-header'>
                <span className='notice-detail-title'> BUUR 추천 서비스 일시 중단 안내</span>
                <span className='notice-detail-day'>2022.03.01</span>
            </div>
            <div className='notice-detail-body'>
                <p>안녕하세요. BUUR입니다.</p>
                <p>안정적인 서비스 제공을 위해 일부 시스템 점검이 <br/>진행될 예정입니다.</p>
                <p>점검이 진행되는 동안 BUUR 추천 서비스가 중단됩니다.</p>
                <ul>
                    <li className='notice-li'>
                        <div className='notice-li-div'>점검일시</div>
                        <div className='notice-li-div'>22년 3월 22일 (화) 오전 00시 ~ 오전 02시</div>
                    </li>
                    <li>
                        <div className='notice-li-div'>점검 중 사용이 제한되는 서비스</div>
                        <div className='notice-li-div'>BUUR 추천</div>
                    </li>
                </ul>
                <div>더 나은 서비스 제공을 위해 최선을 다하겠습니다.</div>
                <div>감사합니다.</div>
            </div>
        </div>
    );
};

export default NoticeDetail;