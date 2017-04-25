const himawari = require('himawari');
const uuid = require('node-uuid');
const Promise = require("bluebird");
// const Repeat = require('repeat');
const cron = require('node-cron');
let count = 0;

function getImage() {
    const timeUUid = uuid.v1();
    const filename = `/Users/jhill/Pictures/earth/earth-${timeUUid}.JPG`;

    return new Promise(function(resolve, reject) {
        himawari({
            zoom: 3,
            date: 'latest', // Or new Date() or a date string
            debug: false,
            infrared: false,
            outfile: filename,
            parallel: true,
            skipEmpty: true,
            timeout: 30000,
            urls: false,
            success: function () { 
                count++;
                resolve(`${count} image done`);
            },
            error: function (err) { 
                reject(new Error('problem in himawari, uh oh'));
            },
            /**
             * A callback that is fired every time a tile has been downloaded.
             * @param  {Object} info Information about the download such as filepath, part, and total images
             */
            chunk: function (info) {
                console.log(`${count+1} image progress` + ': ' + info.part + '/' + info.total);
            }
        });
    });
};



 
let task = cron.schedule('*/10 * * * *', function(){
    console.log('starting...');
  getImage()
    .then(doneMessage => {
        console.log(doneMessage);
    })
    .catch(error => {
        error.log(error);
    });
}, true);

// var task = cron.schedule('* * * * *', function() {
//   console.log('immediately started');
// }, false);
 
task.start();

// Repeat(
//     getImage()
//     .then(doneMessage => {
//     console.log(doneMessage);
//     return done;
//     })
//     .catch(error => {
//     error.log(error);
//     })
// )
//        .every(600000, 'ms')
//        .for(2240, 'minutes')
//        .start.in(3, 'secs');
       