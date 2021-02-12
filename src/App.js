import axios from 'axios';
import React, { Component } from 'react';
import './App.css';
import sendIcon from '../src/images/send_arrow.png';


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
		this.setState({ output: e.target.value });
 	}

	 handleClick=(e) => {
		const value = e.target.value;
		this.setState({ output: value });
		console.log('value', value)
		console.log('value', e.target.value)
		this.getRes();
 	}

	 showButton = (item, i) => {
		if(item.textType === 'LIST_BUTTON' && i === this.state.conversation.length-1){
			console.log(item)
			let buttonText = item.buttonValues.map((buttonText) => {
				return(
					<div style={{float: 'left'}}>
						<button key={i} className="button-text" onClick={this.handleClick} value={buttonText.button_label}>{buttonText.button_label}</button>
					</div>
					
				)
			})
			return buttonText;
		}
	 }

	  getOutPut = () => {
		
		let output = this.state.conversation.map((item, index) => {
			return(
			<div>
			<div className="user-message" key={index}>
				<div className="message">{item.question}</div>					
			</div>
			 <div className="message">{item.answer}</div>
			 <div>{this.showButton(item, index)}</div>
		</div>
		
		)	
		});
		return output;
		
	  }
	
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
			"sessionid": "032",
			"conversation_name": "new_hire",
			"user_query": this.state.output   
		});
		axios.post(url, body, {headers}).then(response => {
			console.log(response.data);
			if(response.data.text){
				let conversation = {
					question: this.state.output,
					answer: response.data.text,
					textType: response.data.type
				}
				this.setState({
					// questions: [...this.state.questions, this.state.output],
					// answers:[...this.state.answers, response.data.text],
					conversation: [...this.state.conversation, conversation]
				 })
			} else if(response.data.button_text){
				let conversation = {
					question: this.state.output,
					answer: response.data.button_text,
					textType: response.data.type,
					buttonValues: response.data.button_values
				}
				this.setState({
					// questions: [...this.state.questions, this.state.output],
					// answers:[...this.state.answers, response.data.button_text],
					conversation: [...this.state.conversation, conversation]
					
				 })
			}
			

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