import React from 'react';

export default class SearchFieldOptions extends React.Component {
    render() {
        const show = this.props.expandOptions;
        return (
            <ul className={show ? 'show': 'hide'}>
                <li>
                    <label htmlFor="searchLimit" >Search Limit: </label>
                    <input
                        onChange={this.props.handleOptionOnChange}
                        max="99"
                        min="3"
                        name="searchLimit"
                        type="number"
                        value={this.props.config.searchLimit}
                    />
                </li>
            </ul>
        );
    }
}