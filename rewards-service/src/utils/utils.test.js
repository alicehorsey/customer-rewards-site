const { insertChannelNames } = require("../utils/utils")

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