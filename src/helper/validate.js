import { toast } from "react-hot-toast";
import { authenticate } from "./helper";
// validate login page username
export async function usernameValidate(values){
    const errors= usernameVerify({},values)

    if(values.username){
        // check for user existance
        const { status } = await authenticate(values.username)
        if(status!== 200){
            errors.exist = toast.error('User does not exist')
        }
    }
    return errors
}

// validate password 
export async function passwordValidate(values){
    const errors = passwordVerify({},values)
    return errors
}


/** validate reset password*/
export async function resetPasswordValidation(values){
    const errors = passwordVerify({},values);
    if(values.password!== values.confirm_pwd){
        errors.exist = toast.error("Password doesn't match...!")
    } 
    return errors
}

/** validate register form */
export async function registerValidation(values){
    const errors = usernameVerify({},values);
    passwordVerify(errors,values);
    emailVerify(errors,values);

    return errors
}

/** validate profile page */
export async function profileValidation(values){
    const errors = emailVerify({},values);
    return errors
}


/** ************************************** */

// /**validate password */
function passwordVerify(err={},values){
    const specialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-=/]/g
    if(!values.password){
        err.message = toast.error("password Required...!");
    }else if(values.password.includes(" ")){
        err.message= toast.error("Wrong Password...!");
    }else if(values.password.length<4){
        err.message = toast.error("Password must be more than 4 characters long");
    }else if(!specialChars.test(values.password)){
        err.message = toast.error("Password must have atleast a special character")
    }
    return err
}


// validate username 
function usernameVerify(err={},values){
    if(!values.username){
        err.username = toast.error('Username Required...!');
    }else if(values.username.includes(" ")){
        err.message= toast.error("Invalid username...!")
    }
    return err
}

// validate email
function emailVerify(error={},values){
    if(!values.email){
        error.email = toast.error("Email Required");
    }else if(values.email.includes(' ')){
        error.email = toast.error("wrong email")
    }else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(values.email)){
        error.email = toast.error("Invalid Email Address")
    }

    return error;
}