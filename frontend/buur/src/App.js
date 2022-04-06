import React from "react";
import { Route, withRouter } from "react-router-dom";
import Login from "./components/User/Login";
import Home from "./pages/Home";
import Recommend from "./pages/Recommend";
import Search from "./pages/Search";
import MyPage from "./pages/MyPage/MyPage";
import InfoPage from "./pages/MyPage/InfoPage";
import LikeBeerPage from "./pages/MyPage/LikeBeerPage";
import Macbti from "./pages/MyPage/Macbti";
import Notice from "./pages/MyPage/Notice";
import Refrigerator from "./pages/MyPage/Refrigerator";
import BeerList from "./pages/Beer/BeerList";
import BeerDetails from "./pages/Beer/BeerDetails";
import BeerReviews from "./pages/Beer/BeerReviews";
import Basket from "./pages/Basket/Basket";
import BasketCombine from "./pages/Basket/BasketCombine";
import NoticeDetail from "./pages/MyPage/NoticeDetail";
import Nav from "./components/Nav";
import Landing from "./pages/Landing";
import "./styles/common/App.css";

import SurveyInitialScreen from "./components/User/SurveyInitialScreen";
import Survey from "./components/User/Survey";
import SignUp from "./components/User/SignUp";
import { UserContextProvider } from "./components/User/user-context";

const BaseRouter = withRouter(({ location }) => {
  return (
    <div className="app">
      <UserContextProvider>
        {/* nav 사용x  */}
        <Route path="/landing" exact={true} component={Landing} />
        <Route path="/" exact={true} component={Login} />
        <Route path="/SignUp" exact={true} component={SignUp} />
        <Route
          path="/SurveyInitialScreen"
          exact={true}
          component={SurveyInitialScreen}
        />
        <Route path="/Survey" exact={true} component={Survey} />
        <Route path="/main/beerlist" exact={true} component={BeerList} />
        <Route
          path="/main/beerlist/beerdetails"
          exact={true}
          component={BeerDetails}
        />
        <Route
          path="/main/beerlist/beerdetails/reviews"
          component={BeerReviews}
        />
        <Route path="/main/basket" exact={true} component={Basket} />
        <Route
          path="/main/basket/combine"
          exact={true}
          component={BasketCombine}
        />
        <Route path="/mypage/userinfo" exact={true} component={InfoPage} />
        <Route path="/mypage/macbti" exact={true} component={Macbti} />
        <Route
          path="/mypage/notice/detail"
          exact={true}
          component={NoticeDetail}
        />
        <Route
          path="/mypage/refrigerator"
          exact={true}
          component={Refrigerator}
        />
        <Route path="/mypage/likebeer" exact={true} component={LikeBeerPage} />
        <Route path="/mypage/notice" exact={true} component={Notice} />

        {/* 예외처리 */}
        {location.pathname !== "/" &&
          location.pathname !== "/SignUp" &&
          location.pathname !== "/landing" &&
          location.pathname !== "/main/beerlist" &&
          location.pathname !== "/main/beerlist/beerdetails" &&
          location.pathname !== "/main/beerlist/beerdetails/reviews" &&
          location.pathname !== "/main/basket" &&
          location.pathname !== "/main/basket/combine" &&
          location.pathname !== "/SurveyInitialScreen" &&
          location.pathname !== "/Survey" &&
          location.pathname !== "/mypage/userinfo" &&
          location.pathname !== "/mypage/macbti" &&
          location.pathname !== "/mypage/likebeer" &&
          location.pathname !== "/mypage/notice" &&
          location.pathname !== "/mypage/notice/detail" &&
          location.pathname !== "/mypage/refrigerator" && <Nav />}

        {/* nav 사용  */}
        <Route exact path="/home" component={Home} />
        <Route path="/recommend" component={Recommend} />
        <Route path="/search" component={Search} />
        <Route path="/mypage" exact={true} component={MyPage} />
      </UserContextProvider>
    </div>
  );
});

function App() {
  return <BaseRouter />;
}

export default App;
