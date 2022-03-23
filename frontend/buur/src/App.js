import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from './components/User/Login';
import Home from './pages/Home';
import Recommend from './pages/Recommend';
import Search from './pages/Search';
import MyPage from './pages/MyPage';
import BeerList from './pages/BeerList'
import Nav from './components/Nav';
import './styles/common/App.css';


class App extends React.Component {
  render() {
    return (
      <Switch>
        <>
        <Route path="/" exact={true} component={Login} />
        <Route path="/main/beerlist" component={BeerList} />
        <div>
          <Route exact path="/home" component={Home} />
          <Route path="/recommend" component={Recommend} />
          <Route path="/search" component={Search} />
          <Route path="/mypage" component={MyPage} />
          <Nav />
        </div>
        </>
      </Switch>
        
    )
    // jwt있을때 없을때
    // const tmp = 1;

    // if (tmp === 0) {
    //   return (
    //     <div className="App">
    //       <Login />
    //     </div>
    //   )
    // } else {
    //   return (
    //     <div className="App">
    //       <Main />
    //     </div>
    //   )
    // }
  }
}

export default App;