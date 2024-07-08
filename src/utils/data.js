const getMonthsInYears = (years) => {
    return years * 12
}

export default {

    letOffTypes: [
        {slug: "Rent", name: "Rent"},
        {slug: "Sell", name: "Sell"},
        {slug: "Lease", name: "Lease"},
    ],

    propertyStatus: [
        {slug: "Published", name: "Published"},
        {slug: "Unpublished", name: "Unpublished"},
        {slug: "Draft", name: "Draft"},
    ],

    tenures: [
        {slug: 1, name: '1 Month'},
        {slug: 6, name: '6 Months'},
        {slug: getMonthsInYears(1), name: '1 Year'},
        {slug: getMonthsInYears(2), name: '2 Years'},
        {slug: getMonthsInYears(3), name: '3 Years'},
        {slug: getMonthsInYears(4), name: '4 Years'},
        {slug: getMonthsInYears(5), name: '5 Years'},
        {slug: getMonthsInYears(6), name: '6 Years'},
        {slug: getMonthsInYears(7), name: '7 Years'},
        {slug: getMonthsInYears(8), name: '8 Years'},
        {slug: getMonthsInYears(9), name: '9 Years'},
        {slug: getMonthsInYears(10), name: '10 Years'},
        {slug: getMonthsInYears(11), name: '11 Year'},
        {slug: getMonthsInYears(12), name: '12 Years'},
        {slug: getMonthsInYears(13), name: '13 Years'},
        {slug: getMonthsInYears(14), name: '14 Years'},
        {slug: getMonthsInYears(15), name: '15 Years'},
        {slug: getMonthsInYears(16), name: '16 Years'},
        {slug: getMonthsInYears(17), name: '17 Years'},
        {slug: getMonthsInYears(18), name: '18 Years'},
        {slug: getMonthsInYears(19), name: '19 Years'},
        {slug: getMonthsInYears(20), name: '20 Years'},
    ],

    percentage10: [
        {slug: 0.0, name: '0%'},
        {slug: 0.01, name: '1%'},
        {slug: 0.02, name: '2%'},
        {slug: 0.03, name: '3%'},
        {slug: 0.04, name: '4%'},
        {slug: 0.05, name: '5%'},
        {slug: 0.06, name: '6%'},
        {slug: 0.07, name: '7%'},
        {slug: 0.08, name: '8%'},
        {slug: 0.09, name: '9%'},
        {slug: 0.10, name: '10%'},
    ],

    percentage5: [
        {slug: 0.0, name: '0%'},
        {slug: 0.01, name: '1%'},
        {slug: 0.02, name: '2%'},
        {slug: 0.03, name: '3%'},
        {slug: 0.04, name: '4%'},
        {slug: 0.05, name: '5%'},
    ]

}