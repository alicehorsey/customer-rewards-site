import React, { Component } from 'react';

class ViewRewards extends Component {

    state = {
        rewards: {
            SPORTS: {
                code: "CHAMPIONS_LEAGUE_FINAL_TICKET",
                message: "A ticket to the Champion League Final"
            },
            KIDS: {
                code: "N/A",
                message: "Sorry there are no rewards for KIDS channel subscribers at this time."
            },
            MUSIC: {
                code: "KARAOKE_PRO_MICROPHONE",
                message: "A Karaoke Pro Microphone"
            },
            NEWS: {
                code: "N/A",
                message: "Sorry there are no rewards for NEWS channel subscribers at this time."
            },
            MOVIES: {
                code: "PIRATES_OF_THE_CARIBBEAN_COLLECTION",
                message: "The Pirates of the Caribbean movie collection"
            }
        },
        customerRewards: []
    }

    componentDidMount = () => {
        const { portfolio } = this.props;
        const { rewards } = this.state;

        portfolio.forEach((channel) => {
            if (channel === "SPORTS") {
                return this.setState(prevState => ({
                    customerRewards: [...prevState.customerRewards, rewards.SPORTS]
                }))
            } else if (channel === "MUSIC") {
                return this.setState(prevState => ({
                    customerRewards: [...prevState.customerRewards, rewards.MUSIC]
                }))
            } else if (channel === "MOVIES") {
                return this.setState(prevState => ({
                    customerRewards: [...prevState.customerRewards, rewards.MOVIES]
                }))
            }
        })
    }

    composeSorryNoRewardsMessage = () => {
        const { portfolio } = this.props;

        const channelNames = [];
        portfolio.map(channel => { if (channel === "KIDS" || channel === "NEWS") return channelNames.push(channel) });

        return channelNames.length === 1 ? `There are no rewards for ${channelNames[0]} subscribers at this time.` : `There are no rewards for ${channelNames[0]} and ${channelNames[1]} subscribers at this time.`;
    }


    render() {
        const { customerRewards, rewards } = this.state;
        const { portfolio } = this.props;

        return (
            <div>
                <h2>{customerRewards.length > 0 ? "Congratulations you are eligible for the following rewards:" : "Sorry"}</h2>
                {
                    customerRewards.length > 0 ? customerRewards.map(reward => {
                        //this number is the same as the reward id
                        return <h3>{reward.message}</h3>
                    }) : <h3>{this.composeSorryNoRewardsMessage()}</h3>
                }
            </div >
        );
    }


}


export default ViewRewards;