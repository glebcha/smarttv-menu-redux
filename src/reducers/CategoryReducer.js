import { SELECT_CATEGORY } from '../utils/constants'

export function categories( state = {}, action) {
    switch (action.type) {
        case SELECT_CATEGORY:
            return {
                ...state,
                ...{selected: action.selected}
            }
        default:
            return state
    }
}
