/* Task 2 : A multi pick up and drop shipment is to be divided into multiple trips,
mention the logic to figure out of the given list of trips are legit and fulfils
the shipment with typescript. (Please note:  A shipment can have multiple pick up
points and drop points, and a trip can also have multiple pick up points ,
drop points and an additional option of a warehouse a via point.)
Example:  
For a shipment with Pick ups : (A, B), Drop points (C,D),
a) Valid set of trips are :  Trip 1: (A,W), Trip 2: (B, W), Trip 3: (W,C), Trip 4: (W, D).
b) Invalid set of trips are : Trip 1: (A,W1), Trip 2: (B, W2), Trip 3: (W3,C), Trip 4: (W4, D). 
*/


/* Assumptions: 
1) Each trip will be via 1 warehouse "W".
2) The "tripsToBeVerified" array is sorted starting position to ending position wise.
*/

const pickups: string[] = ['A', 'B'];
const drops: string[] = ['C', 'D'];

type Route = {
    start: string;
    end: string;
};

const listToBeVerified: Route[] = [
    {
        start: 'A',
        end: 'W'
    },
    {
        start: 'B',
        end: 'W'
    },
    {
        start: 'W',
        end: 'C'
    },
    {
        start: 'W',
        end: 'D'
    },
];

/**
 * validate the trips array
 * 
 * @param {string[]} pickups - Array of pickup locations
 * @param {string[]} drops - Array of drop locations
 * @param {string[]} listToBeVerified - Array of trips to be verified
 * @returns {boolean} true or false.
 */
function checkListValidity(pickups: string[], drops: string[], listToBeVerified: Route[]){
    
    let totalTrips = pickups.length * drops.length;
    let finalTrips: string[] = [];
    let allTripCombiantions: string[] = [];

    // STEP 1: MAKE AN ARRAY OF ALL THE POSSIBLE TRIPS IN "listToBeVerified" ARRAY.
    // e.g. The "listToBeVerified" will become [ 'A,W,C', 'A,W,D', 'B,W,C', 'B,W,D' ]
    for(let i: number = 0; i < listToBeVerified.length; i++){
        for(let j: number = i + 1; j < listToBeVerified.length; j++){
           // concat the trips which are via same warehouse
           // e.g. trip from A to C via W will become "A,W,C"
           if(listToBeVerified[i].end === listToBeVerified[j].start){
            finalTrips.push(`${listToBeVerified[i].start},${listToBeVerified[i].end},${listToBeVerified[j].end}`);
           }
        }
    }

    // STEP 2: MAKE ALL POSSIBLE VALID PERMUTATIONS USING "pickusp" AND "drops" array
    // e.g. The pemuation array of "pickups" and "drops" will become [ 'A,W,C', 'A,W,D', 'B,W,C', 'B,W,D' ]
    for(let pickup of pickups){
        for(let drop of drops){
            allTripCombiantions.push(`${pickup},W,${drop}`);
        }
    }

    console.log(finalTrips)
    console.log(allTripCombiantions)

    // compare both arrays
    if (finalTrips.length !== allTripCombiantions.length) {
        return false;
    }

    // Sort both arrays
    const sortedDinalTrips = finalTrips.slice().sort();
    const sortedAllTripCombination = allTripCombiantions.slice().sort();

    // Compare each element
    for (let i = 0; i < sortedDinalTrips.length; i++) {
        if (sortedDinalTrips[i] !== sortedAllTripCombination[i]) {
            return false;
        }
    }
    return true;
}


const validity = checkListValidity(pickups, drops, listToBeVerified);
console.log(validity);