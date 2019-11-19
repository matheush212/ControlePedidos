const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();


async function CheckLogin(login, password, res, dirname){
    try{
        var userLogin = "";
        var userName = "";
        var IdUsuario = "";
        var LoginOk = false;

        let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\CEP_Projeto_Catolica\\ControlePedidos\\db\\CEP.db');
        let sql = "SELECT Id id, Nome nome, Login login, Senha senha FROM Usuario WHERE Login = '" + login + "'";

        db.get(sql, (err, row) => {
            if (err) {
              throw err;
            }

            if(row != undefined){
                IdUsuario = row.id;  
                LoginOk = bcrypt.compareSync(password, row.senha);
                userLogin = row.login;
                userName = row.nome;
            }

            var SQLJasonResult = {
                StatusLogin : LoginOk,
                UserID : IdUsuario,
                UserName : userName,
                UserLogin : userLogin,
                Function : "CheckLogin"
            };

            db.close();
            res.send(SQLJasonResult);
            res.end(); 
          });
    }
    catch(err){
      console.log("CheckLogin" + " - " + err.message)
    }
}
exports.CheckLogin = CheckLogin;



async function SelectAllCEP(res, dirname){
    try{
        let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\CEP_Projeto_Catolica\\ControlePedidos\\db\\CEP.db');
        let sql ="SELECT CEP.*, Usuario.Nome FROM CEP "+
        "INNER JOIN Usuario ON (Usuario.Id = CEP.IdUsuario)"; 
       
        db.all(sql, [], (err, row) => {
            if (err) {
                throw err;
            }
        
            var resultSelect = row;

            var SQLJasonResult = {
                Result : resultSelect,
                Function : "SelectAllCEP"
            };
        
            db.close();
            res.send(SQLJasonResult);
            res.end();
        }); 
    }
    catch(err){
      console.log("SelectAllCEP" + " - " + err.message);
    }
}
exports.SelectAllCEP = SelectAllCEP;



async function SelectByDate(DataDe, DataAte, res, dirname){
    try{
        let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\CEP_Projeto_Catolica\\ControlePedidos\\db\\CEP.db');
        let sql ="SELECT CEP.*, Usuario.Nome FROM CEP "+
        "INNER JOIN Usuario ON (Usuario.Id = CEP.IdUsuario) WHERE CEP.Data >= '" + DataDe + "' AND CEP.Data <= '" + DataAte + "'"; 
       
        db.all(sql, [], (err, row) => {
            if (err) {
                throw err;
            }
        
            var resultSelect = row;

            var SQLJasonResult = {
                Result : resultSelect,
                Function : "SelectByDate"
            };
        
            db.close();
            res.send(SQLJasonResult);
            res.end();
        }); 
    }
    catch(err){
      console.log("SelectByDate" + " - " + err.message);
    }
}
exports.SelectByDate = SelectByDate;




async function SelectByFornecedor(Geral, res, dirname){
    try{
        let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\CEP_Projeto_Catolica\\ControlePedidos\\db\\CEP.db');
        let sql ="SELECT CEP.*, Usuario.Nome FROM CEP "+
        "INNER JOIN Usuario ON (Usuario.Id = CEP.IdUsuario) WHERE CEP.Fornecedor LIKE '" + Geral + "%'"; 
       
        db.all(sql, [], (err, row) => {
            if (err) {
                throw err;
            }
        
            var resultSelect = row;

            var SQLJasonResult = {
                Result : resultSelect,
                Function : "SelectByFornecedor"
            };
        
            db.close();
            res.send(SQLJasonResult);
            res.end();
        }); 
    }
    catch(err){
      console.log("SelectByFornecedor" + " - " + err.message);
    }
}
exports.SelectByFornecedor = SelectByFornecedor;



async function SelectByNumeroPedido(Geral, res, dirname){
    try{
        let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\CEP_Projeto_Catolica\\ControlePedidos\\db\\CEP.db');
        let sql ="SELECT CEP.*, Usuario.Nome FROM CEP "+
        "INNER JOIN Usuario ON (Usuario.Id = CEP.IdUsuario) WHERE CEP.NumeroPedido LIKE '" + Geral + "%'"; 
       
        db.all(sql, [], (err, row) => {
            if (err) {
                throw err;
            }
        
            var resultSelect = row;

            var SQLJasonResult = {
                Result : resultSelect,
                Function : "SelectByNumeroPedido"
            };
        
            db.close();
            res.send(SQLJasonResult);
            res.end();
        }); 
    }
    catch(err){
      console.log("SelectByNumeroPedido" + " - " + err.message);
    }
}
exports.SelectByNumeroPedido = SelectByNumeroPedido;



async function SelectByDataEnvio(DataDe, DataAte, res, dirname){
    try{
        let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\CEP_Projeto_Catolica\\ControlePedidos\\db\\CEP.db');
        let sql ="SELECT CEP.*, Usuario.Nome FROM CEP "+
        "INNER JOIN Usuario ON (Usuario.Id = CEP.IdUsuario) WHERE CEP.DataEnvio >= '" + DataDe + "' AND CEP.DataEnvio <= '" + DataAte + "'"; 
       
        db.all(sql, [], (err, row) => {
            if (err) {
                throw err;
            }
            var resultSelect = row;

            var SQLJasonResult = {
                Result : resultSelect,
                Function : "SelectByDataEnvio"
            };
        
            db.close();
            res.send(SQLJasonResult);
            res.end();
        }); 
    }
    catch(err){
      console.log("SelectByDataEnvio" + " - " + err.message);
    }
}
exports.SelectByDataEnvio = SelectByDataEnvio;



async function SelectByDataPrevista(DataDe, DataAte, res, dirname){
    try{
        let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\CEP_Projeto_Catolica\\ControlePedidos\\db\\CEP.db');
        let sql ="SELECT CEP.*, Usuario.Nome FROM CEP "+
        "INNER JOIN Usuario ON (Usuario.Id = CEP.IdUsuario) WHERE CEP.DataPrevistaEntrega >= '" + DataDe + "' AND CEP.DataPrevistaEntrega <= '" + DataAte + "'"; 
       
        db.all(sql, [], (err, row) => {
            if (err) {
                throw err;
            }
            var resultSelect = row;

            var SQLJasonResult = {
                Result : resultSelect,
                Function : "SelectByDataPrevista"
            };
        
            db.close();
            res.send(SQLJasonResult);
            res.end();
        }); 
    }
    catch(err){
      console.log("SelectByDataPrevista" + " - " + err.message);
    }
}
exports.SelectByDataPrevista = SelectByDataPrevista;



async function SelectByDataEntrega(DataDe, DataAte, res, dirname){
    try{
        console.log(DataDe);
        let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\CEP_Projeto_Catolica\\ControlePedidos\\db\\CEP.db');
        let sql ="SELECT CEP.*, Usuario.Nome FROM CEP "+
        "INNER JOIN Usuario ON (Usuario.Id = CEP.IdUsuario) WHERE CEP.DataRealEntrega >= '" + DataDe + "' AND CEP.DataRealEntrega <= '" + DataAte + "'"; 
       
        db.all(sql, [], (err, row) => {
            if (err) {
                throw err;
            }
            var resultSelect = row;

            var SQLJasonResult = {
                Result : resultSelect,
                Function : "SelectByDataEntrega"
            };
        
            db.close();
            res.send(SQLJasonResult);
            res.end();
        }); 
    }
    catch(err){
      console.log("SelectByDataEntrega" + " - " + err.message);
    }
}
exports.SelectByDataEntrega = SelectByDataEntrega;



async function SelectByUserName(Geral, res, dirname){
    try{
        let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\CEP_Projeto_Catolica\\ControlePedidos\\db\\CEP.db');
        let sql ="SELECT CEP.*, Usuario.Nome FROM CEP "+
        "INNER JOIN Usuario ON (Usuario.Id = CEP.IdUsuario) WHERE Usuario.Nome LIKE '" + Geral + "%'"; 
       
        db.all(sql, [], (err, row) => {
            if (err) {
                throw err;
            }
            var resultSelect = row;

            var SQLJasonResult = {
                Result : resultSelect,
                Function : "SelectByUserName"
            };
        
            db.close();
            res.send(SQLJasonResult);
            res.end();
        }); 
    }
    catch(err){
      console.log("SelectByUserName" + " - " + err.message);
    }
}
exports.SelectByUserName = SelectByUserName;



async function SelectCEPByNumeroPedido(numeroPedido, res, dirname){
    try{
        let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\CEP_Projeto_Catolica\\ControlePedidos\\db\\CEP.db');
        let sql ="SELECT CEP.*, Usuario.ID, Usuario.Nome FROM CEP "+
        "INNER JOIN Usuario ON (Usuario.Id = CEP.IdUsuario) WHERE CEP.NumeroPedido = '" + numeroPedido + "'"; 
       
        db.all(sql, [], (err, row) => {
            if (err) {
                throw err;
            }
            var resultSelect = row;

            var SQLJasonResult = {
                Result : resultSelect,
                Function : "SelectCEPByNumeroPedido"
            };
        
            db.close();
            res.send(SQLJasonResult);
            res.end();
        }); 
    }
    catch(err){
      console.log("SelectCEPByNumeroPedido" + " - " + err.message);
    }
}
exports.SelectCEPByNumeroPedido = SelectCEPByNumeroPedido;



async function SelectByStatus(statusEntrega, res, dirname){
    try{
        let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\CEP_Projeto_Catolica\\ControlePedidos\\db\\CEP.db');
        let sql ="SELECT CEP.*, Usuario.ID, Usuario.Nome FROM CEP "+
        "INNER JOIN Usuario ON (Usuario.Id = CEP.IdUsuario) WHERE CEP.StatusEntrega LIKE '" + statusEntrega + "%'"; 
       
        db.all(sql, [], (err, row) => {
            if (err) {
                throw err;
            }
            var resultSelect = row;

            var SQLJasonResult = {
                Result : resultSelect,
                Function : "SelectByStatus"
            };
        
            db.close();
            res.send(SQLJasonResult);
            res.end();
        }); 
    }
    catch(err){
      console.log("SelectByStatus" + " - " + err.message);
    }
}
exports.SelectByStatus = SelectByStatus;



async function SelectPedidosProximos(res, dirname){
    try{
        let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\CEP_Projeto_Catolica\\ControlePedidos\\db\\CEP.db');
        let sql ="SELECT NumeroPedido, DataPrevistaEntrega FROM CEP WHERE StatusEntrega = 'Chegando'"; 
       
        db.all(sql, [], (err, row) => {
            if (err) {
                throw err;
            }
            var resultSelect = row;

            var SQLJasonResult = {
                Result : resultSelect,
                Function : "SelectPedidosProximos"
            };
        
            db.close();
            res.send(SQLJasonResult);
            res.end();
        }); 
    }
    catch(err){
      console.log("SelectPedidosProximos" + " - " + err.message);
    }
}
exports.SelectPedidosProximos = SelectPedidosProximos;



async function SelectPedidosAtrasados(res, dirname){
    try{
        let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\CEP_Projeto_Catolica\\ControlePedidos\\db\\CEP.db');
        let sql ="SELECT NumeroPedido, DataPrevistaEntrega FROM CEP WHERE StatusEntrega = 'Atrasado'"; 
       
        db.all(sql, [], (err, row) => {
            if (err) {
                throw err;
            }
            var resultSelect = row;

            var SQLJasonResult = {
                Result : resultSelect,
                Function : "SelectPedidosAtrasados"
            };
        
            db.close();
            res.send(SQLJasonResult);
            res.end();
        }); 
    }
    catch(err){
      console.log("SelectPedidosAtrasados" + " - " + err.message);
    }
}
exports.SelectPedidosAtrasados = SelectPedidosAtrasados;



async function SelectAllCEPFields(res, dirname){
    try{
        let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\CEP_Projeto_Catolica\\ControlePedidos\\db\\CEP.db');
        let sql ="SELECT NumeroPedido, DataPrevistaEntrega, StatusEntrega FROM CEP"; 
       
        db.all(sql, [], (err, row) => {
            if (err) {
                throw err;
            }
            var resultSelect = row;

            var SQLJasonResult = {
                Result : resultSelect,
                Function : "SelectAllCEPFields"
            };
        
            db.close();
            res.send(SQLJasonResult);
            res.end();
        }); 
    }
    catch(err){
      console.log("SelectAllCEPFields" + " - " + err.message);
    }  
}
exports.SelectAllCEPFields = SelectAllCEPFields;