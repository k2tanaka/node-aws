var should = require('should');

var AwsApi = require('../lib');
var aws = null;

// aws env
var accessKey = '';
var secretKey = '';
var region = '';
var bucket = '';
var bucket_start_point = '';


describe('Gacha Test Case', function() {

    before(function(done){

        var options = {
            accessKeyId: accessKey,
            secretAccessKey: secretKey,
            region: region
        };
        aws = new AwsApi(options);
        done();
    });

    beforeEach(function(done) { done(); });
    after(function(done) { done(); });
    afterEach(function(done) { done(); });

    describe('AWS S3 service', function () {

        it('s3 buckets list', function (done) {
            aws.s3_buckets(function (err, ret) {
                console.log('S3 buckets-----', err, ' : ' , ret);
                done();
            });
        });

        it('s3 objects list', function (done) {

            aws.s3_objects(bucket, bucket_start_point, function (err, ret) {
                console.log('S3 objects-----', err, ' : ' , ret);
                done();
            });
        });
    });

});
