/**
 * Performs extremely advanced machine learning (trust us) that has been reduced to 2 numbers.
 * Full notebook available in GitHub —> https://github.com/gits-lit/place.it/tree/master/backend/modules/ratingApi
 */
module.exports = function(squareFootage) {
    let intercept = 39.50294435044748;
    let coef = 0.003417097532735685;
    let carbon = coef * squareFootage + intercept;
    return {
        carbon: carbon,
        rating: (carbon > 100) ? "bad" : (carbon > 50) ? "okay" : "amazing!"
    }
}