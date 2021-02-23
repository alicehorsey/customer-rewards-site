import React, { Component } from 'react';
import './App.css';
import './styles/InputForm.css';
import { AccountDetailsInputForm, LogoAndSiteName, ViewRewards } from './components';
import { generateApiResponse } from './eligibilityService/eligibilityService';

class App extends Component {

  state = {
    accountNumber: null,
    eligibilityCode: null,
    eligibilityInformation: null,
    portfolio: [],
    showInputForm: true,
    showRewards: true
  }

  setAccountDetails = (accountNumber, portfolio) => {
    this.setState({ accountNumber, portfolio, showInputForm: false });
  }

  resetDetails = () => {
    this.setState({ accountNumber: null, portfolio: [], showInputForm: true });
  }

  checkEligibility = (accountNumber) => {     //<--- parameter: accountNumber (from customer) required by Eligibilty Service

    //NB: In this mock up I am using a function to randomly generate an example response from the Eligibilty Service:
    const { response } = generateApiResponse();

    this.setState({ eligibilityCode: response.apiResponseCode, eligibilityInformation: response.apiResponseInformation, showRewards: true });
  }

  render() {
    const { showInputForm, showRewards, portfolio, eligibilityCode, eligibilityInformation } = this.state;

    if (showInputForm) {
      return (
        <div className="App">
          <LogoAndSiteName />
          <AccountDetailsInputForm setAccountDetails={this.setAccountDetails} checkEligibility={this.checkEligibility} />
        </div>
      );
    } else if (showRewards) {
      return (
        <div className="App">
          <LogoAndSiteName />
          <ViewRewards portfolio={portfolio} eligibilityCode={eligibilityCode} eligibilityInformation={eligibilityInformation} resetDetails={this.resetDetails} />
        </div>
      );
    }
  }
}

export default App;
