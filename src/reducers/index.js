import { combineReducers } from 'redux'
import { playlist } from './PlaylistReducer'
import { categories } from './CategoryReducer'

const rootReducer = combineReducers({ playlist, categories })

export default rootReducer
