import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from '../../pages/Home';
import Recommend from '../../pages/Recommend';
import Search from '../../pages/Search';
import MyPage from '../../pages/MyPage';
import Nav from '../Nav';

class Main extends React.Component {
  render () {
    return (
      <div>
        <Switch>
          <>
          <Route exact path="/" component={Home} />
          <Route path="/recommend" component={Recommend} />
          <Route path="/search" component={Search} />
          <Route path="/mypage" component={MyPage} />         
          </>
        </Switch>
        <Nav />
    </div>
    )
  }
}

export default Main;