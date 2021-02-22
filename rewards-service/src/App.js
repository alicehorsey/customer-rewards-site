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

  resetDetails = () => {
    this.setState({ accountNumber: null, portfolio: [], showInputForm: true })
  }

  render() {
    const { showInputForm, portfolio } = this.state

    if (showInputForm) {
      return (
        <div className="App">
          <LogoAndSiteName />
          <AccountDetailsInputForm setAccountDetails={this.setAccountDetails} checkEligibility={this.checkEligibility} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <LogoAndSiteName />
          <ViewRewards portfolio={portfolio} resetDetails={this.resetDetails} />
        </div>
      );
    }

  }
}

export default App;
