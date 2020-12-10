export const decHex = (decimalPercentage) => {
    return Math.floor(decimalPercentage * 255).toString(16)
}

export const hexAlpha = (hexValue, alphaDec) => {
    let alphaVal = decHex(alphaDec)

    // Sometimes there are conversion errors, in this case just return the given hex value
    if(isNaN(alphaVal)) return hexValue;
    
    return(hexValue+alphaVal)
}
