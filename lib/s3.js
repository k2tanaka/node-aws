
function S3() {
    this.client = null;
}

module.exports = new S3();

S3.prototype.setup = function setup(aws) {
    var self = this;

    self.client = new aws.S3().client;
};

/**
 * all buckets name list
 * @param {Function} callback
 */
S3.prototype.buckets = function buckets(callback) {
    var self = this;

    self.client.listBuckets().done(function (ret) {
        if (!ret || !ret.data || !ret.data.Buckets) {
            return callback(ret);
        }
        return callback(null, ret.data.Buckets);

    }).fail(function(resp) {
        return callback(resp.error);
    });
};

/**
 * return s3 object (up to 1000)
 * @param {String} bucket bucket_name
 * @param {String} marker directory start_point ex) stat/
 * @param {Function} callback
 */
S3.prototype.objects = function objects(bucket, marker, callback) {
    var self = this;
    var params = {
        Bucket: bucket,
        Marker: marker
    };

    self.client.listObjects(params).done(function (ret) {
        if (!ret || !ret.data) {
            return callback(ret);
        }
        return callback(null, ret.data);

    }).fail(function(resp) {
        return callback(resp.error);
    });
};

/**
 * upload s3 object
 * @param {String} bucket bucket_name
 * @param {String} key object_key *full path ex) a_dir/b_dir/c_dir/file.txt
 * @param {String} body base64 Encoded Data
 * @param {Object} metaData
 * @param {Function} callback
 */
S3.prototype.upload = function upload(bucket, key, body, metaData, callback) {

    var self = this;
    var params = {
        Bucket: bucket,
        Key: key,
        body: body
    };
    if (metaData) {
        params.Metadata = metaData;
    }

    self.client.putObject(params).done(function (ret) {
        // if (!ret || !ret.data) {
        //     return callback(ret);
        // }
        // return callback(null, ret.data);
        return callback(null, ret);

    }).fail(function(resp) {
        return callback(resp.error);
    });
};
