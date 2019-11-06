const bcrypt = require('bcryptjs');
 
async function ChangeLogin(userId, userLogin, res, dirname){
  const sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\Sistema_CEP\\db\\CEP.db');
  try{
      let sql = "UPDATE Usuario SET Login = '" + userLogin + "' WHERE Id = '" + userId + "'";
      
      db.run(sql, function(err) {
          if (err) {
              return console.error(err.message);
          }

          var SQLJasonResult = {
              Function : "ChangeLoginOk"
          };
              
          db.close();
          res.send(SQLJasonResult);
          res.end(); 
      });
  }
  catch(err){
      console.log("ChangeLoginOk" + " - " + err.message);
  }
}
exports.ChangeLogin = ChangeLogin;



function CheckOldPassword(userId, oldPassword, newPassword, res, dirname){
  try{
    const sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\Sistema_CEP\\db\\CEP.db');

    let sql = "SELECT Senha senha FROM Usuario WHERE Id = '" + userId + "'";

    db.get(sql, (err, row) => {
        if (err) {
            throw err;
        }

        var PasswordOk = false;
        if(row.senha != undefined)
        {
            PasswordOk = bcrypt.compareSync(oldPassword, row.senha);

            if(PasswordOk)
                EncryptNewPassword(userId, newPassword, res, dirname);
            else{
                var SQLJasonResult = {
                    Function : "IncorrectPassword"
                };
                    
                res.send(SQLJasonResult);
                res.end(); 
            }
        }
    });
  }
  catch(err){
      console.log("CheckOldPassword" + " - " + err.message);
  }
}
exports.CheckOldPassword = CheckOldPassword;



async function EncryptNewPassword(userId, newPassword, res, dirname){
  try{
      const passwordCrip = newPassword;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(passwordCrip, salt);
      await ChangePasswordInDB(userId, hash, res, dirname);
  }
  catch(err){
    console.log("EncryptNewPassword" + " - " + err.message);
  }
}


async function ChangePasswordInDB(userId, EncryptedPassword, res, dirname){
  const sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\Sistema_CEP\\db\\CEP.db');
  try{
      let sql = "UPDATE Usuario SET Senha = '" + EncryptedPassword + "' WHERE Id = '" + userId + "'";
      
      db.run(sql, function(err) {
          if (err) {
              return console.error(err.message);
          }

          var SQLJasonResult = {
              Function : "ChangePasswordOk"
          };
              
          db.close();
          res.send(SQLJasonResult);
          res.end();
      });
  }
  catch(err){
      console.log("ChangePasswordInDB" + " - " + err.message);
  }
}


async function CheckNumeroPedidoEdit(dados, numeroPedido, res, dirname){
  const sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\Sistema_CEP\\db\\CEP.db');
  try{
      let sql = "SELECT ID id FROM CEP WHERE NumeroPedido = " + dados[1];
      
      db.get(sql, (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        if(dados[1] != numeroPedido){
          if(row != undefined){
            var SQLJasonResult = {
              Function : "InsertCEPControl",
              Result : "NumberAlreadyExistEdition"
            };
              
            db.close();
            res.send(SQLJasonResult);
            res.end();
          }
          else{
            db.close();
            UpdateCEP(dados, numeroPedido, res, dirname);
          }
        }
        else{
          db.close();
          UpdateCEP(dados, numeroPedido, res, dirname);
        }
      });
  }
  catch(err){
      console.log("CheckNumeroPedidoEdit" + " - " + err.message);
  }
}
exports.CheckNumeroPedidoEdit = CheckNumeroPedidoEdit;



async function UpdateCEP(dados, numeroPedido, res, dirname){
  try{
    const sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\Sistema_CEP\\db\\CEP.db');
    let sql = "";

      if(dados[4] == null){
        sql = "UPDATE CEP SET Fornecedor = '" + dados[0] + "', NumeroPedido = '" + dados[1] + "', DataEnvio = '" + dados[2] + "', "+
          "DataPrevistaEntrega = '" + dados[3] + "', DataRealEntrega = NULL, IDUsuario = '" + dados[5] + "', "+
          "InformacoesAdicionais = '" + dados[6] + "', StatusEntrega = '" + dados[7] + "' WHERE NumeroPedido = " + numeroPedido;
      }
      else{
        sql = "UPDATE CEP SET Fornecedor = '" + dados[0] + "', NumeroPedido = '" + dados[1] + "', DataEnvio = '" + dados[2] + "', "+
          "DataPrevistaEntrega = '" + dados[3] + "', DataRealEntrega = '" + dados[4] + "', IDUsuario = '" + dados[5] + "', "+
          "InformacoesAdicionais = '" + dados[6] + "', StatusEntrega = '" + dados[7] + "' WHERE NumeroPedido = " + numeroPedido;
      }

      db.run(sql, function(err) {
        if (err) {
            return console.error(err.message);
        }

        var SQLJasonResult = {
            Function : "UpdateCEP"
        };
            
        db.close();
        res.send(SQLJasonResult);
        res.end();
    });
  }
  catch(err){
    console.log("UpdateCEP" + " - " + err.message);
  }
}



async function UpdateStatusEntrega(numeroPedido, status, res, dirname){
  try{
    const sqlite3 = require('sqlite3').verbose();
      let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\Sistema_CEP\\db\\CEP.db');
      let sql = "UPDATE CEP SET StatusEntrega = '" + status + "' WHERE NumeroPedido IN ("+ numeroPedido +")";
      db.run(sql, function(err) {
        if (err) {
            return console.error(err.message);
        }
      });
  }
  catch(err){
    console.log("UpdateStatusEntrega" + " - " + err.message);
  }
}
exports.UpdateStatusEntrega = UpdateStatusEntrega;