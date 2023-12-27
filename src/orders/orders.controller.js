const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");



function create(req, res) {
    const { data: { deliverTo,mobileNumber,dishes } = {} } = req.body;
    const newId = nextId();


    const newOrder = {
      id: newId,
     deliverTo:deliverTo,
      mobileNumber:mobileNumber,
      dishes:dishes,
    };
    orders.push(newOrder);
    res.status(201).json({ data: newOrder });
  }

  function update(req, res) {
    let foundOrder=res.locals.paste;
    const { data: { id,status,deliverTo,mobileNumber,dishes } = {} } = req.body;
  

    if (id && id !== foundOrder.id) {
      return res.status(400).json({
        error: `Order id (${id}) does not match route id (${foundOrder.id}).`,
      });
    }



 
    foundOrder.status=status;
    foundOrder.deliverTo=deliverTo;
    foundOrder.mobileNumber=mobileNumber;
    foundOrder.dishes=dishes;
  
    res.json({ data: foundOrder });
  }

  function hasStatus(req,res,next){

    const { data: { status } = {} } = req.body;
    if(!status){
        return next({
            status: 400,
            message: "Order must have a status of pending, preparing, out-for-delivery, delivered",
          });
    }

    if(status=="pending"|| status=="preparing"||status== "out-for-delivery" || status=="delivered"){
        
    }else{
        return next({
            status: 400,
            message: "Order must have a status of pending, preparing, out-for-delivery, delivered",
          });
    }

    return next();

  }
  function hasPropertys(req, res, next) {
    const { data: { deliverTo,mobileNumber,dishes } = {} } = req.body;
  

        if(!dishes){
            return next({
                status: 400,
                message: "dishes is missing",
              });
}

 


    for (const dish of dishes) {
        // Check if 'quantity' is a positive integer
        if (
        
          !Number.isInteger(dish.quantity) ||
          dish.quantity <= 0
      
        ) {
          return next({
            status: 400,
            message: "1 quantity is 0 2 should be a positive integer for all dish",
          });
        }
    }


    


  
    if ( dishes && deliverTo && mobileNumber  &&  dishes.length && Array.isArray(dishes)  ) {
        return next();
      }
     
    


        next({ status: 400, message: "All of deliverTo, mobileNumber, dish , there is 1 quantity 2 , and dishes is not equal to 0 and is a number" });

    }

    function read(req, res) {  
   
 
        const foundOrder = res.locals.paste;
      
      
      
        return res.json({ data: foundOrder });
       }



       function destroy(req,res,next){
        const foundOrder = res.locals.paste;

        if(foundOrder.status!=='pending'){
         return next({
            status: 400,
            message: `pending`,
          });
        }


        var index = orders.map(function(o) { return o; }).indexOf(foundOrder);

          orders.splice(index,1);

          res.status(204).json({data:foundOrder});
       }

       function list(req,res){
        return res.json({ data: orders });
       }

    function orderExists(req, res, next) {
        const orderId = (req.params.orderId);
        const foundOrder = orders.find((order) => order.id === orderId);

        
        if (foundOrder ) {
           res.locals.paste = foundOrder;
          return next();
        }
        next({
          status: 404,
          message: `Order id not found: ${req.params.orderId}`,
        });
      }

// TODO: Implement the /orders handlers needed to make the tests pass
module.exports = {
    update:[orderExists,hasPropertys,hasStatus,update],
    create:[hasPropertys,create],
    read:[orderExists,read],
    delete:[orderExists,destroy],
    list,
}