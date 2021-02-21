import React, { Component } from 'react';
import './App.css';
import { AccountDetailsInputForm, LogoAndSiteName, ViewRewards } from './components';


class App extends Component {

  state = {
    accountNumber: null,
    portfolio: [],
    showInputForm: true,
  }

  setAccountDetails = (accountNumber, portfolio) => {
    this.setState({ accountNumber, portfolio, showInputForm: false })
  }

  render() {
    const { showInputForm, portfolio } = this.state

    if (showInputForm) {
      return (
        <div className="App">
          <LogoAndSiteName />
          <AccountDetailsInputForm updateAccountDetails={this.setAccountDetails} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <LogoAndSiteName />
          <ViewRewards portfolio={portfolio} />
        </div>
      );
    }

  }
}

export default App;
