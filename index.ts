import bodyParser from "body-parser";
import express from "express";
const routes = require('./src/queries')

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

app.get('/', (request,response) => {
    response.json({info:'SERVIDOR - Gaia Cup'})
})

app.get('/gaiacup/usuario', routes.getUsuario)
app.get('/gaiacup/equipe', routes.getEquipe)
app.get('/gaiacup/partida', routes.getPartida)
app.get('/gaiacup/voto', routes.getVoto)
app.get('/gaiacup/votacao', routes.getVotacao)
app.get('/gaiacup/usuario/:id', routes.getUsuarioById)
app.get('/gaiacup/equipe/:id', routes.getEquipeById)
app.get('/gaiacup/partida/:id', routes.getPartidaById)
app.get('/gaiacup/voto/:id', routes.getVotoById)
app.get('/gaiacup/votacao/:id', routes.getVotacaoById)
app.post('/gaiacup/usuario', routes.createUsuario)
app.post('/gaiacup/equipe', routes.createEquipe)
app.post('/gaiacup/partida', routes.createPartida)
app.post('/gaiacup/voto', routes.createVoto)
app.post('/gaiacup/votacao', routes.createVotacao)
app.put('/gaiacup/usuario/:id', routes.updateUsuario)
app.put('/gaiacup/equipe/:id', routes.updateEquipe)
app.put('/gaiacup/partida/:id', routes.updatePartida)
app.put('/gaiacup/voto/:id', routes.updateVoto)
app.put('/gaiacup/votacao/:id', routes.updateVotacao)
app.delete('/gaiacup/usuario/:id', routes.deleteUsuario)
app.delete('/gaiacup/equipe/:id', routes.deleteEquipe)
app.delete('/gaiacup/partida/:id', routes.deletePartida)
app.delete('/gaiacup/voto/:id', routes.deleteVoto)
app.delete('/gaiacup/votacao/:id', routes.deleteVotacao)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
