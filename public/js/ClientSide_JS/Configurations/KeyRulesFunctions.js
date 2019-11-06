document.onkeydown = async function () {
    switch (event.keyCode) {
        case 13 :
            await EnterKeyControl();
    }
}

async function EnterKeyControl(){
    if(localStorage.getItem("Page") == "Login"){
        await SystemLogin();
    }
    else if(localStorage.getItem("Page") == "Reports"){
        if(localStorage.getItem("SelectCommand") == "SelectByDate" || localStorage.getItem("SelectCommand") == "SelectByDataEnvio" || 
            localStorage.getItem("SelectCommand") == "SelectByDataPrevista" || localStorage.getItem("SelectCommand") == "SelectByDataEntrega"){
            await ClearTable();
            await SendCommandsReportsServer(localStorage.getItem("SelectCommand"), await ConvertTime(document.getElementById("DataFiltroDe").value), await ConvertTime(document.getElementById("DataFiltroAte").value), null);
        }
        else{
            await ClearTable();
            if(document.getElementById("FiltroGeral").value == "")
                await SendCommandsReportsServer("SelectAllCEP", null, null, null, localStorage.getItem("userID"));
            else    
                await SendCommandsReportsServer(localStorage.getItem("SelectCommand"), null, null, document.getElementById("FiltroGeral").value);
        }
    }
}


async function isNumberStringFields(n) {
    return !isNaN(parseInt(n)) && isFinite(n);
}