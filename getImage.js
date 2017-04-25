var himawari = require('himawari');

himawari({

  /**
   * The zoom level of the image. Can be 1-5 for non-infrared, and 1-3 for infrared (default: 1)
   * Each zoom level requires more images to be downloaded and therefore stitched
   * together. Higher zoom yields a higher resolution image.
   * @type {Number}
   */
  zoom: 2,

  /**
   * The time of the picture desired. If you want to get the latest image, use 'latest'
   * @type {String|Date}
   */
  date: 'latest', // Or new Date() or a date string

  /**
   * Turns on logging
   * @type {Boolean}
   */
  debug: false,

  /**
   * If set to true, an image on the infrared light spectrum will be generated. Please note that
   * infrared only supports zooms up to 3
   * @type {Boolean}
   */
  infrared: false,

  /**
   * The location to save the resulting image
   * @type {String}
   */
  outfile: '/Users/jhill/Pictures/earth/earth.JPG',

  /**
   * Set to true to parallelize tile downloads. Can be CPU intensive but decreases time to download images.
   * @type {Boolean}
   */
  parallel: true,

  /**
   * Skip empty images from being saved
   * @type {Boolean}
   */
  skipEmpty: true,

  /**
   * The max duration in milliseconds before requests for images and data times out
   * @type {Number}
   */
  timeout: 30000,

  /**
   * If true, only prints the URLs of the images that would have been downloaded
   * @type {Boolean}
   */
  urls: false,

  /**
   * A success callback if the image downloads successfully
   * @type {Function}
   */
  success: function () { 
    console.log('image downloaded!');
    process.exit(); 
  },

  /**
   * A callback if the image cannot be downloaded or saved
   * @type {Function}
   * @param  {Object} err An error object or information surrounding the issue
   */
  error: function (err) { console.log('yo, an error!...', err); },

  /**
   * A callback that is fired every time a tile has been downloaded.
   * @param  {Object} info Information about the download such as filepath, part, and total images
   */
  chunk: function (info) {
    console.log(info.outfile + ': ' + info.part + '/' + info.total);
  }
});