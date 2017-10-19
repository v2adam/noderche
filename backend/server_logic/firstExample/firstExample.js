const SearchHistoryModel = require('../../mongoDB/models/firstExample/searchHistoryModel');

// select
const listAll = async (req, res, next) => {
  try {
    // like a find-ban { address: { $regex: 'város' } }
    const query = SearchHistoryModel.find()
      .select('searchId address user -_id')
      .where('user').eq(req.currentUser.username)
      .where('searchId').gt(2)
      .sort('created_ts'); // asc: sima, desc: -
    // a query-k azok nem promise-ok, az exec-el lesz promise
    const data = await query.exec();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send('Error during list');
  }
};


// insert
const saveOne = async (req, res, next) => {
  const saveThis = {
    address: req.body.address,
    user: req.currentUser.username
  };

  try {
    const newDocument = new SearchHistoryModel(saveThis);
    await newDocument.save();
    res.status(201).send('Saved');
  } catch (err) {
    res.status(500).send('Error during insert');
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
