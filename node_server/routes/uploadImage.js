const express = require('express');
const router = express.Router();
multer = require("multer");
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

storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

upload = multer({storage: storage});

router.post('/', upload.single('imageUpload'),(req, res) => {
    console.log('start uploading');
    // the file is uploaded when this route is called with formdata.
    // now you can store the file name in the db if you want for further reference.
    const filename = req.file.filename;
    const path = req.file. path;
    let RepertoID = req.body.RepertoID;

    //MySql Insert
    console.log('insert foto');
    mysqlx.getSession(optionsRelease)
        .then(session => {
            return session.getSchema(optionsRelease.schema)
        })
        .then(schema => {
            return schema.getTable(FotoReperti)
        })
        .then(table => {
            table.insert(['id_reperto', 'path_foto'])
                .values(
                    RepertoID,
                    path
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
    res.json({'message': 'File uploaded'});
});

module.exports = router;
