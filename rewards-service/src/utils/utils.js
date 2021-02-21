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
module.exports = { isAccountNumberValid, insertChannelNames }