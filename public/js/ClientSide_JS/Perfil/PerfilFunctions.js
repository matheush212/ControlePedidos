async function PerfilOnload() {
    document.getElementById("loginName").textContent = document.getElementById("loginName").textContent + " " + localStorage.getItem("userName") + "!";
    document.getElementById("dropbtn").textContent = localStorage.getItem("userName").substr(0, 1);
    document.getElementById("dvPerfil").textContent = localStorage.getItem("userName").substr(0, 1);
    document.getElementById("ChangeLogin").disabled = true;
    document.getElementById("CancelEdit").style.visibility = "hidden";
    document.getElementById("ChangeLogin").value = localStorage.getItem("userLogin");
}


async function BackPerfil(){
    if(localStorage.getItem("Page") == "Reports")
        window.location.href = "ControlReportsScreen";
    else if(localStorage.getItem("Page") == "CepPage")
        window.location.href = "CEPControl";
    else if(localStorage.getItem("Page") == "EditCepPage")
        window.location.href = "CEPEditionControl";
    else
        window.location.href = "CEPControl";
}


async function ChangeLoginName(){
    document.getElementById("ChangeLogin").disabled = false;
    document.getElementById("ChangeLogin").style.backgroundColor = "whitesmoke";
    document.getElementById("ChangeLogin").style.color = "#0B274F";
    document.getElementById("CancelEdit").style.visibility = "visible";
}


async function ChangeLoginBTN(){
    if(document.getElementById("ChangeLogin").value != ""){
        var conf = confirm("Tem certeza que deseja alterar seu login?");
        if(conf){
            document.getElementById("ChangeLogin").disabled = true;
            document.getElementById("ChangeLogin").style.backgroundColor = "rgb(73, 78, 87)";
            document.getElementById("ChangeLogin").style.color = "whitesmoke";
            document.getElementById("CancelEdit").style.visibility = "hidden";
            await ChangePerfilLoginServer("ChangeLogin", localStorage.getItem("userID"), document.getElementById("ChangeLogin").value);
        }
    }
    else
        alert("O campo 'Login' não pode ser nulo!!!");
}

async function CancelEdit(){
    if(document.getElementById("ChangeLogin").value != ""){
        document.getElementById("ChangeLogin").disabled = true;
        document.getElementById("ChangeLogin").style.backgroundColor = "rgb(73, 78, 87)";
        document.getElementById("ChangeLogin").style.color = "whitesmoke";
        document.getElementById("CancelEdit").style.visibility = "hidden";
    }
    else
        document.getElementById("ChangeLogin").value = localStorage.getItem("UserLogin");
}


//----------------------------------------------Funcao de callback enviando e recebendo os dados do server-----------------------------------------------//

//Funcao callback que envia os comandos para o server
async function ChangePerfilLoginServer(command, userId, userLogin){
    try{
    var url = 'http://'+location.hostname+':'+location.port+'/Perfil';

    var CheckLogin = {
        Command : command,
        UserId : userId,
        UserLogin : userLogin 
    };

    superagent
        .post(url)
        .send(CheckLogin)
        .end(async function(err, res){
            if(err || !res.ok){              
                //document.getElementById("txaConsole").value += err + "\n" + res;
            }
            else{
                var resFunction = JSON.stringify(res.body.Function); 
                var FunctionName = JSON.parse(resFunction); 

                if(FunctionName == "ChangeLoginOk"){
                    localStorage.setItem("userLogin", document.getElementById("ChangeLogin").value);
                    alert("Alteração efetuada com sucesso! Você será deslogado, entre com seu novo login.");
                    document.getElementById("ChangeLogin").value = localStorage.getItem("userLogin");
                    window.location.href = "/";
                }
            }
        });
    }
    catch(err){
        //
    }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------//