var should = require('should');
var fs = require('fs');

var AwsApi = require('../lib');
var aws = null;

// aws env
var accessKey = '';
var secretKey = '';
var region = '';
var bucket = '';
var bucket_start_point = '';



describe('AWS Test Case', function() {

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
            aws.s3.buckets(function (err, ret) {
                console.log('S3 buckets-----', err, ' : ' , ret);
                done();
            });
        });

        it('s3 objects list', function (done) {

            aws.s3.objects(bucket, bucket_start_point, function (err, ret) {
                console.log('S3 objects-----', err, ' : ' , ret);
                done();
            });
        });

        it('s3 objects upload', function (done) {
            // upload file => base64
            var body = fs.readFileSync('test.jpg', 'base64');
            var key = bucket_start_point + 'test.jpg';
            var meta = {};
            meta[aws.s3.META_DATA.CACHE_CONTROL] = 'max-age=0';
            meta[aws.s3.META_DATA.CONTENT_TYPE] = 'image/jpeg';

            aws.s3.upload(bucket, key, body, meta, function (err, ret) {
                console.log('S3 upload-----', err, ' : ' , ret);
                done();
            });
        });
    });

});
