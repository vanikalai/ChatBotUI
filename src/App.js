import axios from 'axios';
import React, { Component } from 'react';
import './App.css';
import sendIcon from '../src/images/send_arrow.png';
import avatar from './images/avatar.png';
import bot from './images/bot.png';

class App extends Component{

	constructor() {
		super();
	    const randNo =Math.floor(Math.random()*(999-100+1)+100);
		this.state = {
			output: "Howdy",
			input: '',
			random: randNo,
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
         document.getElementById('chat-output').scrollTop = 9999999;		
	  }

	  componentDidUpdate() {
		document.getElementById('chat-output').scrollTop = 9999999;
	  }

	  handleChange=(e) => {
		this.setState({ output: e.target.value, input: e.target.value });
 	}

	 handleClick=(e) => {
		const value = e.target.value;
		this.setState({ output: value }, () => {
			this.getRes();
		});
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
			{index!=0 && index!=1?
			<div className="user-message" key={index} style={{textAlign: 'end'}}>
			
				<div className="message">{item.question} </div><img src={avatar} width='45' height='45' className="floatRight" />					
			</div>:""
		    }
			 {item.answer != ''?<div className="user-message" style={{marginTop: 5}}><img src={bot} className="floatLeft" width='45' height='45' /><div className="message" style={{backgroundColor: '#0FB1C6'}}>{item.answer}</div> </div>:null}
			 <div>{this.showButton(item, index)}</div>
		</div>
		
		)	
		});
		return output;
		
	  }
	
	  getRes=()=>{
	
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
			"sessionid": this.state.random,
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
					input: '',
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
					input: '',
					conversation: [...this.state.conversation, conversation]
					
				 })
			}
			

		})	
		 
		}

  render(){
	  console.log('Conversation', this.state.conversation);
	return (
		<div className = "chat-background">
		 <div className="chat-heading">
		    <h3> Atos Syntel L0 Interview Process </h3>
		 </div>

		<div className="chat-output" id="chat-output">
			{this.getOutPut()}

		</div>
					<div className="chat-input">
			  
			  <input type="text" id="user-input" autocomplete="off" className="user-input" value={this.state.input}
			  onChange={ this.handleChange } placeholder="Talk to the bot."/>
			  <img id = "userinput_img" src = {sendIcon} style = {{width:22}} onClick={this.getRes} ></img>
		  </div>
		</div>
	  )
  }
  
}

export default App;