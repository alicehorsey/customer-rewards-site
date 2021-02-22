import React, { Component } from 'react';
import { rewardsData } from "../data/rewardsServiceTable";
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
        //channelNames is an array of channel the user has said they are subscribed to but do not receive rewards
        const channelNames = portfolio.filter(channel => { if (rewardsData[channel].code === "N/A") return channel });

        return `Sorry, there are no rewards for ${insertChannelNames(channelNames)} subscribers at this time.`;
    }

    composeRewardsMessage = () => {
        const { customerRewards } = this.state;
        if (customerRewards.length > 0) {
            return (
                <div>
                    <h2>Congratulations you are eligible for the following rewards:</h2>
                    {customerRewards.map(reward => {
                        return <h3>{reward.message}</h3>
                    })}
                </div>
            )
        } else {
            return (
                <div>
                    <h2>{this.composeSorryNoRewardsMessage()}</h2>
                </div>
            )
        }
    }

    render() {

        console.log(this.props)
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