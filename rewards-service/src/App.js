import React, { Component } from 'react';
import './App.css';
import { AccountDetailsInputForm, LogoAndSiteName, ViewRewards } from './components';
import { generateRandomNumber } from "./utils/utils";
import { eligibilityData } from "./data/eligibilityServiceTable";

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



  // *** ELIGIBILITY SERVICE STUD ***

  //When a customer submits their account and subscription information on the input form it invokes this "checkEligibilty" function which goes to the Eligibilty Service API.
  //For now, the return Eligibility Service information is stored in "./data/eligibiltyServiceTable.js" 

  //The function takes the account number for the customer and sends it to the Eligibilty Service API
  //I believe that information about the customer's portfolio would be able to be accessed inside the Eligibilty Service through the given account number which is why I have not passed the portfolio through as well.

  checkEligibility = (accountNumber) => {     //<--- parameter: accountNumber (from customer) required by Eligibilty Service


    //NB: In this mock up logic randomly generates a example response from the Eligibilty Service:

    const apiResponses = Object.keys(eligibilityData) //<--- apiResponses in an array of possible response codes ---> ["CUSTOMER_ELIGIBLE", "CUSTOMER_INELIGIBLE", "Technical_failure_exception", "Invalid_account_number_exception"]


    const index = generateRandomNumber(); //<--- generateRandomNumber is a function to randomly generate an index to choose a code from the apiResponses array


    const apiResponseCode = apiResponses[index] //<--- apiResponseCode is an example response code from the Eligibilty Service eg: "CUSTOMER_ELIGIBLE"
    console.log(apiResponseCode, "apiResponseCode") //<--- console.log (for reference)


    const apiResponseInformation = eligibilityData[apiResponseCode] //<--- apiResponseInformation shows further information linked to the response code from the Eligibilty Service eg: {description: "Customer is eligible", result: "Return relevant rewards according to the customer's portfolio"}
    console.log(apiResponseInformation, "apiResponseInformation") //<--- console.log (for reference)
  }
  // *** END OF STUD ***



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
