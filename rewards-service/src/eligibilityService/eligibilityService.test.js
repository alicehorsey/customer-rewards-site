const { generateApiResponse } = require("./eligibilityService")

describe("Testing stud Eligibility Service API", () => {
    test("Return value is an object with the key of response", () => {
        expect(Object.keys(generateApiResponse())[0]).toBe("response")
    })
    test("Response has two keys of apiResponseCode and apiResponseInformation", () => {
        expect(Object.keys(generateApiResponse().response)).toEqual(['apiResponseCode', 'apiResponseInformation'])
    })
})