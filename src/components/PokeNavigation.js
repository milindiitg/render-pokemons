import React, { Component } from 'react';
import pokeConfig from '../config';

export default class PokeNavigation extends Component {
    constructor() {
        super();
    }

    handleDisplay = (direction) => () => {
        return this.props.handleDisplay(direction);
    }

    render() {
        let displayCount = (pokeConfig.pokeCount < pokeConfig.displayCount) ? 
            pokeConfig.pokeCount : pokeConfig.displayCount;
        const {startIndex} = this.props;
        let prevDisabled = (startIndex == 0);
        let nextDisabled = (startIndex + displayCount) == pokeConfig.pokeCount;
        let prevClass = prevDisabled ? pokeConfig.buttonDisabled : pokeConfig.prevEnabled;
        let nextClass = nextDisabled ? pokeConfig.buttonDisabled : pokeConfig.nextEnabled;
        return (
            <div className="navigate-pokemon">
                <button type="button" class={prevClass} 
                    onClick={this.handleDisplay(-1)} disabled={prevDisabled}>Previous</button>
                <button type="button" class={nextClass} 
                    onClick={this.handleDisplay(1)} disabled={nextDisabled}>Next</button>
            </div>
        )
    }
}