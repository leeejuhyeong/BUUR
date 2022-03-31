import React from "react";
import MyPageHeader from "../../components/MyPage/MyPageHeader";
import "../../styles/mypage.css"

class MyPage extends React.Component {
  render () {
    return (
      <div className="mypage">
        <MyPageHeader 
        pageInfo='마이페이지'
        />
        <div>
          <div className="user-info-div">
            김싸피님
          </div>
          <div className="macbti-div">
            나의 MacBTI 는?
          </div>
          <div className="mypage-el-div">냉장고 둘러보기</div>
          <div className="mypage-el-div">찜한 맥주</div>
          <div className="mypage-el-div">공지사항</div>
          <div className="mypage-el-div">이용안내</div>
          <div className="logout-div">로그아웃</div>
        </div>
      </div>

    )
  }
}

export default MyPage;