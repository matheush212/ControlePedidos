var arrInsertCEP = [];
const FORNECEDOR_CEP = 0;
const NUM_PEDIDO_CEP = 1;
const DT_ENVIO_CEP = 2;
const DT_PREVISTA_CEP = 3;
const DT_REAL_CEP = 4;
const USER_ID_CEP = 5;
const DATA_CEP = 6;
const INFO_ADICIONAL_CEP = 7;
var DisabledFields = false;
var dtRealEntregaCEPIsNull = false;
var UpdateStatusChegando = [];
var UpdateStatusAtrasado = [];
var dataAtual = "";
var AbreTelaPedidosProximos = true;



//********************************************************************//
async function CepOnLoad(){
    if(localStorage.getItem("OpenWarningScreen") == "true")
        await CEPControlSendToServer("SelectAllCEPFields", null);
    else
        await CloseWarningScreen();

    localStorage.setItem("Page", "CepPage");
    document.getElementById("loginName").textContent = document.getElementById("loginName").textContent + " " + localStorage.getItem("userName") + "!";
    document.getElementById("title_sheet_control").textContent = document.getElementById("title_sheet_control").textContent + " " + localStorage.getItem("userName");
    document.getElementById("dropbtn").textContent = localStorage.getItem("userName").substr(0, 1);
    await LoadCancelImages();
    await DisableFieldsControl(true);
}
//********************************************************************//



//********************************************************************//
async function LoadWarningsPage(Result){
    document.getElementById("icons").style.visibility = "hidden";
    document.getElementById("title_sheet_control").style.visibility = "hidden";
    document.getElementById("cep_sheet_control").style.visibility = "hidden";
    document.getElementById("buttonsCEP").style.visibility = "hidden";
    document.getElementById("SaveAndSend").style.visibility = "hidden";

    if(AbreTelaPedidosProximos){
        document.getElementById("lblInfoPedidos").textContent = "Pedidos com data de entrega próxima";
        AbreTelaPedidosProximos = false;
    }
    else{
        document.getElementById("lblInfoPedidos").textContent = "Pedidos com data de entrega atrasada";
        AbreTelaPedidosProximos = true;
    }
    
    var label = document.createElement("li");
    var label2 = document.createElement("li");
    label.innerHTML = "Nº Pedido:";
    label.style.color = "#0B274F";
    label2.innerHTML = "Data Prevista:";
    label2.style.color = "#0B274F";
    document.getElementById("lstCEPNumeroPedido").appendChild(label);
    document.getElementById("lstCEPDataPrevista").appendChild(label2);

    if(Result.length > 0){
        for(var i=0; i<Result.length; i++){
            var item = document.createElement("li");
            var item2 = document.createElement("li");
            item.role = "option";
            item2.role = "option";
            item.innerHTML = Result[i].NumeroPedido;
            item.style.marginTop = "1%";
            item2.innerHTML = Result[i].DataPrevistaEntrega;
            item2.style.marginTop = "1%";
            document.getElementById("lstCEPNumeroPedido").appendChild(item);
            document.getElementById("lstCEPDataPrevista").appendChild(item2);
        }
    }else{
        var item = document.createElement("li");
        var item2 = document.createElement("li");
        item.innerHTML = "Nenhum";
        item2.innerHTML = "Nenhum";
        document.getElementById("lstCEPNumeroPedido").appendChild(item);
        document.getElementById("lstCEPDataPrevista").appendChild(item2);
    }
}
//********************************************************************//



//********************************************************************//
async function DisableFieldsControl(status){
    DisabledFields = status;
    document.getElementById("Fornecedor").disabled = status;
    document.getElementById("NumeroPedido").disabled = status;
    document.getElementById("DataEnvio").disabled = status;
    document.getElementById("DataPrevistaEntrega").disabled = status;
    document.getElementById("DataRealEntrega").disabled = status;
    document.getElementById("InformacaoAdicional").disabled = status;
}
//********************************************************************//



//********************************************************************//
async function ClearFieldsControl(){
    if(!DisabledFields){
        var conf = confirm("Tem certeza que deseja limpar os campos?");
        if(conf){
            await ClearFieldsCEP();
        }
    }
}
//********************************************************************//



//********************************************************************//
async function ClearFieldsCEP(){
    if(!DisabledFields){
        document.getElementById("Fornecedor").value = "";
        document.getElementById("NumeroPedido").value = "";
        document.getElementById("DataEnvio").value = "";
        document.getElementById("DataPrevistaEntrega").value = "";
        document.getElementById("DataRealEntrega").value = "";
        document.getElementById("InformacaoAdicional").value = "";
    }
}
//********************************************************************//



//********************************************************************//
async function CancelOperation(){
    if(!DisabledFields){
        var conf = confirm("Tem certeza que deseja cancelar este CEP?");
        if(conf){
            await ClearFieldsCEP();
            await DisableFieldsControl(true);
        }
    }
}
//********************************************************************//



//********************************************************************//
async function GetActualDateCEP(){
    var data = new Date(),
    dia  = data.getDate().toString(),
    diaF = (dia.length == 1) ? '0'+dia : dia,
    mes  = (data.getMonth()+1).toString(), 
    mesF = (mes.length == 1) ? '0'+mes : mes,
    anoF = data.getFullYear();
    dataAtual = anoF + "-" + mesF + "-" + diaF;

    return diaF+"/"+mesF+"/"+anoF;
}
//********************************************************************//



//********************************************************************//
async function LoginOptions(option){
    if(option == "Logout"){
        var conf = confirm("Você realmente deseja sair?");
        if(conf)
            window.location.href = "/";
    }
    else if (option == "ChangePassword"){
        var conf = confirm("Você realmente deseja alterar a senha?");
        if(conf)
            window.location.href = "ChangePassword";
    }
    else if (option == "Perfil"){
        var conf = confirm("Você realmente deseja ver seu perfil?");
        if(conf)
            window.location.href = "Perfil";
    }
}
//********************************************************************//



//********************************************************************//
async function LoadCancelImages() {
    document.getElementById("imgFornecedor").src = "img/delete_icon.png";
    document.getElementById("imgNumeroPedido").src = "img/delete_icon.png";
    document.getElementById("imgDataEnvio").src = "img/delete_icon.png";
    document.getElementById("imgDataPrevistaEntrega").src = "img/delete_icon.png";
    document.getElementById("imgDataRealEntrega").src = "img/delete_icon.png";
    document.getElementById("imgInformacaoAdicional").src = "img/delete_icon.png";
}
//********************************************************************//



//********************************************************************//
async function ClearField(id){
    if(!DisabledFields){
        document.getElementById(id).value = "";

        if(id == "DataEnvio" || id == "DataPrevistaEntrega" || id == "DataRealEntrega")
            $("#"+id+" input[type=date]").val("");
    }
}
//********************************************************************//



//********************************************************************//
async function CheckAndSendData(){
    if(DisabledFields){
        alert("Clique em 'Novo' para iniciar um CEP!");
        return;
    }

    var nullFieldName = await NullFieldsValidationCEP(); 
    if(nullFieldName != "" && nullFieldName != "Cancel"){
        alert("O campo '"+nullFieldName+"' não pode ser nulo!");
        return;
    }

    if(!await isNumberStringFields(document.getElementById("NumeroPedido").value)){
        alert("AVISO! O campo 'Número do Pedido' deve conter apenas números!");
        return;
    }

    arrInsertCEP[FORNECEDOR_CEP] = document.getElementById("Fornecedor").value;
    arrInsertCEP[NUM_PEDIDO_CEP] = document.getElementById("NumeroPedido").value;
    arrInsertCEP[DT_ENVIO_CEP] = await ConvertDateCEP(document.getElementById("DataEnvio").value);
    arrInsertCEP[DT_PREVISTA_CEP] = await ConvertDateCEP(document.getElementById("DataPrevistaEntrega").value);

    if(dtRealEntregaCEPIsNull)
        arrInsertCEP[DT_REAL_CEP] = null;
    else    
        arrInsertCEP[DT_REAL_CEP] = await ConvertDateCEP(document.getElementById("DataRealEntrega").value);

    arrInsertCEP[USER_ID_CEP] = localStorage.getItem("userID");
    arrInsertCEP[DATA_CEP] = await GetActualDateCEP();
    arrInsertCEP[INFO_ADICIONAL_CEP] = document.getElementById("InformacaoAdicional").value;
    await CEPControlSendToServer("InsertCEP", arrInsertCEP);
}
//********************************************************************//



//********************************************************************//
async function NullFieldsValidationCEP(){
    if(document.getElementById("Fornecedor").value != ""){
        if(document.getElementById("NumeroPedido").value != ""){
            if(document.getElementById("DataEnvio").value != ""){
                if(document.getElementById("DataPrevistaEntrega").value != ""){
                    if(document.getElementById("DataRealEntrega").value != ""){
                        dtRealEntregaCEPIsNull == false;
                        return "";
                    }
                    else{
                        var conf = confirm("O campo 'Data Real de entrega' não foi preenchido! Continuar assim mesmo?");
                        if(conf){
                            dtRealEntregaCEPIsNull = true;
                            return "";
                        }
                        else
                            return "Cancel";
                    }
                }
                else
                    return "Data Prevista Entrega";
            }
            else
                return "Data de Envio";
        }
        else
            return "Número do Pedido";
    }
    else
        return "Fornecedor";
}
//********************************************************************//



//********************************************************************//
async function GoToReports(){
    var conf = confirm("Você realmente deseja abrir os relatórios? Qualquer pedido não enviado será perdido!");
        if(conf)
            window.location.href = "ControlReportsScreen";
}
//********************************************************************//



async function ConvertDateCEP(data){
    var ano = data.substr(0, 4);
    var mes = data.substr(5, 2);
    var dia = data.substr(8, 2);

    return dia+"/"+mes+"/"+ano;
}



async function CloseWarningScreen(){
    if(!AbreTelaPedidosProximos){

        while (document.getElementById("lstCEPNumeroPedido").hasChildNodes()) {
            document.getElementById("lstCEPNumeroPedido").removeChild(document.getElementById("lstCEPNumeroPedido").lastChild);
        }

        while (document.getElementById("lstCEPDataPrevista").hasChildNodes()) {
            document.getElementById("lstCEPDataPrevista").removeChild(document.getElementById("lstCEPDataPrevista").lastChild);
        }

        document.getElementById("icons").style.visibility = "hidden";
        document.getElementById("title_sheet_control").style.visibility = "hidden";
        document.getElementById("cep_sheet_control").style.visibility = "hidden";
        document.getElementById("buttonsCEP").style.visibility = "hidden";
        document.getElementById("SaveAndSend").style.visibility = "hidden";
        document.getElementById("listboxCEP").style.visibility = "visible";
        document.getElementById("WarningsOK").style.visibility = "visible";
        document.getElementById("title_warnig").style.visibility = "visible";
        setTimeout(async function(){
            await CEPControlSendToServer("SelectPedidosAtrasados" , null);
            return;
        }, 100);
    }
    else{
        document.getElementById("icons").style.visibility = "visible";
        document.getElementById("title_sheet_control").style.visibility = "visible";
        document.getElementById("cep_sheet_control").style.visibility = "visible";
        document.getElementById("buttonsCEP").style.visibility = "visible";
        document.getElementById("SaveAndSend").style.visibility = "visible";
        document.getElementById("listboxCEP").style.visibility = "hidden";
        document.getElementById("WarningsOK").style.visibility = "hidden";
        document.getElementById("title_warnig").style.visibility = "hidden";
        localStorage.setItem("OpenWarningScreen", "false");
    }
}


async function UpdateStatusOfAllCep(Result){
    var countChegando = 0;
    var countAtrasado = 0;
    await GetActualDateCEP();
    for(var i=0; i< Result.length; i++){
        if(Result[i].StatusEntrega != "Entregue"){
            var actualDateSum = new Date(dataAtual);
            actualDateSum.setDate(actualDateSum.getDate() + 4); 
            var dataPrevista = new Date(Result[i].DataPrevistaEntrega.substr(6, 4)+"-"+Result[i].DataPrevistaEntrega.substr(3, 2)+"-"+Result[i].DataPrevistaEntrega.substr(0, 2));

            if(actualDateSum >= dataPrevista){
                if(Math.abs(actualDateSum.getDate() - dataPrevista.getDate()) >= 5){
                    UpdateStatusAtrasado[countAtrasado] = Result[i].NumeroPedido;
                    countAtrasado++;
                }
                else{
                    UpdateStatusChegando[countChegando] = Result[i].NumeroPedido;
                    countChegando++;
                }
            }
        }
    }
    await CEPControlSendToServer("UpdateStatusAtrasado", UpdateStatusAtrasado);
    await CEPControlSendToServer("UpdateStatusChegando", UpdateStatusChegando);
    
    setTimeout(async function(){
        await CEPControlSendToServer("SelectPedidosProximos" , null);
    }, 100);
}


//----------------------------------------------Funcao de callback enviando e recebendo os dados do server-----------------------------------------------//

//Funcao callback que envia os comandos para o server
async function CEPControlSendToServer(command, arrCEP){
    try{
    var url = 'http://'+location.hostname+':'+location.port+'/CEPControl';

    var CheckData = {
        Command : command,
        arrInsert :  arrCEP
    };

    superagent
        .post(url)
        .send(CheckData)
        .end(async function(err, res){
            if(err || !res.ok){              
                console.log(err+"\n"+res);
            }
            else{
                var resFunction = JSON.stringify(res.body.Function); 
                var FunctionName = JSON.parse(resFunction); 

                if(FunctionName == "InsertCEP"){
                    alert("CEP salvo com sucesso!!!");
                    await ClearFieldsCEP();
                    await DisableFieldsControl(true);
                }
                else if(FunctionName == "SelectPedidosProximos" || FunctionName == "SelectPedidosAtrasados"){
                    var resResult = JSON.stringify(res.body.Result); 
                    var Result = JSON.parse(resResult); 
                    await LoadWarningsPage(Result);
                }
                else if(FunctionName == "SelectAllCEPFields"){
                    var resResult = JSON.stringify(res.body.Result); 
                    var Result = JSON.parse(resResult); 
                    await UpdateStatusOfAllCep(Result);
                }
                else{
                    var resResult = JSON.stringify(res.body.Result); 
                    var Result = JSON.parse(resResult); 

                    if(Result == "NumberAlreadyExist"){
                        alert("Já existe um CEP com esse número de pedido!");
                    }
                }
                
            }
        });
    }
    catch(err){
        console.log(err);
    }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------//