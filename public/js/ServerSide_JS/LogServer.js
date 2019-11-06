var fs = require('fs');
var dateWithMinutes;
var datetxt;
var GlobalVariables = require('./GlobalVariables.js');

async function LogError(errorString){
    await VerifyDirectory();
    await GetFormatedData();
    fs.stat(GlobalVariables.CaminhoPastaLog +'/Log/', function(err, stat) {
        if(err == null)
            fs.appendFile(GlobalVariables.CaminhoPastaLog +'/Log/logErro_'+ datetxt+'.txt', dateWithMinutes + " - " + errorString + "\n\n");
        else
            console.log(err);

    }); 
}
exports.LogError = LogError;


async function VerifyDirectory(){
    var dir = GlobalVariables.CaminhoPastaLog + '/Log';

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}


async function GetFormatedData(){

    var data = new Date(),
    dia  = data.getDate().toString(),
    diaF = (dia.length == 1) ? '0'+dia : dia,
    mes  = (data.getMonth()+1).toString(), 
    mesF = (mes.length == 1) ? '0'+mes : mes,
    anoF = data.getFullYear();

    datetxt = diaF+mesF+anoF;

    var h=data.getHours();
    var m=data.getMinutes();
    var s=data.getSeconds();
    h=await checkTime(h);
    m=await checkTime(m);
    s=await checkTime(s);

    dateWithMinutes = diaF+"/"+mesF+"/"+anoF+" "+h+":"+m+":"+s;
}

async function checkTime(i){
    if (i<10) {
        i="0" + i;
    }
        return i;
}