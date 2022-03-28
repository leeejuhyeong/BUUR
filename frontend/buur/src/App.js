import React from "react";
import { Route, withRouter } from "react-router-dom";
import Login from './components/User/Login';
import Home from './pages/Home';
import Recommend from './pages/Recommend';
import Search from './pages/Search';
import MyPage from './pages/MyPage';
import BeerList from './pages/Beer/BeerList'
import BeerDetails from './pages/Beer/BeerDetails'
import BeerReviews from './pages/Beer/BeerReviews'
import Nav from './components/Nav';
import './styles/common/App.css';


// class App extends React.Component {
//   render() {
//     return (
//       <Switch>
//       <Route path="/" exact={true} component={Login} />
//       <Route path="/main/beerlist" component={BeerList} />
//       <>
//         <Route exact path="/home" component={Home} />
//         <Route path="/recommend" component={Recommend} />
//         <Route path="/search" component={Search} />
//         <Route path="/mypage" component={MyPage} />
//         <Nav />
//       </>
//     </Switch>

    
//     )
//   }
// }

// export default App;

const BaseRouter = withRouter(({ location} ) => {

  return (
    <div className="app">
      <Route path="/" exact={true} component={Login} />
      <Route path="/main/beerlist" exact={true} component={BeerList} />
      <Route path="/main/beerlist/beerdetails" exact={true} component={BeerDetails} />
      <Route path="/main/beerlist/beerdetails/reviews" component={BeerReviews} />
       { location.pathname !== '/' &&
       location.pathname !== '/main/beerlist' && 
       location.pathname !== '/main/beerlist/beerdetails' &&
       location.pathname !== '/main/beerlist/beerdetails/reviews'
       && 
       <Nav/>}
       <Route exact path="/home" component={Home} />
       <Route path="/recommend" component={Recommend} />
       <Route path="/search" component={Search} />
       <Route path="/mypage" component={MyPage} />
    </div>

  )
})

function App() {
  
  return (
    <BaseRouter/>
  );
}

export default App;