import React from "react";
import Login from './components/User/Login';
import Main from './components/Main/Main';
import './styles/common/App.css';

class App extends React.Component {
  render() {
    // jwt있을때 없을때
    const tmp = 1;

    if (tmp === 0) {
      return (
        <div className="App">
          <Login />
        </div>
      )
    } else {
      return (
        <div className="App">
          <Main />
        </div>
      )
    }
  }
}

export default App;