import { Component } from 'react';
import React, { useState } from 'react';


class IndividualQuestion extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hasVoted: false
		}
		this.upvoteFunc = this.upvoteFunc.bind(this)
		this.downvoteFunc = this.downvoteFunc.bind(this)
		this.sendVote = this.sendVote.bind(this)
	}

	upvoteFunc(){
		// fetch('/server/vote')
		if (this.state.hasVoted = false){
			this.sendVote(1)//to yay column
			this.setState({
				hasVoted: true
			})
		}
	}
	
	downvoteFunc(){
		// fetch('/server/vote')   
			this.sendVote(0)//to nay column
			if (this.state.hasVoted = false){
				this.sendVote(1)//to yay column
				this.setState({
					hasVoted: true
				})
			}
	}

	sendVote(vote){
		const body = {
			'vote': vote,
			'question': this.props.question
		};
		// console.log(body)
		fetch((`/server/voteChange`),{
			method: 'POST',
			headers: {
				'Content-Type': 'Application/JSON'
			},
			body: JSON.stringify(body)
		})
	}

	render(){
	//     const { questions } = this.props.question;
		console.log('rendering individual q', this.props)
		return(
			<div className = "qContainer">
					{this.props.question}

						<br/>

					<div>
							<button className="voteBtn" onClick={this.upvoteFunc.bind(this)}>Upvote</button>
					</div>
					<div>
							<button className="voteBtn" onClick={this.downvoteFunc.bind(this)}>Downvote</button>
					</div>
							<br/>
			</div>
		)

	}

}

export default IndividualQuestion;
