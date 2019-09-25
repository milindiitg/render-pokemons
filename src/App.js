import * as $ from 'jquery';
import loader from './loader.png';
import React, { Component } from 'react';
import Pokemons from './components/Pokemons';
import PokeNavigation from './components/PokeNavigation';

class App extends Component {
  constructor(props) {
    super(props);
    this.pokemonsLoaded = false;
    this.pokeConfig = this.props.pokeConfig;
    this.error = {results: [401]};
    this.pokeDisplayList = [];
    this.pokemonsList = [];
    this.loadCount = 0;
    this.state = { startIndex: -1 };
  }

  getPokemonApi = (param) => {
    let totalCount = this.pokeConfig.pokeCount;
    let pokeURL = this.pokeConfig.pokeUrl + param + '/';
    let self = this;
    $.getJSON(pokeURL, function(data){
        var pokeID = data.id;
        var pokeName = data.name;
        
        $.getJSON(pokeURL, function(data3){ // for retrieving front image
            self.loadCount++;
            var imageURI = data3.sprites.front_default;
            self.pokemonsList[param - 1] = {pokeID, pokeName, imageURI};
            
            if (self.loadCount == totalCount) {
              self.setLocalPokemonStorage();
              self.setState( {startIndex: 0});
            }
        });
    });
  }

  setLocalPokemonStorage = () => {
    localStorage.setItem('pokemonsList', JSON.stringify(this.pokemonsList));
    // console.log("Printing local storage");
    // console.log(localStorage.getItem('pokemonsList'));
  }

  getLocalPokemonStorage = () => {
    return JSON.parse(localStorage.getItem('pokemonsList'));
  }

  fetchPokemon(totalCount) {
    this.pokemonsList = this.getLocalPokemonStorage() || [];
    // console.log("pokeMONS list::")
    // console.log(this.pokemonsList);
    if (this.pokemonsList.length == this.pokeConfig.pokeCount) { // continue if list length changes..
      this.setState( {startIndex: 0});
      return;
    }
    this.pokemonsList = [];
    for (let index = 1; index <= totalCount; index++) {
      this.getPokemonApi(index);
    }
  }
  componentDidMount() {
    this.fetchPokemon(this.pokeConfig.pokeCount);      
  }

  componentWillUnmount() {
    console.log("Component unmounted");
  }

  handleDisplay = (direction) => {
    let startIndex;
    if (direction == 1) {
      startIndex = this.state.startIndex + 1;
      this.setState({startIndex});
    } else {
      startIndex = this.state.startIndex - 1;
      this.setState({startIndex});
    }
    
  }

  render() {
    if (!this.pokemonsList) return null;
    let startIndex = this.state.startIndex;
    let displayCount = (this.pokeConfig.pokeCount < this.pokeConfig.displayCount) ? 
            this.pokeConfig.pokeCount : this.pokeConfig.displayCount;
    let pokeDisplayList = this.pokemonsList.slice(startIndex, startIndex+displayCount);
    let loading = !(startIndex + 1);
    return (
      <div className="container">
        <h1>Pokemon rendering application</h1>
        <div className="pokemons">  
            {loading && <img src={loader}></img>}
            <Pokemons pokeDisplayList={pokeDisplayList} loading={loading}/>         
            <PokeNavigation handleDisplay={this.handleDisplay} startIndex = {this.state.startIndex}/>
        </div>
      </div>
    );
  }
};

export default App;

//  Unused code  //////////////////

function UNUSED_CODE(index) {
    fetch(this.pokeConfig.pokeUrl + '?limit=' + index);
   ///////////////////////////
     // fetch(this.pokeConfig.pokeUrl + index)
     // .then(res => res.json())
     // .catch(err => self.error)
     // .then(data => {
     //   self.pokemonsList = data.results;
     //   console.log(self.pokemonsList);
     //   this.setState({ pokemonsList: data.results, startIndex: 0 });
     // })
     // .catch(this.setState({ pokemonsList: null, startIndex: -1 }));
}

