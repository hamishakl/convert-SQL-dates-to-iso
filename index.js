
var json = require('./Goals.json')

function iso(a){
    return new Date(a).toISOString()
}

for (let i = 0; i < json.length; i++) {
    json[i].achievementGoalDate = iso(json[i].achievementGoalDate)
    json[i].createdAt = iso(json[i].createdAt)
    json[i].updatedAt = iso(json[i].updatedAt)
}

let js = JSON.stringify(json)

var fs = require('fs');
fs.writeFile('GoalsUpdated.json', js, function(err, result) {
    if(err) console.log('error', err);
});

console.log(typeof json)