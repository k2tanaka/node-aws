
/**
 *
 * @see https://github.com/aws/aws-sdk-js
 * @see http://docs.amazonwebservices.com/AWSJavaScriptSDK/latest/frames.html
 *
 */


var AWS = require('aws-sdk');
var S3 = require('./s3');

// TODO
var options = {
    accessKeyId:  '',
    secretAccessKey: '',
    region: 'ap-northeast-1'
};

function AwsApi() {
    AWS.config.update({
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
        region: options.region
    });

    // init service
    S3.init(AWS);

}

module.exports = new AwsApi();


// S3
AwsApi.prototype.S3 = {

    // all bucket list
    buckets: function (callback) {
        S3.buckets(function (err, data) {
            return callback(null, data);
        });
    },

    // object
    objects: function (bucket, marker, callback) {
        S3.objects(bucket, marker, function (err, data) {
            return callback(null, data);
        });
    }
};

