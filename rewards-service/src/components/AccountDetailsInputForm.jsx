import React, { Component } from 'react';
import { rewardsData } from "../data/rewardsServiceTable";

class AccountDetailsInputForm extends Component {

    state = {
        accountNumber: "",
        portfolio: [],
        isChannelerror: false
    }

    channels = Object.keys(rewardsData) //<--- ["SPORTS", "KIDS", "MUSIC", "NEWS", "MOVIES"] but could add to the channel data and the new channels would be there

    handleAccountNumberInput = (event) => {
        this.setState({ accountNumber: event.target.value })
    }

    handleChannelChange = (event) => {
        const { value } = event.target
        const { portfolio, isChannelerror } = this.state;

        if (isChannelerror) {
            this.setState({ isChannelerror: false })
        }
        if (portfolio.includes(this.channels[value])) {
            return this.setState({ isChannelerror: true })
        } else {
            return this.setState(prevState => ({
                portfolio: [...prevState.portfolio, this.channels[value]]
            }))
        }
    }

    handleRemoveChannel = (event) => {
        const { portfolio, isChannelerror } = this.state
        if (isChannelerror) {
            this.setState({ isChannelerror: false })
        }
        const indexToDelete = portfolio.indexOf(event.target.innerText)

        portfolio.splice(indexToDelete, 1) //<-- //remove unwanted channel from list
        this.setState({ portfolio }) //<-- set state to refresh page showing channel deleted
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { accountNumber, portfolio } = this.state;
        this.props.updateAccountDetails(accountNumber, portfolio)
        this.setState({
            accountNumber: "",
            portfolio: []
        })
    }

    render() {
        const { accountNumber, portfolio, isChannelerror } = this.state

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Please input your Account Number:
                    <input type="text" name="accountNumber" value={accountNumber} onChange={this.handleAccountNumberInput} />
                </label>
                <p>{accountNumber.length !== 0 && accountNumber.length !== 12 ? "Account number needs to be 12 digits in length." : ""}</p>

                <label>
                    Please choose the channels you are subscribed to:
                    <select multiple={true} value={portfolio} onChange={this.handleChannelChange}>
                        {this.channels.map((channel, index) => {
                            return <option key={index} value={index}>{channel}</option>
                        })}
                    </select>
                </label>

                <h4>{portfolio.length > 0 ? "You are subscribed to:" : ""}
                </h4>
                {portfolio.map((portfolioChannel, index) => {
                    return <p key={index} onClick={this.handleRemoveChannel}>{portfolioChannel}</p>
                })}
                <p hidden={!isChannelerror}>You can only select a channel once. Choose on a different channel to continue.</p>

                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default AccountDetailsInputForm;