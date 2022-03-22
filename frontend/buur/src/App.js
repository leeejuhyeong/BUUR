import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Recommend from './pages/Recommend';
import Search from './pages/Search';
import MyPage from './pages/MyPage';
import Nav from './components/Nav';
import './styles/common/App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/recommend" component={ Recommend} />
          <Route path="/search" component={ Search} />
          <Route path="/mypage" component={MyPage} />
        </Switch>
        <Nav />
      </div>
    )
  }
}

export default App;