import React, { Component } from 'react';
import { rewardsData } from "../rewardsService/data/rewardsServiceTable";
import { insertChannelNames } from '../utils/utils';

class ViewRewards extends Component {

    state = {
        customerRewards: []
    }

    componentDidMount = () => {
        const { portfolio } = this.props;

        portfolio.forEach((channel) => {
            if (rewardsData[channel].code !== "N/A") {
                return this.setState(prevState => ({
                    customerRewards: [...prevState.customerRewards, rewardsData[channel]]
                }))
            }
        }) //this saves the rewards objects for the channels that the customer is eligible for in the state
    }

    composeSorryNoRewardsMessage = () => {
        const { portfolio } = this.props;

        //channelNames is an array of channels the user has said they are subscribed to which are not offering rewards
        const channelNames = portfolio.filter(channel => { if (rewardsData[channel].code === "N/A") return channel });

        return `Sorry, there are no rewards for ${insertChannelNames(channelNames)} subscribers at this time.`;
    }

    composeRewardsMessage = () => {
        const { customerRewards } = this.state;
        const { eligibilityCode, eligibilityInformation } = this.props;

        if (eligibilityCode === "CUSTOMER_ELIGIBLE" && customerRewards.length > 0) {
            return (
                <div>
                    <h2>Congratulations you are eligible for the following rewards:</h2>
                    {customerRewards.map(reward => {
                        return <h3>{reward.message}</h3>
                    })}
                </div>
            )

        } else if (eligibilityCode === "CUSTOMER_ELIGIBLE" && !customerRewards.length) {
            return <h2>{this.composeSorryNoRewardsMessage()}</h2>

        } else if (eligibilityCode === "CUSTOMER_INELIGIBLE") {
            return <h2>Sorry you are not eligible for any rewards at this time.</h2>

        } else if (eligibilityCode === "Technical_failure_exception") {
            return <h2>{eligibilityInformation.description}.</h2>

        } else if (eligibilityCode === "Invalid_account_number_exception") {
            return <h2>{eligibilityInformation.description}.</h2>
        }
    }

    render() {
        return (
            <div>
                {this.composeRewardsMessage()}
                <button className="checkAgainButton" onClick={this.props.resetDetails}>Check Again
                </button>
            </div>
        )
    }
}


export default ViewRewards;