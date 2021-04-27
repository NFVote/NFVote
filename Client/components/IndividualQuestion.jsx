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
		this.refresh = this.refresh.bind(this)
	}

	upvoteFunc(){
		// fetch('/server/vote')
		// if (this.state.hasVoted = false){
			this.sendVote(1)//to yay column
			// this.setState({
			// 	hasVoted: true
			// })
			// this.refresh();
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
			// this.refresh();
	}

	async sendVote(vote){
		const body = {
			'vote': vote,
			'question': this.props.question,
			'ssid': this.props.ssid
		};
		// console.log('sendVote function: ' + body)
		const sending = await fetch((`/server/voteChange`),{ method: 'POST', headers: { 'Content-Type': 'Application/JSON' }, body: JSON.stringify(body) });
		return sending;
	}


	async refresh() {
		const newUpvote = [];
		const newDownvote = [];
		const body = {
			'question': this.props.question,
			'ssid': this.props.ssid
		};
		await fetch('/server/getOneQuestion', { method: 'POST', headers: { 'Content-Type': 'Application/JSON' }, body: JSON.stringify(body) })
		.then(resp => resp.json()).then(data => {

			console.log('data from update vote fetch req', data)
			this.setState({
				upvotes: data.votefor,
				downvotes: data.voteagainst
			})
		})

	}



	render(){
	//     const { questions } = this.props.question;
		// console.log('rendering individual q', this.props)
		// const { upvotes } = this.state;
		// const { downvotes } = this.state;
		return (
      <div className="qContainer">
        {/* Questions */}

        {/* Votes */}
        <div className="votes-container">
		<div>
        <div className="questionBeingAsked">{this.props.question.trim()}</div>
            <div className="questionAndVote">
				<div className="Upvote">
					<p className="upVoteCount">{this.state.upvotes}</p>
					<button
						className="voteBtn"
						onClick={() => {
						this.upvoteFunc();
						this.refresh();
						}}
					>Upvote</button>
				</div>
				<div className="Downvote">
					<p className="downVoteCount">{this.state.downvotes}</p>
					<button
					className="voteBtn"
					onClick={() => {
						this.downvoteFunc();
						this.refresh();
					}}>Downvote</button>
				</div>
            </div>
          </div>
        </div>
      </div>
    );

	}

}

export default IndividualQuestion;
