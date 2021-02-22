const eligibilityData = {
    CUSTOMER_ELIGIBLE: {
        description: "Customer is eligible",
        result: "Return relevant rewards according to the customer's portfolio"
    },
    CUSTOMER_INELIGIBLE: {
        description: "Customer is not eligible",
        result: "Return no rewards"
    },
    Technical_failure_exception: {
        description: "Service technical failure",
        result: "Return no rewards"
    },
    Invalid_account_number_exception: {
        description: "The supplied account number is invalid",
        result: "Return no rewards and notify the client that the account number is invalid"
    }
};

module.exports = { eligibilityData };