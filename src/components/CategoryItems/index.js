import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { checkDuration, isRollingHeader } from '../../utils/helpers'
import './CategoryItems.less'

export default class CategoryItems extends Component {

    constructor(props) {
        super(props)
        this.left = 0
        this.selected = 1
    }

    static propTypes = {
        streams: PropTypes.array.isRequired
    };

    /**
     * [componentWillReceiveProps description]
     * Handle left and right keys to slide movies horizontally
     */
    componentWillReceiveProps() {
        const { className, keydown } = this.props

        if (className === 'active' && keydown) {
            const container = this.refs.cat
            const childs = container.childNodes
            const key = keydown.which
            const isLeft = key === 37
            const isRight = key === 39

            let moveRange = 0
            let maxMoveRange = 0
            let plannedPosition = 0

            if(childs.length > 1) {
                moveRange = childs[1].offsetWidth
                maxMoveRange = moveRange * (childs.length - 2)
            }

            if (isLeft && this.left > -maxMoveRange) {
                plannedPosition = this.left - moveRange
                this.left = plannedPosition
                this.selected = ++this.selected
                container.style.left = `${ plannedPosition }px`

                childs[this.selected - 1].classList.remove('active')
                childs[this.selected].classList.add('active')

            }
            else if (isRight && this.left < moveRange ) {
                plannedPosition = this.left + moveRange
                this.left = plannedPosition
                this.selected = --this.selected
                container.style.left = `${ plannedPosition }px`

                childs[this.selected + 1].classList.remove('active')
                childs[this.selected].classList.add('active')
            }

        }
    }

    render() {
        const { streams, className } = this.props

        return (
            <ul className={ `category ${ className }` } ref='cat'>
            {streams.map( (stream, i) =>
                <li className={ i === 1 ? 'active' : '' } key={ i }>
                    <div className='category_item'>
                    <div className='category_item__image'>
                        <img src={ stream.preview } />
                    </div>
                    <div className='category_item__info'>
                        <h4 className={ isRollingHeader(stream.title) }>
                            { stream.title }
                        </h4>
                        <div className='category_item__info__extra'>
                            <div className='col-4 notify'>
                                <span className={
                                    `reminder ${ stream.reminder ? 'active':'' }`
                                } />
                            </div>
                            <div
                                className='col-8 estimated'
                                dangerouslySetInnerHTML={
                                    {__html: checkDuration(
                                                stream.start,
                                                stream.duration,
                                                'ru'
                                            )
                                    }
                                }
                            />
                        </div>
                    </div>
                    </div>
                </li>
            )}
            </ul>
        )
    }
}
