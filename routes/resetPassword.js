import express from 'express'
import bcrypt from 'bcryptjs'

import { findOne, updateOne } from '../handler/mongoHandler.js'

const router = express.Router()

router.get('/:token', async function (req, res) {
    let { dbo } = req.app.locals

    let user = await findOne(dbo, 'users', {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {$gt: Date.now()}
    })

    if (!user) {
        res.render('index', {
            token: req.params.token,
            err: true,
            msg: "Invalid token number, please choose the latest mail to reset the password if you requested more than once"
        });
    }
    res.render('index', { token: req.params.token });
});


/*
* The logic for password validation and update
*/
router.post('/', async function (req, res) {
    let { newPwd, repPwd } = req.body

    try {
        let { dbo } = req.app.locals

        let user = await findOne(dbo, 'users', {
            resetPasswordToken: req.body.token,
            resetPasswordExpires: {$gt: Date.now()}
        })

        if (!user) {
            return res.render('index', {
                token: req.body.token,
                err: true,
                msg: "Invalid token number, please choose the latest mail to reset the password if you requested more than once"
            });
        }

        if (newPwd !== repPwd) {
            return res.render('index', { token: req.body.token, err: true, msg: "The passwords don't match!" });
        } else if (repPwd.length < 8) {
            return res.render('index', { token: req.body.token, err: true, msg: "Password must be atleast 8 characters long" });
        } else {
            let hash = await bcrypt.hash(newPwd, 10)
            await updateOne(
                dbo,
                'users',
                { email: user.email },
                {
                    $set: {
                        password: hash,
                        resetPasswordToken: null,
                        resetPasswordExpires: null
                    }
                }
            )
            return res.render('index', { updated: true, msg: "password reset done" });
        }
    } catch (err) {
        console.error(err.message)
        return res.render('index', {token: req.body.token, err: true, msg: "Server is busy, please try again"});
    }
});

export { router as resetPasswordRoute }