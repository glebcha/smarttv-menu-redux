import request from 'superagent-es6-promise'
import {
    REQUEST_PLAYLIST,
    RECEIVE_PLAYLIST, PLAYLIST_ERROR
} from '../utils/constants'

function invalidPlaylist(err) {
    return {
        type: PLAYLIST_ERROR,
        error: err
    }
}

function requestPlaylist() {
    return {
        type: REQUEST_PLAYLIST
    }
}

function receivePlaylist(items) {
    return {
        type: RECEIVE_PLAYLIST,
        items: items
    }
}

export function fetchPlaylist() {
    return dispatch => {
        dispatch(requestPlaylist())
        request
        .get(`ajax/mock.json`)
        .then(res => dispatch(receivePlaylist(JSON.parse(res.text))))
        .catch(err => dispatch(invalidPlaylist(
            err.body ? err.body.detail : err.message
        )))
    }
}
