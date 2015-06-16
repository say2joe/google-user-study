var google = require('googleapis');

//Create a storage client object
var storage = google.storage('v1');

//create an oAuth client
var OAuth2Client = google.auth.OAuth2;
var oauth2Client = new OAuth2Client();

//Email associated with my Google API service account
var SERVICE_ACCOUNT_EMAIL = '328987196620-9g5qu0o6rtqo6h5dal8tbpgcai0knb79@developer.gserviceaccount.com';

//File that contains my service account details
var SERVICE_ACCOUNT_KEY_FILE = 'GCS-UserStudy-7f6c3a2e0338.json';

//jwt object to deal with service account auth. Uses CLoud Storage full control scope
var jwt = new google.auth.JWT(SERVICE_ACCOUNT_EMAIL, SERVICE_ACCOUNT_KEY_FILE, null,
        ['https://www.googleapis.com/auth/devstorage.full_control']);

var createStorageBucket = function() {
    storage.buckets.insert({
        project: 'gcs-userstudy',
        predefinedAcl: oauth2Client
    });
};

jwt.authorize(function(err, result) {
	oauth2Client.setCredentials({
		access_token: result.access_token
	}, createStorageBucket);
});
