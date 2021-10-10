var IdeaCard = require('../models/IdeaCard');
const mongoose = require('mongoose')

exports.ideacard_list = async function(req, res) {
    console.log('ideacarad list called')
    await IdeaCard.find({}, (err, doc) => {
        if (!err) {
            res.status(200).json(doc);
        } else {
            res.status(500).json(err)
        }
        
    })
};

exports.get_ideacard = async function(req, res) {
    try {
        const doc = await IdeaCard.findById(req.params.id).exec()
        return res.status(200).json(doc)
    } catch (err) {
        return res.status(404).json(err)
    }
};

 

exports.create_ideacard = function(req, res) {
    const ideaCard = new IdeaCard(req.body)
    ideaCard.save()
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
    console.log('ideaCard::',ideaCard)
    res.json(JSON.stringify(ideaCard))
}

exports.update_ideacard = async function(req, res) {
    const filter = {_id: id}
    const udpate = req.body
    let doc = await IdeaCard.findOneAndUpdate(filter, update, {
        new: true
      })

      res.status(200).json(doc)
}

exports.delete_ideacard = function(req, res) {
    IdeaCard.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({err})
    })
}

