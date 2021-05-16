var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');
var repertiRouter = require('./routes/reperti');
var removeRepertiRouter = require('./routes/deleteReperto');
var postTest = require ('./routes/PostTest');
var uploadImage = require('./routes/uploadImage');

var testBuild = false;

var app = express();

//DB ccnnection setup xdev
mysqlx = require('@mysql/xdevapi');

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
    schema: 'ReleaseRepertiArcheologici'
};

function createSchema() { return new Promise(function(resolve,rejext) {
    if (testBuild == true){
        console.log('create schema');
        mysqlx.getSession(options)
            .then(session => {
                console.log('checking schema');
                session.getSchema(options.schema).existsInDatabase()
                    .then(exist => {
                    if (exist == false) {
                      console.log('creating schema');
                      session.createSchema(options.schema)
                    }
                    resolve();
              });
            });
        }
    else {
        console.log('create schema');
        mysqlx.getSession(optionsRelease)
            .then(session => {
                console.log('checking schema');
                session.getSchema(optionsRelease.schema).existsInDatabase()
                    .then(exist => {
                        if (exist == false) {
                            console.log('creating schema');
                            session.createSchema(optionsRelease.schema).execute().then(() => {resolve();});
                        }
                        resolve();
                    });
            });
    }
});}

function createTable() {
  new Promise(function (resolve, reject) {
      if (testBuild == true ){
      console.log('create table');
      mysqlx.getSession(options)
          .then(session => {
              console.log('checking table');
              session.getSchema(options.schema).getTable('reperti').existsInDatabase()
                  .then(exist => {
                      console.log('creating table');
                      mysqlx.getSession(options)
                          .then(session => {
                              session.sql(
                                  'CREATE TABLE IF NOT EXISTS \`RepertiGeologiciSchema\`.\`reperti\`(' +
                                  '\`ID\` INT NOT NULL,' +
                                  '\`Nome\` VARCHAR(45) NOT NULL,' +
                                  '\`Tipo\` VARCHAR(45) NOT NULL,' +
                                  '\`Valore\` INT NOT NULL,' +
                                  '\`Path\` VARCHAR(135) NOT NULL,' +
                                  'PRIMARY KEY (\`ID\`),' +
                                  'UNIQUE INDEX \`ID_UNIQUE\` (\`ID\` ASC) VISIBLE)' +
                                  'ENGINE = InnoDB;')
                                  .execute().then(() => {
                                  resolve()
                              });
                          })
                  });
          })
        }
      else{
          console.log('create table');
          mysqlx.getSession(optionsRelease)
              .then(session => {
                  console.log('checking table');
                  session.getSchema(optionsRelease.schema).getTable('repertiRelease').existsInDatabase()
                      .then(exist => {
                          console.log('creating table repertiRelease');
                          mysqlx.getSession(optionsRelease)
                              .then(session => {
                                 session.sql(
                                'CREATE TABLE IF NOT EXISTS \`ReleaseRepertiArcheologici\`.\`repertiRelease\` (' +
                                  '\`id_inventario\` INT NOT NULL,' +
                                  '\`altri_inventari\` INT NULL,' +
                                  '\`produzione\` VARCHAR(45) NULL,' +
                                  '\`tecnica\` VARCHAR(45) NULL,' +
                                  '\`forma\` VARCHAR(45) NULL,' +
                                  '\`stato_conservazione\` VARCHAR(45) NULL,' +
                                  '\`luogo_conservazione\` VARCHAR(45) NULL,' +
                                  '\`provenienza\` VARCHAR(45) NULL,' +
                                  '\`collezione\` VARCHAR(45) NULL,' +
                                  '\`limc_digitale\` VARCHAR(45) NULL,' +
                                  '\`misure\` DOUBLE NULL,' +
                                  '\`descrizione_lato_a\` VARCHAR(45) NULL,' +
                                  '\`descrizione_lato_b\` VARCHAR(45) NULL,' +
                                  '\`padre\` INT NULL,' +
                                  '\`reperto_padre\` INT NULL,' +
                                  'PRIMARY KEY (\`id_inventario\`),' +
                                  'UNIQUE INDEX \`id_inventario_UNIQUE\` (\`id_inventario\` ASC) VISIBLE)' +
                                  'ENGINE = InnoDB;')
                                    .execute().then(() => {
                                      resolve()
                                    });

                                 /*console.log('adding primary key');
                                 session.sql(
                                'CREATE UNIQUE INDEX \`id_inventario_UNIQUE\` ON \`ReleaseRepertiArcheologici\`.\`repertiRelease\` (\`id_inventario\` ASC) VISIBLE;')
                                    .execute().then(() => {
                                      resolve()
                                    });*/

                                  console.log('creating table foto reperti');
                                 session.sql(
                                'CREATE TABLE IF NOT EXISTS \`ReleaseRepertiArcheologici\`.\`foto_reperti\` (' +
                                  '\`id_foto\` INT NOT NULL,' +
                                  '\`id_reperto\` INT NULL,' +
                                  '\`path_foto\` VARCHAR(45) NULL,' +
                                  'PRIMARY KEY (\`id_foto\`),' +
                                     'INDEX `id_inventario_idx` (`id_reperto` ASC) VISIBLE,' +
                                  'CONSTRAINT \`id_reperto\`' +
                                    'FOREIGN KEY (\`id_reperto\`)' +
                                    'REFERENCES \`ReleaseRepertiArcheologici\`.\`repertiRelease\` (\`id_inventario\`))' +
                                'ENGINE = InnoDB;')
                                .execute().then(() => {
                                   resolve()
                                 });


                              })
                      });
              })
      }
  });
}

createSchema().then(() => createTable());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', repertiRouter);
app.use('/rimuoviReperto', removeRepertiRouter);
app.use('/postTest', postTest);
app.use('/uploadImmagine', uploadImage);

app.disable('etag');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);

module.exports = app;
