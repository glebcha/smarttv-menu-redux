import React, { Component, PropTypes } from 'react'
import './Loading.less'

export default class Loading extends Component {

    static propTypes = {
        text: PropTypes.string,
        error: PropTypes.string
    };

    render() {
        const { text, error } = this.props
        return (
            <div className="loading_state">
                <span className="loading_state_info">
                    {
                        error
                        ?
                        `Ошибка: ${ error }`
                        :
                        `${ text }`
                    }
                </span>
            </div>
        )
    }
}
