import React, { Component } from 'react';
import { rewardsData } from "../data/rewardsServiceTable";
import { isAccountNumberValid } from '../utils/utils';

class AccountDetailsInputForm extends Component {

    state = {
        accountNumber: "",
        portfolio: [],
        isChannelerror: false
    }

    channels = Object.keys(rewardsData); //<--- ["SPORTS", "KIDS", "MUSIC", "NEWS", "MOVIES"] but could add to the channel data and the new channels would be there

    handleAccountNumberInput = ({ target: { value } }) => {
        this.setState({ accountNumber: value });
    }

    accountNumberValidationMessage = () => {
        const { accountNumber } = this.state;
        if (accountNumber.length > 0) {
            return <p className="accountNumberMsg" style={{ color: isAccountNumberValid(accountNumber) ? "green" : "red" }}>{isAccountNumberValid(accountNumber) ? "Account number is valid." : "Account number should be 12 digits."}</p>
        }
    }

    handleChannelSelection = ({ target: { value } }) => {
        const { portfolio, isChannelerror } = this.state;

        if (isChannelerror) { this.setState({ isChannelerror: false }) };

        if (portfolio.includes(this.channels[value])) {
            return this.setState({ isChannelerror: true }); //<- shows error if channel has already been selected
        } else {
            return this.setState(prevState => ({
                portfolio: [...prevState.portfolio, this.channels[value]] //<- adds channel to state if not already been selected
            }))
        }
    }

    composeSubscriptionMessageAndList = () => {
        const { portfolio, isChannelerror } = this.state;
        if (portfolio.length > 0) {
            return (
                <div>
                    <p className="channelsSelected">You have selected:</p>
                    {portfolio.map((channel, index) => { return <p id="selectedChannel" key={index} onClick={this.handleRemoveChannel}>{channel}</p> })}
                    <p className="channelError">{isChannelerror ? "You can only select a channel once. Please click on another channel to continue or remove it from the list." : ""}</p>
                    <p className="removeChannelMsg">Click on the channel name to remove it from the list.</p>
                </div>
            );
        }
    }

    handleRemoveChannel = ({ target: { innerText } }) => {
        const { isChannelerror } = this.state;
        if (isChannelerror) { this.setState({ isChannelerror: false }) };

        this.setState(currentState => {
            const newPortfolio = currentState.portfolio.filter(channel => channel !== innerText); //<- removes unwanted channel from state and list
            return { portfolio: newPortfolio };
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { accountNumber, portfolio } = this.state;

        this.props.setAccountDetails(accountNumber, portfolio); //<- sends account number and portfolio to App.js
        this.props.checkEligibility(accountNumber); //<- sends account number to Eligibilty Service
        this.setState({ accountNumber: "", portfolio: [] }); //<- resets state in AccountDetailsInputForm component state
    }

    render() {
        const { accountNumber, portfolio } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="formSection1">
                    <label>
                        Please input your Account Number:
                    <input id="accountNumberInput" type="text" value={accountNumber} onChange={this.handleAccountNumberInput} />
                    </label>
                    {this.accountNumberValidationMessage()}
                </div>
                <div className="formSection2">
                    <label>
                        Please choose the channels you are subscribed to:
                    <select id="selectChannelInput" multiple={true} value={portfolio} onChange={this.handleChannelSelection}>
                            {this.channels.map((channel, index) => { return <option key={index} value={index}>{channel}</option> })};
                    </select>
                    </label>
                    {this.composeSubscriptionMessageAndList()}
                </div>
                <div>
                    <input className="submitButton" type="submit" value="Submit" disabled={!portfolio.length} />
                </div>
            </form>
        );
    }
}

export default AccountDetailsInputForm;