import React, { Component } from 'react';

class InputAccountDetails extends Component {

    state = {
        channels: ["SPORTS", "KIDS", "MUSIC", "NEWS", "MOVIES"],
        accountNumber: "",
        portfolio: [],
        isChannelerror: false
    }

    sendAccountDetailsToApp = () => {
        const { accountNumber, portfolio } = this.state;
        this.props.updateAccountDetails(accountNumber, portfolio)
        this.setState({
            accountNumber: "",
            portfolio: []
        })
    }

    handleAccountNumberInput = (event) => {
        this.setState({ accountNumber: event.target.value })
    }

    handleChannelChange = (event) => {
        const { value } = event.target
        const { channels, portfolio, isChannelerror } = this.state;
        if (isChannelerror) {
            this.setState({ isChannelerror: false })
        }

        if (portfolio.includes(channels[value])) {
            return this.setState({ isChannelerror: true })
        } else {
            return this.setState(prevState => ({
                portfolio: [...prevState.portfolio, channels[value]]
            }))
        }
    }

    handleChannelErrorOkButton = () => {
        this.setState({ isChannelerror: false })
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
        // const { accountNumber, portfolio } = this.state
        event.preventDefault()
        this.sendAccountDetailsToApp();
    }

    render() {
        const { accountNumber, channels, portfolio, isChannelerror } = this.state

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Please input your Account Number:
                    <input type="text" name="accountNumber" value={accountNumber} onChange={this.handleAccountNumberInput} />
                </label>
                <p>{accountNumber.length !== 12 ? "Account number needs to be 12 digits in length." : ""}</p>

                <label>
                    Please choose the channels you are subscribed to:
                    <select multiple={true} value={portfolio} onChange={this.handleChannelChange}>
                        {channels.map((channel, index) => {
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

export default InputAccountDetails;