const express = require('express');
const router  = express();
const { PostsModel } = require('../models/postsModel');
const e = require("express");
const ObjectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res) => {
    PostsModel.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log("Error to get Data: " + err);
        }
    })
});

router.post('/', (req, res) => {
    const newRecord = new PostsModel({
        author: req.body.author,
        message: req.body.message
    });

    newRecord.save((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log("Error creating new data  : " + err);
        }
    })
});

//Modifier des données
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('ID unknow : ' + req.params.id);
    } else {
        const updateRecord = {
            author: req.body.author,
            message: req.body.message
        };
        PostsModel.findByIdAndUpdate(
            req.params.id,
            { $set : updateRecord },
            { new: true },
            (err, docs) => {
                if (!err) {
                    res.send(docs);
                } else {
                    console.log("Update error : " + err);
                }
            }
        );
    }
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("ID unknow" + req.params.id)
    } else {
        PostsModel.findByIdAndRemove(
            req.params.id,
            (err, docs)=>{
                if (!err) {
                    res.send(docs);
                } else {
                    console.log("Error to delete data: " + err);
                }
            }
        );
    }
})

module.exports = router;