import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import keydown from 'react-keydown'
import { selectCategory } from '../../actions/CategoryActions'
import { localizeCategory, getCategories } from '../../utils/helpers'
import CategoryItems from '../CategoryItems'
import './Channels.less'

/**
 * [mapStateToProps description]
 * @param  {Object} state  current app state
 * @return {Object}       object with selected state properties
 */
function mapStateToProps(state) {
    // Destructuring object to take only wanted properties
    const { categories, playlist } = state
    return { categories, playlist }
}

/**
 * ES7 decorators
 * https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841#.wajd4g1u4
 */
@connect(mapStateToProps)
@keydown( ['up', 'down', 'left', 'right'] )

export default class Channels extends Component {

    constructor(props) {
        super(props)
        this.selected = 0
    }

    /**
     * Check for property type and existance
     * @type {Object}
     */
    static propTypes = {
        playlist: PropTypes.object.isRequired,
        categories: PropTypes.object.isRequired
    };

    /**
     * [componentWillReceiveProps description]
     * Handle left and right keys to slide categories vertically
     */
    componentWillReceiveProps() {
        const { dispatch, playlist, keydown } = this.props
        const streams = playlist.items.streams
        const categories = streams ? getCategories(streams) : {}
        const categoriesList = Object.keys(categories)
        if(keydown.event && categoriesList.length > 1) {
            const upKey = keydown.event.which === 38
            const downKey = keydown.event.which === 40

            if(downKey && this.selected <= 1) {
                ++this.selected
                dispatch(selectCategory(categoriesList[this.selected], this.selected))
            }
            else if(upKey && this.selected > 0) {
                --this.selected
                dispatch(selectCategory(categoriesList[this.selected], this.selected))
            }

        }
    }

    render() {
        /**
         * ${ someProperty } in render is ES2015 template string
         * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/template_strings
         */

        const { playlist, keydown } = this.props
        const selected = this.props.categories ? this.props.categories.selected : ''
        const streams = playlist.items.streams
        const categories = streams ? getCategories(streams) : {}

        return (
            <div className='playlist'>
                {
                    Object.keys(categories).length
                    ?
                    Object.keys(categories).map( (categoryName, i) =>
                        <section
                            className={ `categories ${
                                categoryName
                            } ${
                                i === 0 && !selected ? 'selected' : ''
                            }${
                                selected === categoryName ? 'selected' : ''
                            }` }
                            key={ i }
                        >
                            <h3>{ localizeCategory(categoryName, 'ru') }</h3>
                            <CategoryItems
                                keydown={ keydown.event }
                                className={ `${
                                    i === 0 && !selected ? 'active' : ''
                                }${
                                    selected === categoryName ? 'active' : ''
                                }` }
                                streams={ categories[categoryName] } /
                            >
                        </section>
                    )
                    :
                    null
                }
            </div>
        )
    }
}
