var express         = require('express');
var path            = require('path');
var cookieParser    = require('cookie-parser');
var logger          = require('morgan');
var http            = require('http');

var indexRouter                     = require('./routes/index');
var usersRouter                     = require('./routes/users');
var productRouter                   = require('./routes/product');
var depositRouter                   = require('./routes/deposit');
var movimentacaoRouter              = require('./routes/movimentacao');

var departmentRouter                = require('./routes/department');
var fornecedorRouter                = require('./routes/fornecedor');
var costCenterRouter                = require('./routes/costCenter');
var requisitionRoutes               = require('./routes/requisition');
var quoteRoutes                     = require('./routes/quote');
var purchaseRoutes                  = require('./routes/purchase');

var tituloRoutes                    = require('./routes/titulo');
var movimentacaoTituloRoutes        = require('./routes/movimentacaoTitulo');

var clienteRoutes                   = require('./routes/cliente');
var vendaRoutes                     = require('./routes/venda');
var tituloReceberRoutes             = require('./routes/tituloReceber');
var movimentacaoTituloReceberRoutes = require('./routes/movimentacaoTituloReceber');

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

app.use('/department', departmentRouter);
app.use('/fornecedor', fornecedorRouter);
app.use('/costCenter', costCenterRouter);
app.use('/requisition', requisitionRoutes);
app.use('/quote', quoteRoutes);
app.use('/purchase', purchaseRoutes);

app.use('/titulo', tituloRoutes);
app.use('/movimentacaoTitulo', movimentacaoTituloRoutes);

app.use('/cliente', clienteRoutes);
app.use('/venda', vendaRoutes);
app.use('/tituloReceber', tituloReceberRoutes);
app.use('/movimentacaoTituloReceber', movimentacaoTituloReceberRoutes);

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