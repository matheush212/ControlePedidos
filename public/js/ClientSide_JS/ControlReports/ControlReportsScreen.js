async function ReportsScreenOnLoad(){
    localStorage.setItem("Page", "Reports");
    document.getElementById("dvFiltroGeral").style.visibility = "hidden";
    document.getElementById("dvFiltroData").style.visibility = "hidden";
    document.getElementById("loginName").textContent = document.getElementById("loginName").textContent + " " + localStorage.getItem("userName") + "!";
    document.getElementById("dropbtn").textContent = localStorage.getItem("userName").substr(0, 1);
    await CreateTableCEP();
    await SendCommandsReportsServer("SelectAllCEP", null, null, null);
    await GetActualDateReports();
}

//Busca a data atual
async function GetActualDateReports(){
    var data = new Date(),
    dia  = data.getDate().toString(),
    diaF = (dia.length == 1) ? '0'+dia : dia,
    mes  = (data.getMonth()+1).toString(), 
    mesF = (mes.length == 1) ? '0'+mes : mes,
    anoF = data.getFullYear();
    dataAtual = anoF + "-" + mesF + "-" + diaF;

    document.getElementById("DataFiltroDe").value = anoF + "-" + mesF + "-" + diaF;
    document.getElementById("DataFiltroAte").value = anoF + "-" + mesF + "-" + diaF;
}

async function ClearTable(){
    while (document.getElementById('tbCEP').rows.length > 0 )
        document.getElementById('tbCEP').deleteRow(0);
}

async function cbxFiltrarPorChange(){
    if(document.getElementById("FiltrarPor").value == "1"){
        document.getElementById("dvFiltroData").style.visibility = "hidden";
        document.getElementById("dvFiltroGeral").style.visibility = "hidden";
        localStorage.setItem("SelectCommand", "SelectAllCEP");
        await ClearTable();
        await SendCommandsReportsServer("SelectAllCEP", null, null, null);
    }
    else if(document.getElementById("FiltrarPor").value == "2"){
        document.getElementById("dvFiltroData").style.visibility = "visible";
        document.getElementById("dvFiltroGeral").style.visibility = "hidden";
        localStorage.setItem("SelectCommand", "SelectByDate");
        await ClearTable();
        await SendCommandsReportsServer("SelectByDate", await ConvertTime(document.getElementById("DataFiltroDe").value), await ConvertTime(document.getElementById("DataFiltroAte").value), null);
    }
    else if(document.getElementById("FiltrarPor").value == "3"){
        document.getElementById("dvFiltroData").style.visibility = "hidden";
        document.getElementById("dvFiltroGeral").style.visibility = "visible";
        document.getElementById("FiltroGeral").focus();
        localStorage.setItem("SelectCommand", "SelectByFornecedor");
    }
    else if(document.getElementById("FiltrarPor").value == "4"){
        document.getElementById("dvFiltroData").style.visibility = "hidden";
        document.getElementById("dvFiltroGeral").style.visibility = "visible";
        document.getElementById("FiltroGeral").focus();
        localStorage.setItem("SelectCommand", "SelectByNumeroPedido");
    }
    else if(document.getElementById("FiltrarPor").value == "5"){
        document.getElementById("dvFiltroData").style.visibility = "visible";
        document.getElementById("dvFiltroGeral").style.visibility = "hidden";
        localStorage.setItem("SelectCommand", "SelectByDataEnvio");
        await ClearTable();
        await SendCommandsReportsServer("SelectByDataEnvio", await ConvertTime(document.getElementById("DataFiltroDe").value), await ConvertTime(document.getElementById("DataFiltroAte").value), null);
    }
    else if(document.getElementById("FiltrarPor").value == "6"){
        document.getElementById("dvFiltroData").style.visibility = "visible";
        document.getElementById("dvFiltroGeral").style.visibility = "hidden";
        localStorage.setItem("SelectCommand", "SelectByDataPrevista");
        await ClearTable();
        await SendCommandsReportsServer("SelectByDataPrevista", await ConvertTime(document.getElementById("DataFiltroDe").value), await ConvertTime(document.getElementById("DataFiltroAte").value), null);
    }
    else if(document.getElementById("FiltrarPor").value == "7"){
        document.getElementById("dvFiltroData").style.visibility = "visible";
        document.getElementById("dvFiltroGeral").style.visibility = "hidden";
        localStorage.setItem("SelectCommand", "SelectByDataEntrega");
        await ClearTable();
        await SendCommandsReportsServer("SelectByDataEntrega", await ConvertTime(document.getElementById("DataFiltroDe").value), await ConvertTime(document.getElementById("DataFiltroAte").value), null);
    }
    else if(document.getElementById("FiltrarPor").value == "8"){
        document.getElementById("dvFiltroData").style.visibility = "hidden";
        document.getElementById("dvFiltroGeral").style.visibility = "visible";
        document.getElementById("FiltroGeral").focus();
        localStorage.setItem("SelectCommand", "SelectByUserName");
    }
    else if(document.getElementById("FiltrarPor").value == "9"){
        document.getElementById("dvFiltroData").style.visibility = "hidden";
        document.getElementById("dvFiltroGeral").style.visibility = "visible";
        document.getElementById("FiltroGeral").focus();
        localStorage.setItem("SelectCommand", "SelectByStatus");
    }
}

async function CreateTableCEP(){
    var table = document.getElementById('tbCEP');
    th1 = document.createElement('th');
    th1.innerHTML = "Data de criação do CEP";
    th2 = document.createElement('th');
    th2.innerHTML = "Fornecedor";
    th3 = document.createElement('th');
    th3.innerHTML = "Número do Pedido";
    th4 = document.createElement('th');
    th4.innerHTML = "Data de Envio";
    th5 = document.createElement('th');
    th5.innerHTML = "Data Prevista de Entrega";
    th6 = document.createElement('th');
    th6.innerHTML = "Data Real de Entrega";
    th7 = document.createElement('th');
    th7.innerHTML = "Criador do CEP";
    th8 = document.createElement('th');
    th8.innerHTML = "Status";
    
    table.appendChild(th1);
    table.appendChild(th2);
    table.appendChild(th3);
    table.appendChild(th4);
    table.appendChild(th5);
    table.appendChild(th6);
    table.appendChild(th7);
    table.appendChild(th8);
}

//Função que carrega as informações na tabela
async function PopulaTableCEP(data){
    var table = document.getElementById("tbCEP");
    
    for (var i = 0; i < data.length; i++){
        var row = table.insertRow(table.rows.length);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        cell1.innerHTML = data[i].Data;
        cell2.innerHTML = data[i].Fornecedor;
        cell3.innerHTML = data[i].NumeroPedido;
        cell4.innerHTML = data[i].DataEnvio;
        cell5.innerHTML = data[i].DataPrevistaEntrega;
        
        if(data[i].DataRealEntrega != null)
            cell6.innerHTML = data[i].DataRealEntrega;
        else
            cell6.innerHTML = "Não cadastrado";

        cell7.innerHTML = data[i].Nome;
        var divStatus = await ControleStatusPedidos(data[i].StatusEntrega);  
        cell8.appendChild(divStatus);
        
    }

    $("#tbCEP tr").click(function(){
        $(this).addClass('selected').siblings().removeClass('selected'); 
        localStorage.setItem("numeroPedido", $(this).find('td:eq(2)').html());


        setTimeout(async function(){
            var conf = confirm("Você realmente deseja escolher esse pedido?");
            if (conf) {
                window.location.href = "CEPEditionControl";
            }
        }, 200);     
    });
}

async function ControleStatusPedidos(status){
    var divStatusCircle = document.createElement('div');
    divStatusCircle.style.width = "21px";
    divStatusCircle.style.height = "21px";
    divStatusCircle.style.borderRadius = "50px";
    divStatusCircle.style.borderStyle = "solid";
    divStatusCircle.style.borderWidth = "1px";
    divStatusCircle.style.marginLeft = "20px";

    if(status == "Entregue")
        divStatusCircle.style.backgroundColor = "#005200";
    else if(status == "Chegando")
        divStatusCircle.style.backgroundColor = "#CEB61A";
    else if(status == "Atrasado")
        divStatusCircle.style.backgroundColor = "#8E1E00";
    else if(status == "Sem Cadastro")
        divStatusCircle.style.backgroundColor = "#B55D00";
    else
        divStatusCircle.style.backgroundColor = "grey";

    return divStatusCircle;
}

async function ConvertTime(dateValue){
    var year = dateValue.substr(0, 4);
    var month = dateValue.substr(5, 2);
    var day = dateValue.substr(8, 2);
    return day+"/"+month+"/"+year;
}


//Abre tela de impressão
async function PrintPage(){
    var mywindow = window.open('', 'Print');
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.getElementById("table-scroll-CEP").innerHTML);
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();
    return true;
}

async function BackReports(){
    window.location.href = "CEPControl";
}


async function SendCommandsReportsServer(command, dataDe, dataAte, geral){
    try{
    var url = 'http://'+location.hostname+':'+location.port+'/ControlReportsScreen';

    var JSONCommand = {
        Command : command,
        DataDe : dataDe,
        DataAte : dataAte,
        Geral : geral
    };

    superagent
        .post(url)
        .send(JSONCommand)
        .end(async function(err, res){
            if(err || !res.ok){              
                console.log(err);
            }
            else{
                var resFunction = JSON.stringify(res.body.Function); 
				var FunctionName = JSON.parse(resFunction); 

               if(FunctionName == "SelectAllCEP" || FunctionName == "SelectByFornecedor" || FunctionName == "SelectByNumeroPedido" || FunctionName == "SelectByUserName" ||
                  FunctionName == "SelectByDataEnvio" || FunctionName == "SelectByDataPrevista" || FunctionName == "SelectByDataEntrega" || FunctionName == "SelectByDate" ||
                  FunctionName == "SelectByStatus"){
                    var resResult = JSON.stringify(res.body.Result); 
                    var Result = JSON.parse(resResult); 

                    if(Result.length != 0)
                        await PopulaTableCEP(Result);
                    else
                        alert("Nanehum registro encontrado!!!");
               }
            }
        });
    }
    catch(err){
        console.log(err);
    }
}