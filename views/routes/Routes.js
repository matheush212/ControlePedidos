var SQLresult;

//----------------------------------------------------------------------------------ROTAS - GET-------------------------------------------------------------------------------------//
async function GetRoute(dirname, app) {
  var GlobalVariables = require(dirname + '/public/js/ServerSide_JS/GlobalVariables.js');
  GlobalVariables.CaminhoPastaLog = dirname;
  var Log = require(dirname + '/public/js/ServerSide_JS/LogServer.js');
  try{
    app.get('/', (req, res) => {
      res.render('pages/Index'); // Renderiza e apresenta a página index.ejs
      res.end();
    });

    app.get('/CEPControl', (req, res) => {
      res.render('pages/CEPControl'); // Renderiza e apresenta a página CEPControl.ejs
      res.end();
    });

    app.get('/ControlReportsScreen', (req, res) => {
      res.render('pages/ControlReportsScreen'); // Renderiza e apresenta a página ControlReportsScreen.ejs
      res.end();
    });

    app.get('/ChangePassword', (req, res) => {
      res.render('pages/ChangePassword'); // Renderiza e apresenta a página ChangePassword.ejs
      res.end();
    });

    app.get('/Perfil', (req, res) => {
      res.render('pages/Perfil'); // Renderiza e apresenta a página Perfil.ejs
      res.end();
    });

    app.get('/CEPEditionControl', (req, res) => {
      res.render('pages/CEPEditionControl'); // Renderiza e apresenta a página CEPControl.ejs
      res.end();
    });
  }
  catch(err){
    Log.LogError("Routes/GetRoute" + " - " + err.message);
  } 
}
exports.GetRoute = GetRoute;
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



//--------------------------------------------------------------------------------ROTAS - POST--------------------------------------------------------------------------------------//
async function PostRoute(dirname, app) {
  var Log = require(dirname + '/public/js/ServerSide_JS/LogServer.js');
  var InsertCommands = require(dirname + '/public/js/ServerSide_JS/DatabaseCommands/InsertCommands.js');
  var SelectCommands = require(dirname + '/public/js/ServerSide_JS/DatabaseCommands/SelectCommands.js');
  var UpdateCommands = require(dirname + '/public/js/ServerSide_JS/DatabaseCommands/UpdateCommands.js');
  var DeleteCommands = require(dirname + '/public/js/ServerSide_JS/DatabaseCommands/DeleteCommands.js');
  try{
    app.post('/', async function(req, res){
      var reqCommand = JSON.stringify(req.body.Command); 
      var SQLCommand = JSON.parse(reqCommand);
      //await InsertCommands.EncryptPassword("Matheus", req.body.Login, req.body.Password, res, dirname);

      if(SQLCommand == "CheckLogin"){
        var reqLogin = JSON.stringify(req.body.Login); 
        var Login = JSON.parse(reqLogin);
        var reqPassword = JSON.stringify(req.body.Password); 
        var Password = JSON.parse(reqPassword);

        await SelectCommands.CheckLogin(Login, Password, res, dirname);
      }
    });

    app.post('/CEPControl', async function(req, res){
      var command = JSON.stringify(req.body.Command); 
      var Command = JSON.parse(command);
     
      if(Command == "InsertCEP")
        await InsertCommands.CheckNumeroPedido(req.body.arrInsert, res, dirname);
      else if(Command == "SelectAllCEPFields")
        await SelectCommands.SelectAllCEPFields(res, dirname)
      else if(Command == "UpdateStatusAtrasado")
        await UpdateCommands.UpdateStatusEntrega(req.body.arrInsert, "Atrasado", res, dirname);
      else if(Command == "UpdateStatusChegando"){
        await UpdateCommands.UpdateStatusEntrega(req.body.arrInsert, "Chegando", res, dirname);
      }
      else
        await SelectCommands.SelectPedidosProximos(res, dirname);
    });

    app.post('/ChangePassword', async function(req, res){
      var command = JSON.stringify(req.body.Command); 
      var Command = JSON.parse(command);
     
      if(Command == "ChangePassword")
        await UpdateCommands.CheckOldPassword(req.body.UserId, req.body.OldPassword, req.body.NewPassword, res, dirname);
    });

    app.post('/ControlReportsScreen', async function(req, res){
      var reqCommand = JSON.stringify(req.body.Command); 
      var Command = JSON.parse(reqCommand);
     
      if(Command == "SelectAllCEP")
        await SelectCommands.SelectAllCEP(res, dirname);
      else if(Command == "SelectByDate")
        await SelectCommands.SelectByDate(req.body.DataDe, req.body.DataAte, res, dirname);
      else if(Command == "SelectByFornecedor")
        await SelectCommands.SelectByFornecedor(req.body.Geral, res, dirname);
      else if(Command == "SelectByNumeroPedido")
        await SelectCommands.SelectByNumeroPedido(req.body.Geral, res, dirname);
      else if(Command == "SelectByDataEnvio")
        await SelectCommands.SelectByDataEnvio(req.body.DataDe, req.body.DataAte, res, dirname);
      else if(Command == "SelectByDataPrevista")
        await SelectCommands.SelectByDataPrevista(req.body.DataDe, req.body.DataAte, res, dirname);
      else if(Command == "SelectByDataEntrega")
        await SelectCommands.SelectByDataEntrega(req.body.DataDe, req.body.DataAte, res, dirname);
      else if(Command == "SelectByUserName")
        await SelectCommands.SelectByUserName(req.body.Geral, res, dirname);
      else if(Command == "SelectByStatus")
        await SelectCommands.SelectByStatus(req.body.Geral, res, dirname);
    });

    app.post('/Perfil', async function(req, res){
      var command = JSON.stringify(req.body.Command); 
      var Command = JSON.parse(command);
     
      if(Command == "ChangeLogin")
        await UpdateCommands.ChangeLogin(req.body.UserId, req.body.UserLogin, res, dirname);
    });

    app.post('/CEPEditionControl', async function(req, res){
      var command = JSON.stringify(req.body.Command); 
      var Command = JSON.parse(command);
     
      if(Command == "SelectEditCEP")
        await SelectCommands.SelectCEPByNumeroPedido(req.body.Dados, res, dirname);
      else if (Command == "UpdateCEP")
        await UpdateCommands.CheckNumeroPedidoEdit(req.body.Dados, req.body.NumeroPedido, res, dirname);
      else if (Command == "RemoveCEP")
        await DeleteCommands.RemoveCEP(req.body.NumeroPedido, res, dirname);
    });
  }
  catch(err){
    Log.LogError("Routes/PostRoute" + " - " + err.message);
  } 
}
exports.PostRoute = PostRoute;
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
