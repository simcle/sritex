const admin = require('firebase-admin');
const serviceAccount = require('./service.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://labrego-980a8-default-rtdb.asia-southeast1.firebasedatabase.app'
})

const fbs = admin.database()
const rtb = fbs.ref('sritex')
module.exports = rtb