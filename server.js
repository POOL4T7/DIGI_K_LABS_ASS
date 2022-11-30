const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/accesstoken', async (req, res) => {
  try {
    const code = req.query.code;
    const params = `?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.REDIRECT_URI}`;
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };
    const data = await axios.post(
      `https://github.com/login/oauth/access_token${params}`,
      config
    );
    return res.status(200).json(data.data);
  } catch (e) {
    console.log('Error: ', e.message);
    return res.status(500).json({ error: e.message, msg: 'Server Error' });
  }
});

app.get('/getuserdata', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.get(`https://api.github.com/user`, config);
    return res.status(200).json(data.data);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ error: e.message, msg: 'Server Error' });
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`server is running`);
});
