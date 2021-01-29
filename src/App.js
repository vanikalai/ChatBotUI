import React from 'react';
import './App.css';
import axios from 'axios';




function App(){
  const getRes=()=>{
//   axios.get('http://13.75.106.59:80/syntbots-ai/v3/converse_api/prediction', {
//     headers:{
//       'Access-Control-Allow-Origin':'*',
// 	  'Access-Control-Allow-Methods': "GET,PUT,POST,DELETE,PATCH,OPTIONS",
// 	  "Content-Type": "application/json"

//   },
    
//       "sessionid": "017",
//       "conversation_name": "hire_1",
//       "user_query": "Howdy"    
  
//   })
//   .then(function (response) {
//     console.log("RESPONSE:--->"+response);
//   })
let headers = new Headers();
	headers.append('Access-Control-Allow-Origin','*');
    headers.append('Content-Type', 'application/json');
    

const url = "http://13.75.106.59/syntbots-ai/v3/converse_api/prediction"; 
fetch(url, {
	
	method: 'POST',
	headers: headers,
	body: JSON.stringify({
		"sessionid": "017",
		"conversation_name": "hire_1",
		"user_query": "Howdy"   
	})
	
})
.then(response => response.text())
.then(contents => console.log(contents))
.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}
  const output=()=>{
  	 return(
  	 	<>
  	 		   <div class='bot-message'>
			      <div class='message'>
			    		 hi
			      </div>
  			  </div>
			    <div className='user-message'>
			        <div className='message'>
			          	I'm like 20 lines of JavaScript I can't actually talk to you.
			        </div>
		        </div>
  	 	</>

  	 )
  }

  
  return (
    <>
    <div className="chat-output" id="chat-output">
			  <div className="user-message">
			    <div className="message">Hi! I'm a bot. What's up?</div>
			  </div>
			  	{output()}
			</div>

		<div className="chat-input">
		  
		    <input type="text" id="user-input" className="user-input" placeholder="Talk to the bot." />
		    <button onClick={getRes}>ENTER</button>

		</div>

    </>
  )
}

export default App;