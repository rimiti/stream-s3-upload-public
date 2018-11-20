const AWS = require('aws-sdk');
const fs  = require('fs');

AWS.config.update({ accessKeyId: 'ACCESSKEYID', secretAccessKey: 'SECRETACCESSKEY', region: 'eu-west-3'});

const fileStream = fs.createReadStream('girlfriend.jpg');

fileStream.on('error', function (err) {
    if (err) { throw err; }
});

fileStream.on('open', function () {
    const s3 = new AWS.S3();
    s3.putObject({
        Bucket: 'your-bucket',
        Key: 'file-renamed.png',
        ACL: 'public-read',
        Body: fileStream,
        Metadata: { 'type': 'png', 'user': 'Dimitri DO BAIRRO' }
    }, function (err) {
        if (err) { throw err; }
    });
});




