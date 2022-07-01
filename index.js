let arr = ['Exercise', 'Goals', 'Pr', 'User', 'Volume', 'Workout']


let file 
for (let i = 0; i < arr.length; i++) {
    file = arr[i]
    changeDates(file)
}

function iso(a){
    return new Date(a)
}
function changeDates(file) {

    var json = require(`./${file}.json`)
    
    
    for (let i = 0; i < json.length; i++) {
        'createdAt' in json[i] ? json[i].createdAt = iso(json[i].createdAt) : null;
        'updatedAt' in json[i] ? json[i].updatedAt = iso(json[i].updatedAt) : null;
        'achievementGoalDate' in json[i] ? json[i].achievementGoalDate = iso(json[i].achievementGoalDate) : null;
        'achievementDate' in json[i] ? json[i].achievementDate = iso(json[i].achievementDate) : null;
        'date' in json[i] ? json[i].date = iso(json[i].date) : null;
    }
    
    
    let js = JSON.stringify(json)
    
    var fs = require('fs');
    fs.writeFile(`${file}Updated.json`, js, function(err, result) {
        if(err) console.log('error', err);
    });
    return (
        console.log('done')   
    )
}