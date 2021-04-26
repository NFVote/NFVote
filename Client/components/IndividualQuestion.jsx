import { Component } from 'react';
import React, { useState } from 'react';


class IndividualQuestion extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hasVoted: false,
			upvotes: this.props.upvotes,
			downvotes: this.props.downvotes
		}
		this.upvoteFunc = this.upvoteFunc.bind(this)
		this.downvoteFunc = this.downvoteFunc.bind(this)
		this.sendVote = this.sendVote.bind(this)
	}

	upvoteFunc(){
		// fetch('/server/vote')
		// if (this.state.hasVoted = false){
			this.sendVote(1)//to yay column
			// this.setState({
			// 	hasVoted: true
			// })
	}
	
	downvoteFunc(){
		// fetch('/server/vote')   
			this.sendVote(0)//to nay column
			// if (this.state.hasVoted = false){
			// 	this.sendVote(1)//to yay column
			// 	this.setState({
			// 		hasVoted: true
			// 	})
			// }
	}

	async sendVote(vote){
		const body = {
			'vote': vote,
			'question': this.props.question,
			'ssid': this.props.ssid
		};
		// console.log(body)
		const sending = await fetch((`/server/voteChange`),{ method: 'POST', headers: { 'Content-Type': 'Application/JSON' }, body: JSON.stringify(body) });

		const votes = await fetch('/server/getQuestions', { method: 'GET' }).then(resp => resp.json()).then(data => {
			this.setState({
				upvotes: 
				downvotes: 
			})
		})
		return sending;
	}

	render(){
	//     const { questions } = this.props.question;
		console.log('rendering individual q', this.props)
		return(
			<div className = "qContainer">
				{/* Questions */}
					{this.props.question}
					

				{/* Votes */}
				<div className="votes-container">
					<div>
							{this.state.upvotes}
							<button className="voteBtn" onClick={this.upvoteFunc.bind(this)}>Upvote</button>
					</div>
					<div>
							{this.state.downvotes}
							<button className="voteBtn" onClick={this.downvoteFunc.bind(this)}>Downvote</button>
					</div>
				</div>

			</div>
		)

	}

}

export default IndividualQuestion;
