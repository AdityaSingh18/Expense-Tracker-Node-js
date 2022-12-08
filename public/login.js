async function savetocloud(event){
    event.preventDefault();
    const signupDetails={
  email: event.target.email.value,
  password: event.target.password.value
  
    }
    console.log(signupDetails)
  
  
  
  let serilized_Obj = JSON.stringify(signupDetails);
  
  const response= await axios.post("http://localhost:3000/user/login",signupDetails)
  .then((Response)=>{
    console.log(response)
    if(Response===201){
      console.log(Response)
      alert('login sucessfull')
    }
    else{
        throw new Error('Failed to Login')
    }
  
  })
  re
  .catch((err)=>{
      document.body.innerHTML+=`div style="color:red;">${err}<div>`
  })
  
  }