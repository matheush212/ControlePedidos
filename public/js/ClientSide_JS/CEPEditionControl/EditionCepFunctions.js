var arrEditCEP = [];
const EDIT_FORNECEDOR = 0;
const EDIT_NUM_PEDIDO = 1;
const EDIT_DT_ENVIO = 2;
const EDIT_DT_PREVISTA = 3;
const EDIT_DT_REAL = 4;
const EDIT_USER_ID = 5;
const EDIT_INFO_ADICIONAL = 6;
const EDIT_STATUS_ENTREGA = 7;
var cancelEdition = false;
var idUserEdition = "";
var nameUserEdition = "";
var dtRealEntregaIsNull = false;



//********************************************************************//
async function EditCepOnLoad(){
    localStorage.setItem("Page", "EditCepPage");
    document.getElementById("loginName").textContent = document.getElementById("loginName").textContent + " " + localStorage.getItem("userName") + "!";
    document.getElementById("title_sheet_control_edit").textContent = document.getElementById("title_sheet_control_edit").textContent + " " + localStorage.getItem("userName");
    document.getElementById("dropbtn").textContent = localStorage.getItem("userName").substr(0, 1);
    await LoadEditCancelImages();
    await EditCEPControlSendToServer("SelectEditCEP", localStorage.getItem("numeroPedido"));
    cancelEdition = false;
    await DisableFields(true);
}
//********************************************************************//



//********************************************************************//
async function LoadEditFieldsCEP(Result){
    idUserEdition = Result[0].IDUsuario;
    nameUserEdition = Result[0].Nome;
    document.getElementById("EditFornecedor").value = Result[0].Fornecedor;
    document.getElementById("EditNumeroPedido").value = Result[0].NumeroPedido;
    document.getElementById("EditDataEnvio").value = Result[0].DataEnvio.substr(6, 4)+"-"+Result[0].DataEnvio.substr(3, 2)+"-"+Result[0].DataEnvio.substr(0, 2);
    document.getElementById("EditDataPrevistaEntrega").value = Result[0].DataPrevistaEntrega.substr(6, 4)+"-"+Result[0].DataPrevistaEntrega.substr(3, 2)+"-"+Result[0].DataPrevistaEntrega.substr(0, 2);
    
    if(Result[0].DataRealEntrega != null)
        document.getElementById("EditDataRealEntrega").value = Result[0].DataRealEntrega.substr(6, 4)+"-"+Result[0].DataRealEntrega.substr(3, 2)+"-"+Result[0].DataRealEntrega.substr(0, 2);

    document.getElementById("EditStatusEntrega").value = Result[0].StatusEntrega;
    document.getElementById("EditInformacaoAdicional").value = Result[0].InformacoesAdicionais;
}
//********************************************************************//



//********************************************************************//
async function EditFieldsControl(){
    if(cancelEdition)
        await CancelEditOperation();
    else{
        if(idUserEdition == localStorage.getItem("userID")){
            document.getElementById("EditCEP").innerHTML = "Cancelar";
            await DisableFields(false);
            cancelEdition = true;
        }
        else{
            alert("Apenas o Usuário "+nameUserEdition+" pode editar esse CEP, pois ele foi o criador!");
        }
    }
}
//********************************************************************//



//********************************************************************//
async function DisableFields(status){
    document.getElementById("EditFornecedor").disabled = status;
    document.getElementById("EditNumeroPedido").disabled = status;
    document.getElementById("EditDataEnvio").disabled = status;
    document.getElementById("EditDataPrevistaEntrega").disabled = status;
    document.getElementById("EditDataRealEntrega").disabled = status;
    document.getElementById("EditStatusEntrega").disabled = status;
    document.getElementById("EditInformacaoAdicional").disabled = status;
}
//********************************************************************//




//********************************************************************//
async function CancelEditOperation(){
    var conf = confirm("Tem certeza que deseja cancelar esta edição?");
    if(conf){
        document.getElementById("EditCEP").innerHTML = "Editar";
        await DisableFields(true);
        await EditCEPControlSendToServer("SelectEditCEP", localStorage.getItem("numeroPedido"), null);
        cancelEdition = false;
        
    }
}
//********************************************************************//



//********************************************************************//
async function LoadEditCancelImages() {
    document.getElementById("imgEditFornecedor").src = "img/delete_icon.png";
    document.getElementById("imgEditNumeroPedido").src = "img/delete_icon.png";
    document.getElementById("imgEditDataEnvio").src = "img/delete_icon.png";
    document.getElementById("imgEditDataPrevistaEntrega").src = "img/delete_icon.png";
    document.getElementById("imgEditDataRealEntrega").src = "img/delete_icon.png";
    document.getElementById("imgEditInformacaoAdicional").src = "img/delete_icon.png";
}
//********************************************************************//




//********************************************************************//
async function CheckAndSendEditData(){
    if(!cancelEdition){
        alert("Clique em 'Editar' para habilitar a edição do CEP!");
        return;
    }

    var nullEditFieldName = await NullEditFieldsValidationCEP(); 
    if(nullEditFieldName != "" && nullEditFieldName != "Cancel"){
        alert("O campo '"+nullEditFieldName+"' não pode ser nulo!");
        return;
    }

    if(!await isNumberStringFields(document.getElementById("EditNumeroPedido").value)){
        alert("AVISO! O campo 'Número do Pedido' deve conter apenas números!");
        return;
    }

    arrEditCEP[EDIT_FORNECEDOR] = document.getElementById("EditFornecedor").value;
    arrEditCEP[EDIT_NUM_PEDIDO] = document.getElementById("EditNumeroPedido").value;
    arrEditCEP[EDIT_DT_ENVIO] = await ConvertEditDateCEP(document.getElementById("EditDataEnvio").value);
    arrEditCEP[EDIT_DT_PREVISTA] = await ConvertEditDateCEP(document.getElementById("EditDataPrevistaEntrega").value);

    if(dtRealEntregaIsNull)
        arrEditCEP[EDIT_DT_REAL] = null;
    else    
        arrEditCEP[EDIT_DT_REAL] = await ConvertEditDateCEP(document.getElementById("EditDataRealEntrega").value);
        
    arrEditCEP[EDIT_USER_ID] = localStorage.getItem("userID");
    arrEditCEP[EDIT_INFO_ADICIONAL] = document.getElementById("EditInformacaoAdicional").value;
    arrEditCEP[EDIT_STATUS_ENTREGA] = document.getElementById("EditStatusEntrega").value;
    await EditCEPControlSendToServer("UpdateCEP", arrEditCEP, localStorage.getItem("numeroPedido"));
}
//********************************************************************//



//********************************************************************//
async function ClearEditField(id){
    if(cancelEdition){
        document.getElementById(id).value = "";

        if(id == "EditDataEnvio" || id == "EditDataPrevistaEntrega" || id == "EditDataRealEntrega")
            $("#"+id+" input[type=date]").val("");
    }
}
//********************************************************************//



//********************************************************************//
async function NullEditFieldsValidationCEP(){
    if(document.getElementById("EditFornecedor").value != ""){
        if(document.getElementById("EditNumeroPedido").value != ""){
            if(document.getElementById("EditDataEnvio").value != ""){
                if(document.getElementById("EditDataPrevistaEntrega").value != ""){
                    if(document.getElementById("EditDataRealEntrega").value != ""){
                        dtRealEntregaIsNull == false;
                        return "";
                    }
                    else{
                        var conf = confirm("O campo 'Data Real de entrega' não foi preenchido! Continuar assim mesmo?");
                        if(conf){
                            dtRealEntregaIsNull = true;
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
async function RestoreCEP(){
    var conf = confirm("Tem certeza que deseja restaurar os dados iniciais?");
    if(conf){
        await EditCEPControlSendToServer("SelectEditCEP", localStorage.getItem("numeroPedido"), null);
    }
}
//********************************************************************//



//********************************************************************//
async function RemoveCEP(){
    if(idUserEdition == localStorage.getItem("userID")){
        var conf = confirm("Tem certeza que deseja excluir esse CEP?");
        if(conf)
            await EditCEPControlSendToServer("RemoveCEP", null, localStorage.getItem("numeroPedido"));
    }
    else{
        alert("Apenas o Usuário "+nameUserEdition+" pode excluir esse CEP, pois ele foi o criador!");
    }
}
//********************************************************************//



//********************************************************************//
async function ConvertEditDateCEP(data){
    var ano = data.substr(0, 4);
    var mes = data.substr(5, 2);
    var dia = data.substr(8, 2);

    return dia+"/"+mes+"/"+ano;
}
//********************************************************************//



//********************************************************************//
async function BackToCEPReports(){
    var conf = confirm("Tem certeza que deseja voltar?");
    if(conf)
        window.location.href = "ControlReportsScreen";
}
//********************************************************************//



//----------------------------------------------Funcao de callback enviando e recebendo os dados do server-----------------------------------------------//

//Funcao callback que envia os comandos para o server
async function EditCEPControlSendToServer(command, dados, numeroPedido){
    try{
    var url = 'http://'+location.hostname+':'+location.port+'/CEPEditionControl';

    var CheckData = {
        Command : command,
        Dados : dados,
        NumeroPedido : numeroPedido
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

                if(FunctionName == "UpdateCEP"){
                    localStorage.setItem("numeroPedido", dados[1]);
                    alert("CEP editado e salvo com sucesso!!!");
                    document.getElementById("EditCEP").innerHTML = "Editar";
                    await DisableFields(true);
                    await EditCepOnLoad();
                }
                else if(FunctionName == "SelectCEPByNumeroPedido"){
                    var resResult = JSON.stringify(res.body.Result); 
                    var Result = JSON.parse(resResult);
                    await LoadEditFieldsCEP(Result);  
                }
                else if(FunctionName == "RemoveCEP"){
                    alert("CEP excluído com sucesso!!! Você sera redirecionado para a página de relatórios!");
                    window.location.href = "ControlReportsScreen";
                }
                else{
                    var resResult = JSON.stringify(res.body.Result); 
                    var Result = JSON.parse(resResult); 

                    if(Result == "NumberAlreadyExistEdition"){
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