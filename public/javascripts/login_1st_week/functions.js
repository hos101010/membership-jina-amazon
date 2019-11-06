const user = {
    id : null,
    password : null,
    name : null,
    birthday_year : null,
    birthday_month : null,
    birthday_date : null,
    gender : null,
    email : null,
    number : null,
    interests : []
}

const check = {
    check_id_condition(input, output, print_pass){
        user.id = document.getElementById(input).value;
        if (/^[a-z0-9_-]{5,20}$/.test(user.id)){
            document.getElementById(output).innerHTML="";
            return 1;
        }else{
            document.getElementById(output).innerHTML=err_msg.under_msg['id_fail'];
            return 0;
        }
    },

    
    check_password_condition(input, output, print_pass){
        user.password = document.getElementById(input).value;
        if (user.password.length<8 || user.password.length>16)
            document.getElementById(output).innerHTML=err_msg.under_msg['pw_length'];
        else if (!/[A-Z]/.test(user.password))
            document.getElementById(output).innerHTML=err_msg.under_msg['pw_upper'];
        else if (!/[a-z]/.test(user.password))
            document.getElementById(output).innerHTML=err_msg.under_msg['pw_lower'];
        else if (!/[0-9]/.test(user.password))
            document.getElementById(output).innerHTML=err_msg.under_msg['pw_number'];
        else if (!/[~!@\\#$%<>^&*_-]/.test(user.password))
            document.getElementById(output).innerHTML=err_msg.under_msg['pw_special'];
        else {
            if (print_pass) document.getElementById(output).innerHTML=err_msg.under_msg['pw_pass'];
            else document.getElementById(output).innerHTML="";
            return 1;
        }
        return 0;
    }
}
