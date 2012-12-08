
function S3() {
    this.client = null;
    this.buckets = [];
}

module.exports = new S3();

S3.prototype.init = function init(aws) {
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
    });
};

/**
 * return the s3 object
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
        // if (!ret || !ret.data || !ret.data.Buckets) {
        //     return callback(ret);
        // }
        return callback(null, ret.Name);
    });
};
