var passwordChanged = false;

async function ChangePasswordOnLoad() {
    document.getElementById("loginName").textContent = document.getElementById("loginName").textContent + " " + localStorage.getItem("userName") + "!";
    document.getElementById("dropbtn").textContent = localStorage.getItem("userName").substr(0, 1);
}


async function ChangePassword(){
    var NullFieldName = await CheckFieldsValue();

    if(NullFieldName == ""){
        if(document.getElementById("NewPassword").value == document.getElementById("ConfirmNewPassword").value){
            var conf = confirm("Tem certeza que deseja alterar sua senha?");
            if(conf)
                await ChangePasswordServer("ChangePassword", localStorage.getItem("userID"), document.getElementById("OldPassword").value, document.getElementById("NewPassword").value);
        }
        else{
            alert("As senhas não coincidem, por favor, digite-as novamente!");
            await ClearDiferentPasswordsFields();
        }
    }
    else
        alert("O campo '"+ NullFieldName +"' não pode ser nulo!");
}


async function ClearDiferentPasswordsFields(){
    document.getElementById("NewPassword").value = "";
    document.getElementById("ConfirmNewPassword").value = "";
}


async function CheckFieldsValue(){
    if(document.getElementById("OldPassword").value != ""){
        if(document.getElementById("NewPassword").value != ""){
            if(document.getElementById("ConfirmNewPassword").value != "")
                return "";
            else
                return "Confirmar Senha";
        }
        else
            return "Nova Senha";
    }
    else
        return "Senha Atual";
}


async function ClearPasswordFields(){
    document.getElementById("OldPassword").value = "";
    document.getElementById("NewPassword").value = "";
    document.getElementById("ConfirmNewPassword").value = "";
}


async function BackChangePassword(){
    if(localStorage.getItem("Page") == "Reports")
        window.location.href = "ControlReportsScreen";
    else if(localStorage.getItem("Page") == "CepPage")
        window.location.href = "CEPControl";
    else if(localStorage.getItem("Page") == "EditCepPage")
        window.location.href = "CEPEditionControl";
    else
        window.location.href = "CEPControl";
}


//----------------------------------------------Funcao de callback enviando e recebendo os dados do server-----------------------------------------------//

//Funcao callback que envia os comandos para o server
async function ChangePasswordServer(command, userId, oldPassword, newPassword){
    try{
    var url = 'http://'+location.hostname+':'+location.port+'/ChangePassword';

    var CheckPassword = {
        Command : command,
        UserId : userId,
        OldPassword : oldPassword,
        NewPassword : newPassword 
    };

    superagent
        .post(url)
        .send(CheckPassword)
        .end(async function(err, res){
            if(err || !res.ok){              
                //document.getElementById("txaConsole").value += err + "\n" + res;
            }
            else{
                var resFunction = JSON.stringify(res.body.Function); 
                var FunctionName = JSON.parse(resFunction); 

                if(FunctionName == "ChangePasswordOk"){
                    alert("Senha Alterada com Sucesso! Você será deslogado, entre com sua nova senha.");
                    await ClearPasswordFields();
                    window.location.href = "/";
                }
                else if(FunctionName == "IncorrectPassword"){
                    alert("A sua senha atual esta incorreta, por favor, digite sua senha atual novamente!!!");
                    document.getElementById("OldPassword").value = "";
                }
            }
        });
    }
    catch(err){
        //
    }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------//