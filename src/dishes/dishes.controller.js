const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass

function create(req, res) {
    const { data: { name,description,price,image_url } = {} } = req.body;
    const newId = nextId();

    
    
    const newDish = {
      id: newId,
      name:name,
      description:description,
      price:price,
      image_url:image_url,
    };
    dishes.push(newDish);
    res.status(201).json({ data: newDish });
  }


  function hasPropertys(req, res, next) {
    const { data: { name,description,price,image_url } = {} } = req.body;
  
    if(typeof price!="number"){
      next({ status: 400, message: "All of name, description, price, and image_url are required." });
    }


    if (name && description && price && image_url && price>0 ) {
      return next();
    }
    next({ status: 400, message: "All of name, description, price, and image_url are required." });
  }



  function dishExists(req, res, next) {
    

    const { dishId } = req.params;

    const foundDish = dishes.find((dish) => dish.id === dishId);

    if (!foundDish) {
      return res.status(404).json({
        error: `Dish not found with id: ${dishId}.`,
      });
  
    }


    res.locals.paste = foundDish;
    next();
  }


 


function list(req,res){
  res.json({ data: dishes });
}


function read(req,res){

  const foundDish = res.locals.paste;

  res.json({ data: foundDish });
}





function update(req, res) {
 
  const { dishId } = req.params;

  const foundDish = res.locals.paste;

    const { data: { id,name,description,price,image_url } = {} } = req.body;
  
    if (id && id !== dishId) {
      return res.status(400).json({
        error: `Dish id (${id}) does not match route id (${dishId}).`,
      });
    }
    
    
    foundDish.name = name;
    foundDish.description=description;
    foundDish.image_url=image_url;
    foundDish.price=price;
 
  
    res.json({ data: foundDish });
  }
  
  
  module.exports = {
    create:[hasPropertys,create],
    update:[dishExists,hasPropertys,update],
    list,
    read:[dishExists,read]
  };