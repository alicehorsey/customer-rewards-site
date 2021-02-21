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
module.exports = { insertChannelNames }