const axios = require('axios')

const api = axios.create({
  baseURL: 'http://api.football-data.org/v2/',
  timeout: 1000,
  headers: {
    'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY
  }
});

exports.doApiRequest =  async function doApiRequest(path, method = 'get', data = null){

  const response = await api({
    method: method,
    url: path,
    data: data
  });

  return response.data

}