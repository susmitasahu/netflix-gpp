const checkValidData = (name, email, password) => {
   // console.log("Email received for validation:", email);
    console.log("password received for validation:", password);
    const isNameValid = name?.current?.value?.trim() !== "";
    
    const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim());
   // console.log("Is email valid:", isEmailValid);

    const isPasswordValid = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,20}$/.test(password);
    console.log("Is password valid:", isPasswordValid);

    if (!isNameValid) return "Name is required";
    if (!isEmailValid) return "Email ID is not valid";
    if (!isPasswordValid) return "Password must be 5-10 characters long and contain at least one number, one special character, one lowercase and one uppercase letter";
    
    return null;
};

export default checkValidData;