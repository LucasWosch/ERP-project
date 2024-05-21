var express         = require('express');
var path            = require('path');
var cookieParser    = require('cookie-parser');
var logger          = require('morgan');
var http            = require('http');

var indexRouter         = require('./routes/index');
var usersRouter         = require('./routes/users');
var productRouter       = require('./routes/product');
var depositRouter       = require('./routes/deposit');
var movimentacaoRouter  = require('./routes/movimentacao');
var departamentRouter   = require('./routes/departament');
var supplierRouter      = require('./routes/supplier');
var costCenterRouter    = require('./routes/costCenter');
var requisitionRoutes   = require('./routes/requisition');
var quotationRoutes     = require('./routes/quotation');
var purchaseRoutes      = require('./routes/purchase');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/deposit', depositRouter);
app.use('/movimentacao', movimentacaoRouter);
app.use('/departament', departamentRouter);
app.use('/supplier', supplierRouter);
app.use('/costCenter', costCenterRouter);
app.use('/requisition', requisitionRoutes);
app.use('/quotation', quotationRoutes);
app.use('/purchase', purchaseRoutes);

const db = require('./models');

async function applyMigrations(){
    try{
        migration_config = {
            create: true,
            alter: true
        };
        
        db.sequelize.sync({
            alter: migration_config.alter
        });

        console.log("Sincronização concluida!")
    }
    catch(error){
        console.log("Erro ao sincronizar o banco de dados", error);
    }
}

applyMigrations();

var PORT = process.env.PORT || 3055;
// FUNÇÃO ANONIMA (INJEÇÃO DE DEPENDÊNCIA)
app.listen(PORT, () => {
    console.log(`Servidor ativo na porta ${PORT}`)
})

module.exports = app;