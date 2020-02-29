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

StubResponse = [
    {ID: 2, Nome: 'vaso', Tipo: 'frammento', Valore: 300, Path: 'davide/images/frammentovaso', PathShow: false},
    {ID: 3, Nome: 'tazza', Tipo: 'manico', Valore: 400, Path: 'davide/images/manicotazza', PathShow: false}
];

router.post('/', function(req, res, next) {

    console.log('passed from postTest');
});

module.exports = router;
