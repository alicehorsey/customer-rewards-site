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
        return <p>{isAccountNumberValid(accountNumber) ? "Account number valid" : "Account number should be 12 digits"}</p>
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
                    <h4>You are subscribed to:</h4>
                    {portfolio.map((channel, index) => { return <p key={index} onClick={this.handleRemoveChannel}>{channel}</p> })}
                    <p >{isChannelerror ? "You can only select a channel once." : ""}</p>
                    <p>Click on the channel name to remove it from the list.</p>
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

        this.props.updateAccountDetails(accountNumber, portfolio); //<- sends account number and portfolio to App.js
        this.setState({ accountNumber: "", portfolio: [] }); //<- resets state in AccountDetailsInputForm component state
    }

    render() {
        const { accountNumber, portfolio } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Please input your Account Number:
                    <input type="text" value={accountNumber} onChange={this.handleAccountNumberInput} />
                </label>
                {this.accountNumberValidationMessage()};

                <label>
                    Please choose the channels you are subscribed to:
                    <select multiple={true} value={portfolio} onChange={this.handleChannelSelection}>
                        {this.channels.map((channel, index) => { return <option key={index} value={index}>{channel}</option> })};
                    </select>
                </label>
                {this.composeSubscriptionMessageAndList()};

                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default AccountDetailsInputForm;