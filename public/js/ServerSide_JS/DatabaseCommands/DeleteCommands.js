const sqlite3 = require('sqlite3').verbose();


async function RemoveCEP(numeroPedido, res, dirname){
    let db = new sqlite3.Database('C:\\Users\\mhenr\\Desktop\\CEP_Projeto_Catolica\\ControlePedidos\\db\\CEP.db');
    try{
        db.run(`DELETE FROM CEP WHERE NumeroPedido = ?`, numeroPedido, function(err) {
            if (err) {
                return console.error(err.message);
            }

            var SQLJasonResult = {
                Function : "RemoveCEP"
            };
            
            db.close();
            res.send(SQLJasonResult);
            res.end(); 
        });
    }
    catch(err){
      console.log("RemoveCEP" + " - " + err.message)
    }
}
exports.RemoveCEP = RemoveCEP;

