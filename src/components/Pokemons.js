import React, { Component } from 'react';
import pokeConfig from '../config';
import '../App.css';

export default class Pokemons extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { pokeDisplayList } = this.props;
        const pokemons = pokeDisplayList.map((pokemon) =>
        pokemon == 401 ? "Some error in pokemon API" : 
        <li key={pokemon.pokeID}>
          {pokemon.pokeID}
          <br/>
          Hi, species:: {pokemon.pokeName}
          <br/>
          <img src={pokemon.imageURI}></img>
        </li>
        );
        let displayCount = (pokeConfig.pokeCount < pokeConfig.displayCount) ? 
            pokeConfig.pokeCount : pokeConfig.displayCount;
        return (
            <div className="pokemon-info">
                {pokeDisplayList.length < displayCount && !this.props.loading
                    ? "Pokemons do not exist or some retrieval error" :
                    <div>
                        <h4>You have {pokeConfig.pokeCount} pokemons in the battlefield. </h4>
                        <h5>Displaying {displayCount} pokemons at a time:: </h5>
                        <div class="pokemons-area">
                            {pokemons}
                        </div>
                    </div>
                }
            </div>
        )
    }
}