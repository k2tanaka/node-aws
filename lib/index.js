
/**
 * @fileOverview aws-sdk wrapper modules.
 * @name index.js
 * @author Kiyoshi Tanaka <k2tanaka@gmail.com>
 * @see https://github.com/aws/aws-sdk-js
 * @see http://docs.amazonwebservices.com/AWSJavaScriptSDK/latest/frames.html
 */

var AWS = require('aws-sdk');
var S3 = require('./s3');

/**
 * AwsApi
 * @param {Object} options {accessKeyId: required, secretAccessKey:required, region: optional}
 */
function AwsApi(options) {
    if (!options || !options.accessKeyId || !options.secretAccessKey) {
        throw new Error('options not found.');
    }

    var opts = {
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
    };
    if (options.region) opts.region = options.region;
    AWS.config.update(opts);

    // init service
    S3.setup(AWS);
}

module.exports = AwsApi;

/**
 * S3 API: all buckets name list
 * @param {Function} callback
 */
AwsApi.prototype.s3_buckets = function s3_buckets(callback) {

    S3.buckets(function (err, data) {
        return callback(null, data);
    });
};

/**
 * S3 API: return the s3 object
 * @param {String} bucket bucket_name
 * @param {String} marker directory start_point ex) stat/
 * @param {Function} callback
 */
AwsApi.prototype.s3_objects = function s3_objects(bucket, marker, callback) {

    S3.objects(bucket, marker, function (err, data) {
        return callback(null, data);
    });

};
