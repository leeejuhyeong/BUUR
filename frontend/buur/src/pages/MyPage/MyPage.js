import React, { useState } from "react";
import MyPageHeader from "../../components/MyPage/MyPageHeader";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "../../styles/mypage.css"
import { Link } from "react-router-dom"

function MyPage() {
    // 유저이미지, 이름 설정
    const [image, setImage] = useState("https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0bf59e89-f4fd-46b8-956d-b6ab3bfea09c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220331T052849Z&X-Amz-Expires=86400&X-Amz-Signature=81c0e66ddd9fa0f9eb8e03f02a5358354a5336fbe31f4b567373efee44415b80&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject")
    const [username, setUsername] = useState('김싸피')
    console.log(setImage, setUsername)

  
    return (
      <div className="mypage">
        <MyPageHeader 
        pageInfo='마이페이지'
        />
        <div>
        <Link
          className="user-info-div"
          to={{
            pathname:"/mypage/userinfo",
          }}>
            <div className="user-info-div">
              <img src={image} alt="프로필 사진" className="profile-img"/>
              {/* <img :src="`data:{Image}/png;base64,${comment.userProfilePhoto}`" alt="프로필 사진" className="profile-img"/> */}
              {username}님
            </div>
            <ArrowForwardIosIcon className="info-arrow-icon" sx={{ fontSize:16 }}/>
          </Link>
          <Link
          className="macbti-div"
          to={{
            pathname:"/mypage/macbti",
            state: {
              image: {image},
              username: {username}
            }
          }}>
            나의 MacBTI 는?
          </Link>
          <Link
          className="mypage-el-div"
          to={{
            pathname:"/mypage/refrigerator"
          }}
          >
            냉장고 둘러보기
          </Link>
          <Link
          className="mypage-el-div"
          to={{
            pathname:"/mypage/likebeer"
          }}
          >
            찜한 맥주
          </Link>
          <Link
          className="mypage-el-div"
          to={{
            pathname:'/mypage/notice'
          }}
          >
            공지사항
          </Link>
          <div className="logout-div">로그아웃</div>

        </div>
      </div>

    )
}


export default MyPage;