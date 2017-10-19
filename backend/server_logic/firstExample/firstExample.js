const SearchHistoryModel = require('../../mongoDB/models/firstExample/searchHistoryModel');

// select
const listAll = async (req, res, next) => {
  try {

    console.log(req.currentUser);

    const data = await SearchHistoryModel.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};


// insert
const saveOne = async (req, res, next) => {

  console.log(req.body.address);

  // const instancee = new SaveHistoryModel(req.body.address);

  const temp = {
    address: req.body.address
  };


  try {
    const resp = await SearchHistoryModel.find();
    res.status(201).send(resp);
  } catch (err) {
    res.status(500).send(err);
  }
};


// delete
const deleteOne = (req, res, next) => {
  res.status(200).send('delete');
};


module.exports = {
  listAll,
  saveOne,
  deleteOne
};
