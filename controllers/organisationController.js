//there should not be any import of View/Text/Button here
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("organisations.db")

const Organisations = [
    {name: "National Library Board", id: 0,
        address: "100 Victoria Street #14-01, Singapore 188064",
        telephone: "+65 6332 3133",
        latitude: "1.29615",
        longitude: "103.85264",
        cluster: "none",
        crowd: 123},
    {name: "Babes Pregnancy Crisis Support", id: 1,
        address: "50 Raffles Place #17-01 Singapore Land Tower Singapore 048623",
        telephone: "+65 6206 6641",
        latitude: " 1.28454",
        longitude: "103.85195",
        cluster: "none",
        crowd: 56},
    {name: "Action for Singapore Dogs (ASD)", id: 2,
        address: "80 Lim Chu Kang Lane 1, Singapore 718911",
        telephone: "Not Provided",
        latitude: " 1.42313",
        longitude: "103.71692",
        cluster: "none",
        crowd: 292},
    {name: "National Environment Agency and CGS", id: 3,
        address: "40 Scotts Road #20-00, Singapore 228231",
        telephone: "(65) 6225 5632 (Office) 1800-2255 632",
        latitude: "1.31064",
        longitude: "103.83630",
        cluster: "none",
        crowd: 101},
    {name: "Silver Ribbon", id: 4,
        address: "Block 208 Serangoon Central, #01-238, Singapore 550208",
        telephone: "(65) 6386 1928",
        latitude: "1.35411",
        longitude: "103.87372",
        cluster: "none",
        crowd: 503},
    {name: "Singapore Council of Women’s Organisations", id: 5,
        address: "96 Waterloo Street Singapore 187967",
        telephone: "(65) 6837 0611",
        latitude: "1.29958",
        longitude: "103.85167",
        cluster: "none",
        crowd: 111},
    {name: "Yellow Ribbon", id: 6,
        address: "980 Upper Changi Road North Singapore 507708",
        telephone: "1800 741 5567",
        latitude: "1.35449",
        longitude: "103.97034",
        cluster: "none",
        crowd: 305},
    {name: "Youth Corps Singapore", id: 7,
        address: "The Red Box 113 Somerset Road Singapore 238165",
        telephone: "(65) 6908 2500",
        latitude: "1.30049",
        longitude: "103.83683",
        cluster: "none",
        crowd: 681},
    {name: "Very Special Arts Singapore", id: 8,
        address: "133 Bedok North Avenue 3 #01-138 Singapore 460133",
        telephone: "+65 6448 6275",
        latitude: " 1.32759",
        longitude: "103.93592",
        cluster: "none",
        crowd: 276},
    {name: "Willing Hearts", id: 9,
        address: "11 Jalan Ubi Blk 6, 01-51 Kembangan – Chai Chee Community Hub Singapore 409074",
        telephone: "+65 6743 0725, +65 6743 0705, +65 6476 5822",
        latitude: "1.31730",
        longitude: "103.89977",
        cluster: "none",
        crowd: 401},
    {name: "Singapore Association for the Deaf ", id: 10,
        address: "227 Mountbatten Rd, Singapore 397998",
        telephone: "+65 6344 8274",
        latitude: "1.30783",
        longitude: "103.87986",
        cluster: "none",
        crowd: 713},
    {name: "St. Hilda’s Community Services", id: 11,
        address: "10 Jln Batu, Singapore 431010",
        telephone: "+65 6345 0054",
        latitude: "1.30232",
        longitude: "103.88259",
        cluster: "none",
        crowd: 420},
    {name: "Animal Concerns Research and Education Society (ACRES)", id: 12,
        address: "91 Jalan Lekar Singapore 698917",
        telephone: "+65 6892 9821",
        latitude: "1.38589",
        longitude: "103.72442",
        cluster: "none",
        crowd: 133},
    {name: "Beyond Social Services", id: 13,
        address: "26 Jalan Klinik 01-42/52 Singapore 160026",
        telephone: "+65 6375 2940",
        latitude: "1.28817",
        longitude: "103.82845",
        cluster: "none",
        crowd: 426},
]

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}


export function distancecalc(lat1, lon1,lat2,lon2){
    //finds straight line distance from two lat/long coordinates
    const earthRadiusKm = 6371;

    var dLat = degreesToRadians(Math.abs(lat2-lat1));
    var dLon = degreesToRadians(Math.abs(lon2-lon1));

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
}

export function filterOrganisation(userloc){
    var filtered=[]
    if (userloc === null) return ([]);
    for (let i=0; i<Organisations.length; i++){
        const Organisation = Organisations[i]
        if (distancecalc(Organisation.latitude,Organisation.longitude,userloc.latt,userloc.longt)<6){
        filtered.push(Organisation);
        }
    }
    return filtered;
}


