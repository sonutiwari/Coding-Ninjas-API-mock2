// importing required libraries.
const model = require('../../models/product.model');

// Defining controller object(for importing purpose.)
let APIControler = {};

// getAllData route. It will perform routing based on query.
APIControler.getAllData = (req, res)=>{
    // if there is query in request(it is update query)
    if (req.query != undefined){
        // call update function with params and return.
        updateProduct(res, req.params.id, req.query);
        return;
    }
    // if id is given it is delete query.
    if (req.params.id != undefined){
        // Call delte function and return.
        deleteProduct(res, req.params.id);
        return;
    }
    // Else it is search query.
    model.find({}, (err, ans)=>{
        if (err) {
            // search query return error.
            return res.send({
                status: 404,
                message: "No data found"
            });
        } else { // Search successfull.
            return res.send({
                data: {
                    products: ans
                }
            })
        }
    })
}

// Create a product.
APIControler.createProduct = (req, res)=>{
    // Find a product.
    let product = req.body.product;
    // find maximum id so that next elemnt can take id + 1.
    model.findOne({}).sort([['id', -1]]).exec((err, data)=>{
        if (data == null){
            product["id"] = 1; // this is the first product.
        } else {
            product["id"] = data.id + 1; // id found.
        }
        // Create new mongoose object.
        let newProduct = new model(product);
        // Save the object in DB
        newProduct.save((err, data)=>{
            if (err){ // on error return.
                console.log(err);
                return res.send({
                    status : 500,
                    message: "Not able to save data into database"
                })
            }
            return res.send({ // Saved successfully.
                data: {
                    product: {
                        id       : data.id,
                        name     : data.name,
                        quantity : data.quantity
                    }
                }
            })
        });
    });
}


// Deletion function.
const deleteProduct = (res, id) =>{
    // Call delete on DB using ID.
    model.deleteOne({id: Number(id)}, (err, data)=>{
        if (err) return res.send({ // failed to delete.
            status: 500,
            message: "Could not delete item"
        });
        // Deleted successfully.
        return res.send({
            data: {
                message: "product deleted"
            }
        })
    })
}


// Update product in DB.
const updateProduct = (res, id, query)=>{
    // Find the object in DB
    model.findOne({id: Number(id)}, (err, product)=>{
        if (err) { // not found.
            return res.send({
                status: 500,
                message: "Could not update item"
            });
        }

        // Product found. Update  the quantity.
        product.quantity = Number(product.quantity) + Number(query.number);
        // Call update.
        model.updateOne(product, (err, data) =>{
            if (err) { // updation error.
                return res.send({
                    status: 500,
                    message: "Could not update item"
                });
            }
            // update success.
            return res.send({
                data : {
                    product: product,
                    message: "Updated successfully"
                }
            })
        });
    })
    
}

// Export the module.
module.exports = APIControler;