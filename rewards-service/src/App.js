import React, { Component } from 'react';
import './App.css';
import skyLogo from "./images/sky-logo_0.png"
import InputAccountDetails from "./components/InputAccountDetails"
import ViewRewards from "./components/ViewRewards"


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
          <img src={skyLogo} alt="Sky Logo"></img>
          <h1>Customer Rewards Service</h1>
          <InputAccountDetails updateAccountDetails={this.setAccountDetails} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <img src={skyLogo} alt="Sky Logo"></img>
          <h1>Customer Rewards Service</h1>
          <ViewRewards portfolio={portfolio} />
        </div>
      );
    }

  }
}

export default App;
