import React, { Component } from 'react';
import { rewardsData } from "../data/rewardsServiceTable";

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

    insertChannelNames = (channelNames) => {
        let response = ""
        channelNames.forEach((channel, index) => {
            if (index === channelNames.length - 1) {
                response += `${channel}`
            } else if (index === channelNames.length - 2) {
                response += `${channel} and `
            } else {
                response += `${channel}, `
            }
        })
        return response;
    }

    composeSorryNoRewardsMessage = () => {
        const { portfolio } = this.props;
        const channelNames = portfolio.filter(channel => { if (rewardsData[channel].code === "N/A") return channel });

        return `There are no rewards for ${this.insertChannelNames(channelNames)} subscribers at this time.`;
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
                    <h2>Sorry</h2>
                    <h3>{this.composeSorryNoRewardsMessage()}</h3>
                </div>
            )
        }
    }

    render() {
        return this.composeRewardsMessage();
    }
}


export default ViewRewards;