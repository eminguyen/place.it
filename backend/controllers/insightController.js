const getTreeData = require("../insights/tree");
const getTransitData = require("../insights/transit");
const getParkingData = require("../insights/parking");
const getCrimes = require("../insights/crime");
const getHouseData = require("../insights/house");
const getPollution = require("../insights/pollution");
const calculateRating = require("../insights/rating");
const parallel = require("../utils/parallel")

const dummyData = {
    "transit": {
        "rating": 2,
        "walk": {
          "score": 51,
          "description": "Somewhat Walkable",
          "rating": 2
        },
        "transit": {
          "score": 55,
          "description": "Good Transit",
          "summary": "5 nearby routes: 5 bus, 0 rail, 0 other",
          "rating": 2
        },
        "bike": {
          "score": 41,
          "description": "Somewhat Bikeable",
          "rating": 2
        },
        "detailLink": "https://www.walkscore.com/score/loc/lat=34.0791772265245/lng=-118.406784658529/?utm_source=ronakshah.net&utm_medium=ws_api&utm_campaign=ws_api"
      },
    crimes: {
        crimes: 4,
        rating: 4
    },
    houseData: {
        taxes: 57614,
        land_value: 3876115,
        rating: 4
    }
}


exports.handle_get_insight = async (req, res) => {

    const parameters = {
        lat : req.query.lat,
        lng : req.query.lng,
        type : req.query.type,
        width : req.query.width,
        length : req.query.length,
        useApis : req.query.useApis,

        squareFootage : req.query.squareFootage,
        occupants : req.query.occupants,
        height : req.query.height,
    }
    const calculateProperty = req.query.calculateProperty;

    let errors = []
    for (let param in parameters) {
        if (parameters[param] == undefined) {
            errors.push(`${param} was not specified\n`)
        }
    }
    
    if (errors.length != 0) {
        res.status(422);
        res.json(errors);
        res.end();
    } else {
        
        try {

            let parkingSpaces = getParkingData(parameters.type, parameters.squareFootage, parameters.occupants);
            let pollution = getPollution(parameters.squareFootage);

            let {trees, transit, crimes, houseData} = await parallel({
                trees: (callback) => {
                    getTreeData(parameters.lat, parameters.lng, parameters.width, parameters.length).then(result => {
                        callback(null, result);
                    })
                },
                transit: (callback) => {
                    if (parameters.useApis == 1) {
                        getTransitData(parameters.lat, parameters.lng).then(result => {
                            callback(null, result);
                        })
                    } else {
                        callback(null, dummyData.transit);
                    }
                },
                crimes: (callback) => {
                    if (parameters.useApis == 1) {
                        getCrimes(parameters.lat, parameters.lng).then(result => {
                            callback(null, result);
                        })
                    } else {
                        callback(null, dummyData.crimes);
                    }
                },
                houseData: (callback) => {
                    if (calculateProperty == "no") {
                        callback(null, dummyData.houseData);
                    } else if (parameters.useApis == 1) {
                        getHouseData(parameters.lat, parameters.lng).then(result => {
                            callback(null, result);
                        })
                    } else {
                        callback(null, dummyData.houseData);
                    }
                }
            })
            
            let {rating, tips} = calculateRating(trees, parkingSpaces, pollution, transit, crimes, houseData);

            res.status(200);
            res.json({
                rating: rating,
                trees: trees,
                carbon: pollution,
                transit: transit,
                parkingSpaces: parkingSpaces,
                crimes: crimes,
                house: houseData,
                dummyData: parameters.useApis != 1,
                tips: tips
            });
        } catch(err) {
            console.log(err)
            res.status(500);
            res.json({
                error: err
            })
        }
    }
}