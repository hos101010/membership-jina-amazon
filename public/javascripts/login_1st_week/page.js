//로그인 페이지
document.getElementById("signin_id_input").addEventListener("blur", () => {
    check.check_id_condition('signin_id_input', 'signin_id_small');
}, false);

document.getElementById("signin_pw_input").addEventListener("blur", () => {
    check.check_password_condition('signin_pw_input', 'signin_pw_small', 0);
}, false);

document.getElementById("sign_in_button").addEventListener("click", () => {
    let id_check = check.check_id_condition('signin_id_input', 'signin_id_small');
    let password_check = check.check_password_condition('signin_pw_input', 'signin_pw_small', 0);
    if (id_check && password_check){
        fetch('/users/check_user',{            
            method: 'POST',
            body: JSON.stringify({id : user.id, pw: user.password}),
            headers:{
              'Content-Type': 'application/json'
            }
        })
        .then(res=> res.json())
        .then(response=>{
            if (response.page)
                window.location.href = response.page;
            else
                alert(response.msg);
        })
        .catch(error => console.error('Error:', error));
    }
}, false);
