import { expect } from 'chai'
import { playlist } from '../../src/reducers/PlaylistReducer'
import { RECEIVE_PLAYLIST, PLAYLIST_ERROR } from '../../src/utils/constants'

describe('PlaylistReducer', () => {

  it('Should receive empty playlist', () => {
    const initialState = {};
    const newState = playlist(initialState, {type: RECEIVE_PLAYLIST, items: []});

    expect(newState).to.eql({isFetching: false, error: null, items: []});
  })

  it('Should throw error', () => {
    const initialState = {};
    const newState = playlist(initialState, {
        type: PLAYLIST_ERROR,
        error: 'Error text'
    });

    expect(newState).to.eql({error: 'Error text'});
  })

})
