const decimalFactorsMap = new Map([[1, 10], [2, 100], [3, 1000], [4, 10000], [5, 100000], [6, 1000000], [7, 10000000], [8, 100000000]])
// This could be achieved by converting to string, doing a simple loop to add '0' n times and convert back to number
// but as it is used on a dragged element
export const roundWithDecimal = (numberToRound, decimalCount) => {
    const multiplier = decimalFactorsMap.get(decimalCount)
    return Math.round(numberToRound * multiplier) / multiplier
}
