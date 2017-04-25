const himawari = require('himawari');
const Promise = require("bluebird");
const cron = require('node-cron');
let count = 0;

const getImage = () => {
    const timeStamp = Date.now();
    const filename = `/Users/jhill/Pictures/earth/earth-${timeStamp}.JPG`;

    return new Promise((resolve, reject) => {
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
            success: () => { 
                count++;
                resolve(`${count} image done`);
            },
            error: err => { 
                reject(new Error('problem in himawari, uh oh'));
            },
            // chunk is fired for each piece as it is downloaded
            chunk: info => {
                console.log(`${count+1} image progress` + ': ' + info.part + '/' + info.total);
            }
        });
    });
};

// set to run our task every 10 minutes
let task = cron.schedule('*/10 * * * *', () => {
    console.log('starting...');
    getImage()
        .then(doneMessage => {
            console.log(doneMessage);
        })
        .catch(error => {
            error.log(error);
        });
    }, true);
 
task.start();
