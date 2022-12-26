window.addEventListener("DOMContentLoaded",()=>{
    const token = localStorage.getItem('token')
    const decodeToken= parseJwt(token)
    const ispremiumuser = decodeToken.ispremiumuser
    if(ispremiumuser){
      showPremiumuserMessage()
      showLeaderBoard()
    }
    axios.get('http://localhost:3000/expenses',{headers:{"Authorization":token}})
    .then((Response)=>{
      console.log(Response)
  
      for(var i=0;i<Response.data.length;i++){
          ShowExpenses(Response.data[i])
          console.log(Response.data[i])
      }
    })
  
      
  })
  
  function savetocloud(event){
    event.preventDefault();
    myobj={
  amount :event.target.amount.value,
  descip: event.target.descip.value,
  category: event.target.category.value,
  id:localStorage.getItem('token')
    }
    const token = localStorage.getItem('token')
  
  
  let serilized_Obj = JSON.stringify(myobj);
  console.log(myobj)
  
  axios.post("http://localhost:3000/addexpense",myobj,{headers:{"Authorization":token}})
  .then((Response)=>{
  console.log(Response)
  document.getElementById('amount').value="";
    document.getElementById('descip').value="";
    document.getElementById('category').value="";
  
  })
  .catch((err)=>{
      console.log(err)
  })
  
  ShowExpenses(myobj)
  }
  
  
  
  function ShowExpenses(user){
   let parentNode = document.getElementById('belowexpenses');
   let childHTML = `<li id=${user.id}> ${user.amount}-${user.descip}-${user.category}
    <button onclick=deleteUser('${user.id}')> Delete </button>
  </li>`
  ;
  
  
  parentNode.innerHTML= parentNode.innerHTML+childHTML;
    }
  
    function deleteUser(userId){
      const token = localStorage.getItem('token')
      axios.delete(`http://localhost:3000/delete/${userId}`,{headers:{"Authorization":token}})
      .then(()=>{
          removeExpenseFromScreen(userId)
      })
      .catch((err)=>{
          console.log(err);
      })
  removeExpenseFromScreen(userId)
    }
  
    function removeExpenseFromScreen(userId){
      let parentNode = document.getElementById('belowexpenses');
      let childNodeTobeDeleted = document.getElementById(userId);
      console.log(childNodeTobeDeleted);
     parentNode.removeChild(childNodeTobeDeleted);
    }


    document.getElementById('rzp-button1').onclick = async function(e){
        var x =0;
        const token = localStorage.getItem('token')
        try {
            const response = await axios.post('http://localhost:3000/payment/premiummembership', x, {headers : {'Authorization': token}})
    
            checkout(response.data);
        } catch (error) {
            console.log(error)
        }
    }
    function parseJwt (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
  }
  function showLeaderBoard(){
    const inputElement = document.createElement('input')
    inputElement.type='button'
    inputElement.value='show LeaderBoard'
    inputElement.onclick= async()=>{
      const token = localStorage.getItem('token')
      const userLeaderBoardArray = await axios.get('http://localhost:3000/premium/showLeaderBoard',{headers : {'Authorization': token}})

      var LeaderBoardElem = document.getElementById('leaderboard')
      LeaderBoardElem.innerHTML+='<h1>Leader Board</h1>'
      userLeaderBoardArray.data.forEach((userDetails)=>{
        LeaderBoardElem.innerHTML+=`<li>Name- ${userDetails.name} Total Expense - ${userDetails.total_cost}`
      })
    }
    document.getElementById('message').appendChild(inputElement)
  }

  function showPremiumuserMessage(){
    document.getElementById('rzp-button1').style.visibility ='hidden'
                    document.getElementById('message').innerHTML='You are premium User'
  }

    function checkout(order){
        const token = localStorage.getItem('token')
        // console.log(order);
        // console.log(order.order.id)
    
        var options = {
            "key" : order.key_id,
            "amount": order.order.amount,
            "currency": "INR",
            "order_id": order.order.id,
            "handler": function (response) {
                
                alert(`Payment successfull . Payment Id:- ${response.razorpay_payment_id} ` );
                
                // console.log(response.razorpay_payment_id);
                // console.log(response.razorpay_order_id);
                // console.log(response.razorpay_signature);
    
                axios.post('http://localhost:3000/payment/updatestatus', response,
                 {headers : {'Authorization': token}})
                .then(res => {
                    console.log("done");
                    console.log(res);
                    alert("You are a premium user now");
                    showPremiumuserMessage()
                    localStorage.setItem('user' , "true")
                    //localStorage.setItem('token',res.data.token)
                    premiumUser();
                    showLeaderBoard()
                    getPremiumLeaderboard()
                })
                .catch(err => console.log(err));
            },
            "prefill": {
                "name": "Test User",
                "email": "test.user@example.com",
                "contact": "7003442036"
              },
            "theme": {
                "color": "#3399cc",
            },
    
            "callback_url": "expense.html"
        }
    
        var razorpay_1 = new Razorpay(options);
    
        razorpay_1.on('payment.failed', function(res) {
            alert(res.error.code);
            alert(res.error.description);
        });
    
        razorpay_1.open();
    }

    function download(){
      const token = localStorage.getItem('token')
      axios.get('http://localhost:3000/download',{headers : {'Authorization': token}})
      .then((response)=>{
        if(response.status===200){
          var a = document.createElement("a");
          a.href= response.data.fileURL
          a.download= 'myexpense.csv';
          a.click();
        }
        else{
          throw new Error(response.data.message)
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    }