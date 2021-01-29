import axios from 'axios';
import React, { Component } from 'react';
import './App.css';


// const getRes=()=>{
// 	let headers = new Headers();
// 	headers.append('Access-Control-Allow-Origin','*');
//     headers.append('Content-Type', 'application/json');
    

// 	const url = "http://13.75.106.59/syntbots-ai/v3/converse_api/prediction"; 
// 	fetch(url, {
		
// 		method: 'POST',
// 		headers: headers,
// 		body: JSON.stringify({
// 			"sessionid": "017",
// 			"conversation_name": "hire_1",
// 			"user_query": "Howdy"   
// 		})
		
// 	})
// 	.then(response => this.setState({output: response.text()}))
// 	.then(contents => console.log(contents))
// 	.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
// 	}
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
			          	{this.state.output}
			        </div>
		        </div>
  	 	</>

  	 )
  }

class App extends Component{

	constructor() {
		super();
		this.state = {
			output: "",
			questions: ["Hi! I'm a bot. What's up???"],
			answers: [] 
		};
	  }

	  componentDidMount() {
		this.getRes = this.getRes.bind(this);
	  }

	  handleChange=(e) => {
		this.setState({ output: e.target.value });
	  }

	  getRes=(target)=>{
		console.log(this.state.output);
		let headers = {
			'Access-Control-Allow-Origin':'*',
			'Content-Type': 'application/json'
		}
		let url = "http://13.75.106.59/syntbots-ai/v3/converse_api/prediction"; 
		const body = JSON.stringify({
			"sessionid": "017",
			"conversation_name": "hire_1",
			"user_query": "Howdy"   
		});
		axios.post(url, body, {headers}).then(response => {
			console.log(response.data);
			this.setState({
				questions: [...this.state.questions, this.state.output],
				answers:[...this.state.answers, response.data.text]
			 })
		})		
		}

  render(){
	  console.log(this.state.questions);
	  console.log(this.state.answers);
	return (
		<>

		<div className="chat-output" id="chat-output">
			{this.state.questions.map((item, index) => (
				<div className="user-message" key={index}>
				<div className="message">{item}</div>
			</div>
			))}
		
			{this.state.answers.map((item, index) => (
				<div className="message" key={index}>{item}</div>

			))}
			<div className="chat-input">
			  
			  <input type="text" id="user-input" className="user-input" onChange={ this.handleChange } placeholder="Talk to the bot." />
			  <button onClick={this.getRes}>ENTER</button>
  
		  </div>
		</div>

		
		{/* <div className="chat-output" id="chat-output">
				  <div className="user-message">
					<div className="message">Hi! I'm a bot. What's up?</div>
				  </div>
					  {this.state.output}
				</div>
	
			<div className="chat-input">
			  
				<input type="text" id="user-input" className="user-input" placeholder="Talk to the bot." />
				<button onClick={this.getRes}>ENTER</button>
	
			</div> */}
	
		</>
	  )
  }
  
}

export default App;