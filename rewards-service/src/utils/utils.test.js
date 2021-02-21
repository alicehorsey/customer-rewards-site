const { isAccountNumberValid, insertChannelNames } = require("../utils/utils")

describe("Testing Validate Account Number Function", () => {
    test("When given an empty string, returns false", () => {
        expect(isAccountNumberValid("")).toBe(false)
    })
    test("When given a string of less than or greater than 12 numbers, returns true", () => {
        expect(isAccountNumberValid("1234")).toBe(false)
        expect(isAccountNumberValid("12345678901234")).toBe(false)
    })
    test("When given a string of 12 numbers, returns true", () => {
        expect(isAccountNumberValid("123456789012")).toBe(true)
    })
    test("If the digits in the string are not all numbers returns false", () => {
        expect(isAccountNumberValid("123abcd4567e")).toBe(false)
    })
})

describe("Testing Insert Channel Names Function", () => {
    test("When given an empty array, returns an empty string", () => {
        expect(insertChannelNames([])).toBe("")
    })
    test("When given an array with one channel name in, returns a string with that channel name", () => {
        expect(insertChannelNames(["KIDS"])).toBe("KIDS")
    })
    test("When given an array with two channel names in, returns a string with those two channel names separated by an 'and'", () => {
        expect(insertChannelNames(["KIDS", "NEWS"])).toBe("KIDS and NEWS")
    })
    test("When given an array with more than two channel names in, returns a string with those channel names separated by commas up until the last channel name when an 'and' is used", () => {
        expect(insertChannelNames(["KIDS", "NEWS", "MOVIES", "SPORTS"])).toBe("KIDS, NEWS, MOVIES and SPORTS")
    })
})