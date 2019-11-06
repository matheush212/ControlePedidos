async function LoginOnLoad(){
    localStorage.setItem("Page", "Login");
}


//---------------------------------------------------------------------------------------//
async function SystemLogin(){
    if(document.getElementById("userLogin").value != "" && document.getElementById("userPassword").value != "")
        await SendDataToServerLogin("CheckLogin", document.getElementById("userLogin").value, document.getElementById("userPassword").value);
    else    
        alert("Login inválido! Preencha todos os campos para continuar!");
}
//---------------------------------------------------------------------------------------//



//---------------------------------------------------------------------------------------//
async function CorrectLogin(){
    localStorage.setItem("OpenWarningScreen", "true");
    window.location.href = "CEPControl";
}
//---------------------------------------------------------------------------------------//




//----------------------------------------------Funcao de callback enviando e recebendo os dados do server-----------------------------------------------//

//Funcao callback que envia os comandos para o server
async function SendDataToServerLogin(command, login, password){
    try{
    var url = 'http://'+location.hostname+':'+location.port;

    var CheckLogin = {
        Command : command,
        Login : login,
        Password : password 
    };

    superagent
        .post(url)
        .send(CheckLogin)
        .end(async function(err, res){
            if(err || !res.ok){              
                console.log(err + "\n" + res);
            }
            else{
                var resFunction = JSON.stringify(res.body.Function); 
                var FunctionName = JSON.parse(resFunction); 

                if(FunctionName == "CheckLogin"){
                    var resStatusLogin = JSON.stringify(res.body.StatusLogin); 
                    var StatusLogin = JSON.parse(resStatusLogin);

                    var resUserName = JSON.stringify(res.body.UserName); 
                    var UserName = JSON.parse(resUserName);

                    var resUserLogin = JSON.stringify(res.body.UserLogin); 
                    var UserLogin = JSON.parse(resUserLogin);

                    if(StatusLogin){
                        var resUserID = JSON.stringify(res.body.UserID); 
                        var UserID = JSON.parse(resUserID);
                        localStorage.setItem("userName", UserName);
                        localStorage.setItem("userID", UserID);
                        localStorage.setItem("userLogin", UserLogin);
                        await CorrectLogin();
                    }
                    else{
                        alert("Login inválido!!!");
                        document.getElementById("userPassword").value = "";
                    }
                }

            }
        });
    }
    catch(err){
        //
    }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------//