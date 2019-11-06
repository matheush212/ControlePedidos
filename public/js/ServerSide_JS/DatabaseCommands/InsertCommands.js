const sqlite3 = require('sqlite3').verbose();

async function EncryptPassword(name, login, password, res, dirname){
  const bcrypt = require('bcryptjs');
  const passwordCrip = password;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(passwordCrip, salt);
  await SaveDataUsers(name, login, hash, res, dirname);
}
exports.EncryptPassword = EncryptPassword;
  
  
  
async function SaveDataUsers(name, login, encryptpassword, res, dirname){
  try{
    let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\Sistema_CEP\\db\\CEP.db');
    db.run(`INSERT INTO Usuario(Nome, Login, Senha) VALUES(?, ?, ?)`, [name, login, encryptpassword], function(err) {
      if (err) {
        return console.log(err.message);
      }

      var SQLJasonResult = {
        Function : "SaveDataUsers",
      };

      db.close();
      res.send(SQLJasonResult);
      res.end(); 
    });
  }
  catch(err){
    console.log("SaveDataUsers" + " - " + err.message)
  }
}



async function CheckNumeroPedido(arrInsert, res, dirname){
  try{
    let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\Sistema_CEP\\db\\CEP.db');
    let sql ="SELECT ID FROM CEP WHERE NumeroPedido = " + arrInsert[1]; 
   
    db.get(sql, (err, row) => {
        if (err) {
            throw err;
        }

        if(row != undefined){
          var SQLJasonResult = {
              Result : "NumberAlreadyExist",
              Function : "CheckNumeroPedido"
          };

          db.close();
          res.send(SQLJasonResult);
          res.end();
        }
        else
          InsertCEP(arrInsert, res, dirname);
    }); 
  }
  catch(err){
    console.log("CheckNumeroPedido" + " - " + err.message);
  }  
}
exports.CheckNumeroPedido = CheckNumeroPedido;



async function InsertCEP(arrInsert, res, dirname){
  let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\Sistema_CEP\\db\\CEP.db');
  let sql = "";
  try{
      if(arrInsert[4] == null){
        sql = "INSERT INTO CEP(Fornecedor, NumeroPedido, DataEnvio, DataPrevistaEntrega, "+ 
          "DataRealEntrega, IDUsuario, Data, InformacoesAdicionais, StatusEntrega) VALUES('"+arrInsert[0]+"', '"+arrInsert[1]+ 
          "', '" + arrInsert[2] + "', '"+arrInsert[3]+"', NULL, "+
          "'"+arrInsert[5]+"', '"+arrInsert[6]+"', '"+arrInsert[7]+"', 'Dentro do Prazo')";
        }
      else{
        sql = "INSERT INTO CEP(Fornecedor, NumeroPedido, DataEnvio, DataPrevistaEntrega, "+ 
          "DataRealEntrega, IDUsuario, Data, InformacoesAdicionais, StatusEntrega) VALUES('"+arrInsert[0]+"', '"+arrInsert[1]+ 
          "', '" + arrInsert[2] + "', '"+arrInsert[3]+"', '"+arrInsert[4]+"', "+
          "'"+arrInsert[5]+"', '"+arrInsert[6]+"','"+arrInsert[7]+"', 'Dentro do Prazo')";
      }
      db.run(sql, [], function(err) {
        if (err) {
          return console.log(err.message);
        }
  
        var SQLJasonResult = {
          Function : "InsertCEP",
        };

        db.close();
        res.send(SQLJasonResult);
        res.end(); 
      });
  }
  catch(err){
    console.log("InsertCEP" + " - " + err.message);
  }
}