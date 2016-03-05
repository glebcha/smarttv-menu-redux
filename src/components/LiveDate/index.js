import React, { Component, PropTypes } from 'react'
import { formatDate } from '../../utils/helpers'

export default class LiveDate extends Component {

    constructor(props) {
        super(props);
        this.state = { date: formatDate(props.lang) }
    }

    setTime() {
        const lang = this.props.lang
        this.state = { date: formatDate(lang) }
    }

    componentDidMount() {
        const lang = this.props.lang
        // Update time every hour
        this.interval = setInterval( () => this.setTime(lang), 60*60*1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <span className={ this.props.className }>{ this.state.date }</span>
        )
    }
}
