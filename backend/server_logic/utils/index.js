const axios = require('axios');
const { myGiphyAPIKey } = require('../../config');

const randomGiphyApiPath = 'https://api.giphy.com/v1/gifs/random';

const loadRandomGiphyByTag = async (req, res, next) => {
  try {
    const response = await axios(`${randomGiphyApiPath}?api_key=${myGiphyAPIKey}&tag=${req.query.searchTag}&rating=PG-13`);
    // ha talált gif-et, akkor visszaküldi az url-t
    if (response.data.data.url) {
      res.status(200).send((response.data));
    } else {
      // ha nem talál gif-et, akkor mehet a 404
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(500).send(err.stack);
  }
};

module.exports = { loadRandomGiphyByTag };
