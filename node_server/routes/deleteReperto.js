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

router.use(function(req, res, next) {
    console.log('passed from here');
    console.log(req.body);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.send(200);
    }
    else {
        //move on
        next();
    }
});

router.post('/', function(req, res, next) {

    console.log('post remove reperto');
    let deleteReperto = req.body.ID;
    console.log(req.body);
    mysqlx.getSession(optionsRelease)
        .then(session => {
            return session.getSchema(optionsRelease.schema)
        })
        .then(schema => {
            return schema.getTable(RepertiRelease)
        })
        .then(table => {
            console.log(deleteReperto);
            table.delete()
                .where('id_inventario = :value')
                .bind('value', deleteReperto)
                .execute()
                .then(() => {
                    res.end();
                })
        })
        .catch(err => {
            console.error(err.stack);
            process.exit(1);
        });
});

module.exports = router;
