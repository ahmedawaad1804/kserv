const { pathToProfilePic, accountSid, authToken } = require('../commonConstant')
const express = require('express');
const router = express.Router();
const clientModel = require('../models/clientModel')
const multer = require('multer')
const clienttwilio = require('twilio')(accountSid, authToken);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathToProfilePic)
    },
    filename: function (req, file, cb) {

        cb(null, req.body.phoneNumber + '.png')
    }
})
const upload = multer({ storage: storage })


router.post('/signUp/client', (req, res) => {
    //console.log(req.body)
    checkIfUserExists(req.body.phoneNumber, req.body.email, res).then((user) => {
        if (user) {
            let client = new clientModel(req.body);
            client.password = clientModel.hashThePassword(req.body.password)
            client.status = 'I';
            client.save().then((result) => {
                res.send({ 'status': 'success' })
            }).catch((err) => {
                console.log(err.message)
                res.sendStatus(400);
            })
        }
    })

})


router.post('/sendOtp', (req, res) => {
    clientModel.findOne({ 'phoneNumber': req.body.phoneNumber }).then((client) => {
        client.OTP = Math.floor(1000 + Math.random() * 9000);
        sendOTp(client.OTP, req.body.phoneNumber).then((result) => {
            client.status = 'P';
            client.save().then((result) => {
                res.send({ 'status': 'success' })
            })
        }).catch(err => {
            console.log(err)
            res.statusCode = 400;
            res.send({ 'status': "is not a valid phone number" })
        })
    })
})


router.post('/verfiyOtp', (req, res) => {

    clientModel.findOne({ 'phoneNumber': req.body.phoneNumber }).then((clientData) => {

        if (clientData) {
            if (clientData.OTP == req.body.OTP) {
                clientData.status = 'S'
                clientData.save().then((data) => {
                    console.log(data)
                    res.send({ "status": "success" })
                })
            } else {
                res.statusCode = 400;
                res.send({ "status": "wrong OTP" })
            }
        }
        else {
            res.statusCode = 400;
            res.send({ "status": "no such number" })
        }

    }).catch((err) => {
        console.log(err.message)
        res.statusCode = 400;
        res.send({ "status": "error" })
    })

})

router.post('/login/client', (req, res) => {
    console.log(req.body);
    clientModel.findOne({ 'email': req.body.email }).then((result) => {
        if (result) {
            if (result.isValid(req.body.password)) {
                res.send({ "status": "success" })
            }
            else {
                res.statusCode = 400;
                res.send({ "status": "Wrong phone number or password"})
            }
        } else {
            res.statusCode = 400;
            res.send({ "status": "Wrong phone number or password" })
        }
    })


})


router.get('/logout/client', (req, res) => {
    console.log('client')
    res.send({ "status": "user not s" })


})
router.get('/logout/agnet', (req, res) => {
    console.log('agnet')


})


async function sendOTp(OTP, phoneNumber) {
    console.log(OTP)
    await clienttwilio.messages.create({
        body: 'This is confirmation one time password ' + OTP,
        from: ' +19898949656 ',
        to: '+201101102604'  //h3'er hena 
    })
        .then(message => {
            return message
        })
        .catch(err => {
            throw err.message
        });

}

async function checkIfUserExists(phoneNumber, email, res) {
    let NotFound = true
    let user = await clientModel.findOne({ "phoneNumber": phoneNumber })
    if (user) {
        console.log(user)
        if (user.status == 'S') {
            NotFound = false;
            res.statusCode = 400;
            res.send({ "status": "phone number is already exists" })
        } else {
            await user.deleteOne()
        }
    }
    else {
        user = await clientModel.findOne({ "email": email })
        if (user) {

            if (user.status == 'S' ) {
                NotFound = false;
                res.statusCode = 400;
                res.send({ "status": "email is already exists" })
            } else {
                await user.deleteOne()
            }
        }

    }

    return NotFound
}



module.exports = router;