
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

    // set api options
    var opts = {
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
        maxRetries: 1
    };
    if (options.region) {
        opts.region = options.region;
    }
    AWS.config.update(opts);

    // setup service
    S3.setup(AWS);
}

module.exports = AwsApi;


/**
 * S3 API
 */
AwsApi.prototype.s3 = {

    /**
     * s3 object meta data
     */
    META_DATA: {
        CACHE_CONTROL: 'CacheControl',
        CONTENT_ENCODING: 'ContentEncoding',
        CONTENT_TYPE: 'ContentType',
        EXPIRES: 'Expires'
    },

    /**
     * all buckets name list
     * @param {Function} callback
     */
    buckets: function (callback) {
        S3.buckets(function (err, data) {
            return callback(err, data);
        });
    },

    /**
     * return the s3 object
     * @param {String} bucket bucket_name
     * @param {String} marker directory start_point ex) stat/
     * @param {Function} callback
     */
    objects: function (bucket, marker, callback) {

        S3.objects(bucket, marker, function (err, data) {
            return callback(err, data);
        });
    },

    /**
     * upload s3 object
     * @param {String} bucket bucket_name
     * @param {String} key object_key *full path ex) a_dir/b_dir/c_dir/file.txt
     * @param {String} body upload object. base64 Encoded Data
     * @param {Object} metaData * use this.META_DATA
     * @param {Function} callback
     */
    upload: function (bucket, key, body, metaData, callback) {
        /**
         *  metaData example
         *    var meta = {};
         *    meta[aws.s3.META_DATA.CACHE_CONTROL] = 'private,max-age=0';
         *    meta[aws.s3.META_DATA.CONTENT_TYPE] = 'image/png';
         *
         *    aws.s3.upload(bucket, key, body, meta, function() { // exec });
         */
        S3.upload(bucket, key, body, metaData, function (err, data) {
            return callback(err, data);
        });
    }
};

