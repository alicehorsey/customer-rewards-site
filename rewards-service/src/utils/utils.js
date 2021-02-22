const isAccountNumberValid = (accountNumber) => {
    const allDigits = accountNumber.match(/^[0-9]+$/) != null;
    return allDigits && accountNumber.length === 12 ? true : false;
}

const insertChannelNames = (channelNames) => {
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

//This function generates a random number between 0 and 3 (inclusive) for Eligibilty Spike.
//There are 4 possible outcome from Eligibilty Service - these will be saved in an array so the random numbers are the array indexes.
const generateRandomNumber = () => { return Math.floor(Math.random() * 4) };
console.log(generateRandomNumber())

module.exports = { isAccountNumberValid, insertChannelNames, generateRandomNumber }