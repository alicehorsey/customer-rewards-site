const { eligibilityData } = require("./data/eligibilityServiceTable")

//*** Eligibility Service Stub ***

const generateApiResponse = () => {

    const apiResponses = Object.keys(eligibilityData)

    const randomIndex = Math.floor(Math.random() * 4)

    const apiResponseCode = apiResponses[randomIndex]

    const apiResponseInformation = eligibilityData[apiResponseCode]

    return {
        response: {
            apiResponseCode, apiResponseInformation
        }
    }
}

module.exports = { generateApiResponse }