import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { MiddleText } from './utilities';

class JoinForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false
		};

		const gameId = this.props.match.params.gameId;

		this.props.socket.emit('REQUEST_GAME_INFO', gameId);
		this.props.dispatch({
			type: 'UPDATE_STATE',
			data: {
				status: 'waiting_for_response',
				gameId: gameId
			}
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const form = e.target;

		const gameId = this.props.match.params.gameId;
		this.props.socket.emit('JOIN_GAME', gameId);
		const data = {
			gameId,
			players: {
				x: this.props.players.x,
				o: form.o.value.trim()
			},
			status: 'started'
		};

		this.props.socket.emit('SYNC', data);
		this.props.dispatch({
			type: 'CONNECTION_CHANGED',
			self: true,
			connected: true
		});
		this.props.dispatch({
			type: 'UPDATE_STATE',
			data
		});

		this.setState({
			redirect: true,
			gameId: gameId
		});
	}

	render() {
		if (this.state.redirect) {
			const path = `/game/${this.state.gameId}/play`;
			return <Redirect to={path} />;
		}

		const connecting = <MiddleText element="Connecting..." />;

		if (this.props.status === 'waiting_for_response' || !this.props.status) {
			return connecting;
		}

		const playerX = this.props.players.x;
		const playerO = this.props.players.o;

		return (
			<div>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="field">
						<label className="label"> Players </label>
						<div className="field has-addons has-addons-centered">
							<div className="control">
								<input
									className="input"
									type="text"
									name="o"
									required
									defaultValue={playerO}
								/>
								<p className="help">Change your name if you want</p>
							</div>
							<p className="control">
								<a className="button is-static">VS</a>
							</p>
							<p className="control">
								<input
									className="input"
									type="text"
									name="x"
									readOnly
									value={playerX}
								/>
							</p>
						</div>
					</div>
					<div className="field">
						<label className="label"> Size </label>
						<div className="field has-addons has-addons-centered">
							<p className="control">
								<input
									className="input"
									type="number"
									name="r"
									readOnly
									value={this.props.size.r}
								/>
							</p>
							<p className="control">
								<a className="button is-static">X</a>
							</p>
							<p className="control">
								<input
									className="input"
									type="number"
									name="c"
									readOnly
									value={this.props.size.c}
								/>
							</p>
						</div>
					</div>
					<button className="button is-primary" type="submit">
						Go
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	players: state.players,
	size: state.size,
	status: state.status
});

export default connect(mapStateToProps)(JoinForm);
