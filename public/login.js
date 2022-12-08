async function savetocloud(event){
    event.preventDefault();
    const signinDetails={
  email: event.target.email.value,
  password: event.target.password.value
  
    }
    console.log(signinDetails)
  
  
  
  let serilized_Obj = JSON.stringify(signinDetails);
  
  const response= await axios.post("http://localhost:3000/user/login",signinDetails)
  .then((Response)=>{
    console.log(Response)
    if(response.status===201){
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