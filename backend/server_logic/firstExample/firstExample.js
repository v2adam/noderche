const SearchHistoryModel = require('../../mongoDB/models/firstExample/searchHistoryModel');

const listAll = async (req, res, next) => {
  try {
    // minden user a saját keresési előzményét láthatja csak
    const query = SearchHistoryModel
      .find({})
      .populate('_user')
      .where('_user').eq(req.currentUser._id)
      .sort('created_ts');

    // a query-k azok nem promise-ok, az exec-el lesz promise
    const data = await query.exec();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send('Error when download list');
  }
};

// komplex leképezés
const complexQuery = async (req, res, next) => {
  try {
    // a _user egy ref, a populate segítségével behúzhatom a user további adatait
    // select utasításban a _id-t defeault-ban mindig behúzza
    const query = SearchHistoryModel
    // a find olyan mint a where
      .find({
        // (address like '%város%') and ((historyId > 1 and historyId < 5 ) or (address = 'város'))
        address: { $regex: '.*' + 'város' + '.*' },
        $or: [{ historyId: { $gt: 1, $lt: 5 } }, { address: 'város' }]
      }, /* itt is lehet a select */)
      // populate kb úgy működik mint a left join
      .populate({
        path: '_user', // _user objectId-t feloldja
        select: 'userId username', // ezeket áthozza a RegisteredUsers-ből
        match: { /* joinnak a where-je */ }
      })
      .select('historyId address created_ts') // - segítségvel letilthatsz mezőket
      // .where('address').eq('város2') // így is mehet a where
      .sort('created_ts');

    // a query-k azok nem promise-ok, az exec-el lesz promise
    const data = await query.exec();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send('Error when download list');
  }
};


// insert
const saveOne = async (req, res, next) => {
  const saveThis = {
    address: req.body.address,
    _user: req.currentUser._id
  };

  try {
    const newDocument = new SearchHistoryModel(saveThis);
    await newDocument.save();
    res.status(201).send('Saved');
  } catch (err) {
    res.status(500).send('Error when insert');
  }
};

// törlésre példa
const deleteOne = async (req, res, next) => {
  try {
    // a route-ban :id néven lett meghivatkozva, így itt is id néven találod meg
    // ha a paraméter query stringként van, akkor req.query. -ként érhetők el a paraméterek
    const deleteId = req.params.id;

    // törölje azt, ahol az id megegyezik, de csak a sajátját törölheti a user
    const query = SearchHistoryModel.find({
      _id: deleteId,
      _user: req.currentUser._id
    }).remove();

    const removeResult = await query.exec();

    // megvizsgálom, hogy hányat törölt
    if (removeResult.result.n === 0) {
      // ha nem törölt semmit, akkor nem is találta meg -> 404
      res.sendStatus(404);
    } else {
      // sikeresen törölte
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).send('Error when deleting content');
  }
};


module.exports = {
  listAll,
  saveOne,
  deleteOne
};
