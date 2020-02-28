const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({limit: '500b'}));
app.use(bodyParser.urlencoded({limit: '500b', extended: true}));

// Add all the hosts that will make requests to the service
const allowedHosts = [
  'https://http.cat',
  'https://www.adswerve.com'
];

const corsOptions = {
  origin: (origin, cb) => {
    if (allowedHosts.indexOf(origin) > -1) {
      cb(null, true);
    } else {
       cb(new Error(`CORS error! Request from ${origin}`));
    }
  },
  methods: 'POST'
};

app.options('/', cors(corsOptions));

// TODO - remove GET; just for demo purposes
app.get('/', (req,res,next) => {
  res.redirect(301, 'https://http.cat/204')
});

app.post('/', cors(corsOptions), (req, res, next) => {
  const msg = req.body;
  const payload = Array.isArray(msg) ? msg : [msg];
  const hasSet = [];
  payload.forEach(p => {
    if (typeof p !== 'object') return;
    if (!p.hasOwnProperty('name') || !p.hasOwnProperty('value')) {
      return;
    }
    hasSet.push([p.name, p.value]);
  });
  res.status(200).json({msg: `Processed payload: ${hasSet}`});
});

const PORT = process.env.PORT || '8080';
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

module.exports = app;
