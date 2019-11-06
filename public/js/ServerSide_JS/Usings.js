//-----------------------------------------------------------------------------Dependencias de codigo-------------------------------------------------------------------------------//
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
const nocache = require('nocache');
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



//------------------------------------------------------------------------------------Usings----------------------------------------------------------------------------------------//
async function Usings(express, dirname, app){
    app.set('view engine', 'ejs'); //Utiliza a extensão de código .ejs como o html da página
    app.use(expressLayouts);
    app.use(bodyParser.urlencoded());
    app.use(nocache());
    app.disable('view cache');

    //controle de permissão
    app.use('*', function(req, res, next){
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
        res.header('Access-Control-Allow-Headers', 'Accept, Origin, Content-Type, access_token');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.static(dirname + '/public'));
}
exports.Usings = Usings;
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//