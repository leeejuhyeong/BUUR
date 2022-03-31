import React from "react";
import { Route, withRouter } from "react-router-dom";
import Login from "./components/User/Login";
import Home from "./pages/Home";
import Recommend from "./pages/Recommend";
import Search from "./pages/Search";
import MyPage from "./pages/MyPage/MyPage";
import BeerList from "./pages/Beer/BeerList";
import BeerDetails from "./pages/Beer/BeerDetails";
import BeerReviews from "./pages/Beer/BeerReviews";
import Nav from "./components/Nav";
import "./styles/common/App.css";

import SurveyInitialScreen from "./components/User/SurveyInitialScreen";
import Survey from "./components/User/Survey";
// import SignUp from "./components/User/SignUp";
import { UserContextProvider } from "./components/User/user-context";

const BaseRouter = withRouter(({ location }) => {
  return (
    <div className="app">
      <UserContextProvider>
        {/* nav 사용x  */}
        <Route path="/" exact={true} component={Login} />
        {/* <Route path="/SignUp" exact={true} component={SignUp} /> */}
        <Route path="/SurveyInitialScreen" exact={true} component={SurveyInitialScreen} />
        <Route path="/Survey" exact={true} component={Survey} />
        <Route path="/main/beerlist" exact={true} component={BeerList} />
        <Route path="/main/beerlist/beerdetails" exact={true} component={BeerDetails} />
        <Route path="/main/beerlist/beerdetails/reviews" component={BeerReviews} />

        {/* 예외처리 */}
        {location.pathname !== "/" &&
          location.pathname !== "/main/beerlist" &&
          location.pathname !== "/main/beerlist/beerdetails" &&
          location.pathname !== "/main/beerlist/beerdetails/reviews" &&
          location.pathname !== "/SurveyInitialScreen" &&
          location.pathname !== "/Survey" && <Nav />}

        {/* nav 사용  */}
        <Route exact path="/home" component={Home} />
        <Route path="/recommend" component={Recommend} />
        <Route path="/search" component={Search} />
        <Route path="/mypage" component={MyPage} />
      </UserContextProvider>
    </div>
  );
});

function App() {
  return <BaseRouter />;
}

export default App;
