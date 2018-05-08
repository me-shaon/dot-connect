import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../img/logo.png';
import Menu from '../components/Menu';
import PublicGameList from '../components/PublicGameList';

class Home extends Component {
    render() {
        const { gameStatus, gameId, availableGames } = this.props;
        return (
            <div>
                <img src={logo} alt="DOT CONNECT" />
                <p className="subtitle has-text-grey">
                    Play your favorite childhood game online with friends
                </p>

                <Menu gameStatus={gameStatus} gameId={gameId} />
                <PublicGameList games={availableGames} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    gameStatus: state.gameStatus,
    gameId: state.gameId,
    availableGames: state.availableGames
});

export default connect(mapStateToProps)(Home);
