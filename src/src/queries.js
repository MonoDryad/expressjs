const Pool = require('pg').Pool
const db = new Pool({
    host: 'containers-us-west-72.railway.app',
    database:'railway',
    user:'postgres',
    password: 'w4iBKp1MfBaOMLg0cDy6',
    port:7617
})

const getUsuario = (request, response) => {
    db.query('SELECT * FROM usuario ORDER BY id_usuario ASC',
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getEquipe = (request, response) => {
    db.query('SELECT * FROM equipe ORDER BY id_equipe ASC',
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPartida = (request, response) => {
    db.query('SELECT * FROM partida ORDER BY id_partida ASC',
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getVoto = (request, response) => {
    db.query('SELECT * FROM voto ORDER BY id_voto ASC',
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getVotacao = (request, response) => {
    db.query('SELECT * FROM votacao ORDER BY id_partida ASC',
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUsuarioById = (request, response) => {
    const id = parseInt(request.params.id)

    db.query('SELECT * FROM usuario WHERE id_usuario = $1', [id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getEquipeById = (request, response) => {
    const id = parseInt(request.params.id)

    db.query('SELECT * FROM equipe WHERE id_equipe = $1', [id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPartidaById = (request, response) => {
    const id = parseInt(request.params.id)

    db.query('SELECT * FROM partida WHERE id_partida = $1', [id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getVotoById = (request, response) => {
    const id = parseInt(request.params.id)

    db.query('SELECT * FROM voto WHERE id_voto = $1', [id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getVotacaoById = (request, response) => {
    const id = parseInt(request.params.id)

    db.query('SELECT * FROM voto WHERE id_partida = $1', [id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUsuario = (request, response) => {
    try{
        const {senha, email, nome} = request.body

        db.query('INSERT INTO usuario(senha, moeda, email, nome) VALUES($1, $2, $3, $4)',
        [senha, 200, email, nome], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send('Usuario adicionado')
        })
    }catch(error){
        console.log('Erro: ' + error)
        response.status(400).send({
            status:400,
            message:'Error ao inserir o registro. ' + error
        })
    }
}

const createEquipe = (request, response) => {
    try{
        const {NOME, TAG, VITORIA, DERROTA, POSICAO} = request.body

        db.query('INSERT INTO equipe(nome, tag, vitoria, derrota, posicao) VALUES($1, $2, $3, $4, $5)',
        [NOME, TAG, VITORIA, DERROTA, POSICAO], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send('Equipe adicionada')
        })
    }catch(error){
        console.log('Erro: ' + error)
        response.status(400).send({
            status:400,
            message:'Error ao inserir o registro. ' + error
        })
    }
}

const createPartida = (request, response) => {
    try{
        const {DATA_JOGO, HORA_JOGO, ID_EQUIPE_1, ID_EQUIPE_2} = request.body
        console.log(request.body)
        db.query('INSERT INTO partida(data_jogo, hora_jogo, id_equipe_1, id_equipe_2) VALUES($1, $2, $3, $4)',
        [DATA_JOGO, HORA_JOGO, ID_EQUIPE_1, ID_EQUIPE_2], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send('Partida adicionada')
        })
    }catch(error){
        console.log('Erro: ' + error)
        response.status(400).send({
            status:400,
            message:'Error ao inserir o registro. ' + error
        })
    }
}

const createVoto = (request, response) => {
    try{
        const {id_partida, quantia_total_votos_azul, quantia_total_votos_vermelho} = request.body

        db.query('INSERT INTO voto(id_partida, quantia_total_votos_azul, quantia_total_votos_vermelho) VALUES($1, $2, $3, $4, $5)',
        [id_partida, quantia_total_votos_azul, quantia_total_votos_vermelho], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send('Voto adicionado')
        })
    }catch(error){
        console.log('Erro: ' + error)
        response.status(400).send({
            status:400,
            message:'Error ao inserir o registro. ' + error
        })
    }
}

const createVotacao = (request, response) => {
    try{
        const {id_usuario, quantia_votos_azul, quantia_votos_vermelho} = request.body

        db.query('INSERT INTO votacao(id_usuario, quantia_votos_azul, quantia_votos_vermelho) VALUES($1, $2, $3, $4, $5)',
        [id_usuario, quantia_votos_azul, quantia_votos_vermelho], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send('Votação adicionada')
        })
    }catch(error){
        console.log('Erro: ' + error)
        response.status(400).send({
            status:400,
            message:'Error ao inserir o registro. ' + error
        })
    }
}

const updateUsuario = (request, response) => {
    const id_usuario = parseInt(request.params.id)
    const {senha, moeda, email, nome} = request.body

    db.query('UPDATE usuario SET senha = $1, moeda = $2, email = $3, nome = $4 WHERE id_usuario = $5',
    [senha, moeda, email, nome, id_usuario], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('Usuario atualizado')
    })
}

const updateEquipe = (request, response) => {
    const id_equipe = parseInt(request.params.id)
    const {nome, tag, vitoria, derrota, posicao} = request.body

    db.query('UPDATE equipe SET nome = $1, tag = $2, vitoria = $3, derrota = $4, posicao = $5 WHERE id_equipe = $6',
    [nome, tag, vitoria, derrota, posicao, id_equipe], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('Equipe atualizada')
    })
}

const updatePartida = (request, response) => {
    const id_partida = parseInt(request.params.id)
    const {data_jogo, hora_jogo, id_equipe_1, id_equipe_2} = request.body

    db.query('UPDATE partida SET data_jogo = $1, hora_jogo = $2, id_equipe_1 = $3, id_equipe_2 = $4 WHERE id_partida = $5',
    [data_jogo, hora_jogo, id_equipe_1, id_equipe_2, id_partida], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('Partida atualizada')
    })
}

const updateVoto = (request, response) => {
    const id_voto = parseInt(request.params.id)
    const {id_partida, quantia_total_votos_azul, quantia_total_votos_vermelho} = request.body

    db.query('UPDATE voto SET id_partida = $1, quantia_total_votos_azul = $2, quantia_total_votos_vermelho = $3 WHERE id_voto = $4',
    [id_partida, quantia_total_votos_azul, quantia_total_votos_vermelho, id_voto], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('Voto atualizado')
    })
}

const updateVotacao = (request, response) => {
    const id_voto = parseInt(request.params.id)
    const {id_usuario, quantia_votos_azul, quantia_votos_vermelho} = request.body

    db.query('UPDATE votacao SET id_usuario = $1, quantia_votos_azul = $2, quantia_votos_vermelho = $3 WHERE id_voto = $4',
    [id_usuario, quantia_votos_azul, quantia_votos_vermelho, id_voto], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('Votação atualizada')
    })
}

const deleteUsuario = (request, response) => {
    const id_usuario = parseInt(request.params.id)

    db.query('DELETE FROM usuario WHERE id_usuario = $1', [id_usuario],
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('deletada')
    })
}

const deleteEquipe = (request, response) => {
    const id_equipe = parseInt(request.params.id)

    db.query('DELETE FROM equipe WHERE id_equipe = $1', [id_equipe],
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('deletada')
    })
}

const deletePartida = (request, response) => {
    const id_partida = parseInt(request.params.id)

    db.query('DELETE FROM partida WHERE id_partida = $1', [id_partida],
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('deletada')
    })
}

const deleteVoto = (request, response) => {
    const id_voto = parseInt(request.params.id)

    db.query('DELETE FROM voto WHERE id_voto = $1', [id_voto],
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('deletada')
    })
}

const deleteVotacao = (request, response) => {
    const id_votacao = parseInt(request.params.id)

    db.query('DELETE FROM votacao WHERE id_votacao = $1', [id_votacao],
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('deletada')
    })
}

module.exports = {
    getUsuario,
    getEquipe,
    getPartida,
    getVoto,
    getVotacao,
    getUsuarioById,
    getEquipeById,
    getPartidaById,
    getVotoById,
    getVotacaoById,
    createUsuario,
    createEquipe,
    createPartida,
    createVoto,
    createVotacao,
    updateUsuario,
    updateEquipe,
    updatePartida,
    updateVoto,
    updateVotacao,
    deleteEquipe,
    deletePartida,
    deleteUsuario,
    deleteVotacao,
    deleteVoto
}