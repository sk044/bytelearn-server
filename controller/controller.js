var itemdb = require('../model/model');

// create and save new item
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new item
    const item = new itemdb({
        title : req.body.title,
        categories : req.body.categories,
        content: req.body.content,
    })

    // save item in the database
    item
        .save(item)
        .then(data => {
            //res.send(data)
            res.redirect('/add-item');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all posts/ retrive and return a single item
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        itemdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found item with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving item with id " + id})
            })

    }else{
        itemdb.find()
            .then(item => {
                res.send(item)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving item information" })
            })
    }

    
}

// Update a new idetified item by item id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    itemdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update item with ${id}. Maybe item not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update item information"})
        })
}

// Delete a item with specified item id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    itemdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "item was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete item with id=" + id
            });
        });
}