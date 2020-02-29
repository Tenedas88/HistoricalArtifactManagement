var express = require('express');
var router = express.Router();
mysqlx = require('@mysql/xdevapi');

var testBuild = false;

options = {
    host: 'localhost',
    port: 33060,
    password: 'admin',
    user: 'root',
    schema: 'repertigeologicischema'
};

optionsRelease = {
    host: 'localhost',
    port: 33060,
    password: 'admin',
    user: 'root',
    schema: 'repertigeologicischema'
};



RepertiTable = 'reperti';
RepertiRelease = 'repertirelease';
FrammentiTable = 'frammenti';
FotoReperti = 'foto_reperti';

StubResponse = [
    {ID: 2, Nome: 'vaso', Tipo: 'frammento', Valore: 300, Path: 'davide/images/frammentovaso', PathShow: false},
    {ID: 3, Nome: 'tazza', Tipo: 'manico', Valore: 400, Path: 'davide/images/manicotazza', PathShow: false}
];

/* GET users listing. */
router.get('/', function (req, res) {

        let queryResult = [];

        mysqlx.getSession(optionsRelease)
            .then(session => {
                return session.getSchema(optionsRelease.schema)
            })
            .then(schema => {
                return schema.getTable(RepertiRelease)
            })
            .then(table => {
                table.select(['id_inventario', 'altri_inventari', 'produzione',
                    'tecnica', 'forma', 'stato_conservazione', 'luogo_conservazione',
                    'provenienza', 'collezione', 'limc_digitale', 'misure',
                    'descrizione_lato_a','descrizione_lato_b','padre','reperto_padre'])
                    .execute(result => {
                        console.log(result);
                        queryResult.push({
                            ID: result[0],
                            AltriInventari: result[1],
                            Produzione: result[2],
                            Tecnica: result[3],
                            Forma: result[4],
                            StatoConservazione: result[5],
                            LuogoConservazione: result[6],
                            Provenienza: result[7],
                            Collezione: result[8],
                            LimcDigitale: result[9],
                            Misure: result[10],
                            DescrizioneLatoA: result[11],
                            DescrizioneLatoB: result[12],
                            Padre: result[13],
                            RepertoPadre: result[14],
                            PathShow: false
                        });
                    })
                    .then(() => {
                        res.type('json');
                        res.json(queryResult);
                    })
            })
            .catch(err => {
                console.error(err.stack);
                process.exit(1);
            });


});

router.get('/imagesInfo', function(req, res, next){
    let queryResult = [];
    mysqlx.getSession(optionsRelease)
        .then(session => {
            return session.getSchema(optionsRelease.schema)
        })
        .then(schema => {
            return schema.getTable(FotoReperti)
        })
        .then(table => {
            table.select(['id_foto','id_reperto','path_foto'])
                .where('id_reperto == :reperto')
                .bind('reperto', req.query['RepertoID'])
                .execute(result => {
                    console.log(result);
                    queryResult.push({
                        ID: result[0],
                        IDReperto: result[1],
                        Path: result[2],
                    });
                })
                .then(() => {
                    console.log(queryResult);
                    res.type('json');
                    res.json(queryResult);
                })
        })
        .catch(err => {
            console.error(err.stack);
            process.exit(1);
        });
});

// router.get('/image', function(req, res, next){
//     console.log(req.query['path']);
//     res.sendFile(path.join(__dirname, req.query['path']));
// });

router.get('/search', function(req, res, next) {
        let queryResult = [];
        mysqlx.getSession(optionsRelease)
            .then(session => {
                return session.getSchema(optionsRelease.schema)
            })
            .then(schema => {
                return schema.getTable(RepertiRelease)
            })
            .then(table => {
                table.select(['id_inventario', 'altri_inventari', 'produzione',
                    'tecnica', 'forma', 'stato_conservazione', 'luogo_conservazione',
                    'provenienza', 'collezione', 'limc_digitale', 'misure',
                    'descrizione_lato_a','descrizione_lato_b','padre','reperto_padre'])
                    .where(req.query['searchField']+' == :search')
                    .bind('search', req.query['searchString'])
                    .execute(result => {
                        console.log(result);
                        queryResult.push({
                            ID: result[0],
                            AltriInventari: result[1],
                            Produzione: result[2],
                            Tecnica: result[3],
                            Forma: result[4],
                            StatoConservazione: result[5],
                            LuogoConservazione: result[6],
                            Provenienza: result[7],
                            Collezione: result[8],
                            LimcDigitale: result[9],
                            Misure: result[10],
                            DescrizioneLatoA: result[11],
                            DescrizioneLatoB: result[12],
                            Padre: result[13],
                            RepertoPadre: result[14],
                            PathShow: false
                        });
                    })
                    .then(() => {
                        console.log(queryResult);
                        res.type('json');
                        res.json(queryResult);
                    })
            })
            .catch(err => {
                console.error(err.stack);
                process.exit(1);
            });

});

/*router.get('/', function(req, res, next) {
    res.send('respond with a resource');
                //table.insert('ID','Nome','Tipo','Valore','Path').values('3','tazza','manico','19','images/davide').execute();
});*/

router.post('/', function(req, res, next) {
    console.log('insert reperto');
    let insertReperto = req.body;
    mysqlx.getSession(optionsRelease)
        .then(session => {
            return session.getSchema(optionsRelease.schema)
        })
        .then(schema => {
            return schema.getTable(RepertiRelease)
        })
        .then(table => {
            table.insert(['id_inventario', 'altri_inventari', 'produzione',
                'tecnica', 'forma', 'stato_conservazione', 'luogo_conservazione',
                'provenienza', 'collezione', 'limc_digitale', 'misure',
                'descrizione_lato_a','descrizione_lato_b','padre','reperto_padre'])
                .values(
                    insertReperto.ID,
                    insertReperto.AltriInventari,
                    insertReperto.Produzione,
                    insertReperto.Tecnica,
                    insertReperto.Forma,
                    insertReperto.StatoConservazione,
                    insertReperto.LuogoConservazione,
                    insertReperto.Provenienza,
                    insertReperto.Collezione,
                    insertReperto.LimcDigitale,
                    insertReperto.Misure,
                    insertReperto.DescrizioneLatoA,
                    insertReperto.DescrizioneLatoB,
                    insertReperto.Padre,
                    insertReperto.RepertoPadre
                )
                .execute()
                .then(() => {
                    res.end();
                })
        })
        .catch(err => {
            console.error(err.stack);
            process.exit(1);
        });
    next();
});

router.delete('/', function(req, res, next) {

});

module.exports = router;
