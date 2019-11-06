document.querySelector('nav ul').addEventListener("click", showAccountHandler);

function showAccountHandler(e){
    if (e.target.value == '로그인'){
        window.location.href = "/users/sign_in";
    }
}

if (document.querySelector(".signout")){
    document.querySelector(".signout").addEventListener("click", () => {
        fetch('/users/signout',{            
            })
            .then(res=> res.json())
            .then(response=>{
                window.location.href = response.page;
            })
            .catch(error => console.error('Error:', error));
    }, false);
}
  
if (document.querySelector(".admin")){
document.querySelector(".admin").addEventListener("click", () => {
    window.location.href = '/users/admin';
}, false);
}