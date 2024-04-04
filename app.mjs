import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as mongo from "mongodb";
import * as dbService from './services/db.mjs';
import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
  audience: 'http://localhost:3000',
  issuerBaseURL: 'https://hockey-warehouse.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());
// app.use(jwtCheck);

// GET all players
app.get('/players', (req, res) => {
  dbService.getAll('players').then(players => {
    res.json(players);
  });
});

// GET player by _id
app.get('/players/:id', (req, res) => {
  dbService.getOne('players', req.params.id).then(player => {
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json(player);
  });
});

// POST player
app.post('/players', (req, res) => {
  dbService.addOne('players', req.body).then(player => {
    res.send(player.insertedId);
  });
});

// PUT player
app.put('/players/skills', (req, res) => {
  const player = req.body;
  console.log('player: ', req.body);
  const query = {_id: new mongo.ObjectId(player._id)};
  const newValues = { $set: {
    skills: player.skills
  }};
  dbService.updateOne('players', query, newValues).then(player => {
    res.send(player.insertedId);
  });
});

// POST list of players
app.post('/players', (req, res) => {
  dbService.addMany('players', req.body).then(result => {
    res.send(result);
  });
});

// DELETE player
app.delete('/players/:id', (req, res) => {
  dbService.deleteOne('players', req.params.id);
});

// GET all divisions
app.get('/divisions', (req, res) => {
  dbService.getAll('divisions').then(result => {
    res.send(result);
  });
});

// GET division by _id
app.get('/divisions/:id', (req, res) => {
  dbService.getOne('divisions', req.params.id).then(division => {
    if (!division) {
      return res.status(404).json({ error: 'Division not found' });
    }
    res.json(division);
  });
});

// POST division
app.post('/divisions', (req, res) => {
  dbService.addOne('divisions', req.body).then(player => {
    res.send(player.insertedId);
  });
});

// POST list of divisions
app.post('/divisions', (req, res) => {
  dbService.addMany('divisions', req.body).then(result => {
    res.send(result);
  });
});

// DELETE a division
app.delete('/divisions/:id', (req, res) => {
  dbService.deleteOne('divisions', req.params.id).then(result => {
    res.send(result);
  });
});

// GET sessions
app.get('/sessions', (req, res) => {
  dbService.getAll('sessions').then(result => {
    res.send(result);
  });
});

// GET session by _id
app.get('/sessions/:id', (req, res) => {
  dbService.getOne('sessions', req.params.id).then(session => {
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session);
  });
});

// POST session
app.post('/sessions', (req, res) => {
  console.log('adding session: ', req.body);
  dbService.addOne('sessions', req.body).then(session => {
    res.send(session.insertedId);
  });
});

/// UPDATE session
app.put('/sessions', (req, res) => {
  console.log('update session: ', req.body);
  dbService.updateOne('sessions', req.body).then(session => {
    res.send(session.insertedId);
  });
});

// DELETE session
app.delete('/sessions/:id', (req, res) => {
  console.log('req: ', req.params);
  dbService.deleteOne('sessions', req.params.id);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
