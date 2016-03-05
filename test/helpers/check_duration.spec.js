import { expect, function } from 'chai'
import { checkDuration } from '../../src/utils/helpers'

describe('Check Duration helper', () => {

  it('Should return string', () => {
    const currentDate = Date()
    const checkedDuration = checkDuration(currentDate, '6000000')

    expect(checkedDuration).to.be.a('string')
  })

  it('Should return empty string if no arguments', () => {
    const currentDate = Date()
    const checkedDuration = checkDuration()

    expect(checkedDuration).to.eql('')
  })

})
