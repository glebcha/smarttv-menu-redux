import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPlaylist } from '../../actions/PlaylistActions'
import LiveTime from '../../components/LiveTime'
import LiveDate from '../../components/LiveDate'
import Channels from '../../components/Channels'
import Loading from '../../components/Loading'
import './App.less'

function mapStateToProps(state) {
    const { playlist } = state
    const {
        isFetching,
        items: items
    } = playlist || {
        isFetching: true,
        items: []
    }

    return {
        playlist,
        isFetching
    }
}

@connect(mapStateToProps)

export default class App extends Component {

    static propTypes = {
        playlist: PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    componentWillMount() {
        const { dispatch } = this.props
        dispatch(fetchPlaylist())
    }

    render() {
        const { playlist, isFetching } = this.props

        return (
            <div className='wrapper'>

            <header>
                <div className='container'>
                    <div className='col-6'>
                        <h2>Категории</h2>
                    </div>
                    <div className='col-6 text-right'>
                        <LiveDate className='date' lang='ru' />
                        <LiveTime className='time' />
                    </div>
                </div>
            </header>

            {isFetching
                ?
                <div>
                {playlist.error
                    ?
                    <Loading error={JSON.stringify(playlist.error)} />
                    :
                    <Loading text={ 'Загрузка меню' } />
                }
                </div>
                :
                <div className='playlist-wrapper'>
                {playlist.error
                    ?
                    <Loading error={JSON.stringify(playlist.error)} />
                    :
                    <Channels />
                }
                </div>
            }

            <footer>
                <span className='set_notification'>
                    <i></i> - Установить напоминание
                </span>
            </footer>

            </div>
        )
    }
}
