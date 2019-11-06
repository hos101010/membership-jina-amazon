if(document.querySelector('.update_privilege'))
document.querySelector('.update_privilege').addEventListener("click", () => {
    let checked_users = find_checks();
    send_to_back('/users/update_privilege', checked_users);
}, false);

if(document.querySelector('.delete_privilege'))
document.querySelector('.delete_privilege').addEventListener("click", () => {
    let checked_users = find_checks();
    send_to_back('/users/delete_privilege', checked_users);
}, false);

document.querySelector('.home').addEventListener("click", () => {
    fetch('/users/check_admin',{  
    })
    .then(res=> res.json())
    .then(response=>{
        if (response.msg == 'fail'){
            alert('권한이 바뀌었습니다. 다시 로그인해주세요.');
            window.location.href = '/users/sign_in';
        }
        else{
            window.location.href = '/main';
        }
    })
    .catch(error => console.error('Error:', error));
}, false);

if (document.querySelector('.item'))
document.querySelector('.item').addEventListener("click", () => {
    window.location.href = '/users/item'
}, false);

if (document.querySelector('.privilege'))
document.querySelector('.privilege').addEventListener("click", () => {
    window.location.href = '/users/admin'
}, false);


function find_checks(){
    let checks = document.querySelectorAll('.main input[type="checkbox"]:checked');
    let checked_users = [];
    checks.forEach(element => {
        checked_users.push(element.name);
    });
    return checked_users;
}

function send_to_back(url,checked_users){
    fetch(url,{            
        method: 'POST',
        body: JSON.stringify({id :checked_users}),
        headers:{
          'Content-Type': 'application/json'
        }
    })
    .then(res=> res.json())
    .then(response=>{
        alert(response.msg);
        window.location.href = '/users/admin';
    })
    .catch(error => console.error('Error:', error));
}