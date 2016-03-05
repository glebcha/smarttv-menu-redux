import React, { Component, PropTypes } from 'react'
import { formatTime } from '../../utils/helpers'

export default class LiveTime extends Component {

    constructor(props) {
        super(props);
        this.state = { time: formatTime() }
    }

    setTime() {
        this.setState({ time: formatTime() })
    }

    componentDidMount() {
        // Update time every 10 seconds
        this.interval = setInterval( () => this.setTime(), 10*1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <span className={ this.props.className }>{ this.state.time }</span>
        )
    }
}
