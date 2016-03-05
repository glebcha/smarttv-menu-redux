import {
    API_ROOT, REQUEST_PLAYLIST,
    RECEIVE_PLAYLIST, PLAYLIST_ERROR
} from '../utils/constants'

export function playlist(
    state = {
        isFetching: false,
        error: null,
        items: []
    },
    action
) {
    switch (action.type) {
        case PLAYLIST_ERROR:
            return {...state, ...{error: action.error}}
        case REQUEST_PLAYLIST:
            return {...state, ...{isFetching: true, error: null}}
        case RECEIVE_PLAYLIST:
            return {
                ...state,
                ...{isFetching: false, error: null, items: action.items}
            }
        default:
            return state
    }
}
