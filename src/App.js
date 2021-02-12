import axios from 'axios';
import React, { Component } from 'react';
import './App.css';
import sendIcon from '../src/images/send_arrow.png';


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
			output: "Howdy",
			questions: ["Hi! I'm a bot. What's up???"],
			answers: [],
			conversation: [{
				question: "Hi! I'm a bot. What's up???",
				answer: ''
				
				}] 
			};
	  }

	  componentDidMount() {
		this.getRes();		
		
	  }

	  handleChange=(e) => {
		e.preventDefault();
		this.setState({ output: e.target.value });
 }

	  getOutPut = () => {
		
		let output = this.state.conversation.map((item, index) => {
			return(
			<div>
			<div className="user-message" key={index}>
				<div className="message">{item.question}</div>					
			</div>
			 <div className="message">{item.answer}</div>
		</div>
		)	
		});
		return output;
		
	  }
	//   getOutPutWithButton = () => {
	// 	  let outputwithButton = 
	//   }

	  getRes=()=>{
		console.log(this.state.output);
		const username = 'sbaiserviceuser'
		const password = 'syntbot123$'

		const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
		let headers = {
			'Authorization': `Basic ${token}`,
			'Access-Control-Allow-Origin':'*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Content-Type': 'application/json',
			
		}
		const url = "http://13.75.106.59/syntbots-ai/v3/converse_api/prediction"; 
		const body = JSON.stringify({
			"sessionid": "020",
			"conversation_name": "new_hire",
			"user_query": this.state.output   
		});
		axios.post(url, body, {headers}).then(response => {
			console.log(response.data);
			let conversation = {
				question: this.state.output,
				answer: response.data.text
			}
			this.setState({
				questions: [...this.state.questions, this.state.output],
				answers:[...this.state.answers, response.data.text],
				conversation: [...this.state.conversation, conversation]
			 })

		})	
		
	// const optionsMarkup = options.map((option) => (
		// 	<button
		// 	  className="option-button"
		// 	  key={option.id}
		// 	  onClick={option.handler}
		// 	>
		// 	  {option.text}
		// 	</button>
		//   ));
		
		 
		 }

  render(){
	  console.log('Conversation', this.state.conversation);
	return (
		<>

		<div className="chat-output" id="chat-output">
			{this.getOutPut()}
			<div className="chat-input">
			  
			  <input type="text" id="user-input" className="user-input"
			  onChange={ this.handleChange } placeholder="Talk to the bot."/>
			  {/* <button onClick={this.getRes}><i class="arrow right"></i></button> */}
			  <img id = "userinput_img" src = {sendIcon} style = {{width:38}} onClick={this.getRes} ></img>
		  </div>
		</div>
		</>
	  )
  }
  
}

export default App;