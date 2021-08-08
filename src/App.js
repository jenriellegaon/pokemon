
//* External imports
import React, { useContext, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

//* Local imports
import { GlobalContext } from 'store/provider'
import { useMount, useDebounce } from 'hooks'
import { getRandomInt } from 'helpers/index'

//* Actions
import {
  getPokemon,
  getPokemons,
} from 'store/actions'

import Button from 'components/button';

//* Styles
import './app.scss'

function App() {
  const {
    dispatch,
    state,
  } = useContext(GlobalContext)

  const {
    pokemon,
    isFetchingPokemon,
    pokemons,
    isFetchingPokemons,
  } = state

  const [currentPage, setCurrentPage] = useState(1)
  const [searchPokemon, setSearchPokemon] = useState('')
  const [searchPokemonDebounced, setSearchPokemonDebounced] = useDebounce(searchPokemon, 1000)
  const [previousPokemon, setPreviousPokemon] = useState('')

  useMount(() => {
    const queryParams = {
      offset: `offset=${currentPage - 1}`,
      limit: `limit=${1}`,
    };
    getPokemons(queryParams)(dispatch) // Get all pokemon count
    getPokemon(currentPage)(dispatch)

    return () => {
      // Unmount
    }
  })

  const getPokemonById = (id) => {
    setCurrentPage(id)
    getPokemon(id)(dispatch)
  }

  //* DONE
  const onRandomizePokemon = () => {
    if (isEmpty(pokemons)) return
    const randomPokemonId = getRandomInt(1, pokemons?.count + 1)
    getPokemon(randomPokemonId)(dispatch)
    setCurrentPage(randomPokemonId)
  }

  const onChange = (event) => {
    const { value } = event.target
    setSearchPokemon(value)
    setSearchPokemonDebounced(value)
  }

  useEffect(() => {
    if (!isEmpty(searchPokemonDebounced)) {
      setPreviousPokemon(pokemon?.name)
      getPokemon(searchPokemonDebounced)(dispatch)
      setCurrentPage(pokemon?.id)
    } else {
      getPokemon(previousPokemon)(dispatch)
    }
  }, [searchPokemonDebounced])

  return (
    <div className="main-container">
      <div className="top-main-panel">
        <div className="left-panel">
          <input className="input-field" placeholder="Enter name or id..." onChange={(e) => onChange(e)} />
          <Button 
            text="Get random pokemon" 
            textColor="#000000" 
            icon="icon-random" 
            backgroundColor="#FFFFFF" 
            iconFillColor="#000000" 
            borderColor="#FFFFFF" 
            onClick={() => onRandomizePokemon()} 
          />
        </div>
        <div className="center-panel">
          <span className="title">Search a pokemon by name or by using its national pokedex number</span>
        </div>
        <div className="right-panel">
          <Button 
            icon="icon-back" 
            backgroundColor="#FFFFFF" 
            iconFillColor="#000000" 
            borderColor="#FFFFFF" 
            onClick={() => getPokemonById(currentPage - 1)} 
            disabled={currentPage === 1}
          />
          <Button 
            icon="icon-next" 
            backgroundColor="#FFFFFF" 
            iconFillColor="#000000" 
            borderColor="#FFFFFF" 
            onClick={() => getPokemonById(currentPage + 1)} 
            disabled={currentPage === pokemons?.count}
          />
        </div>
      </div>
      <div className="center-main-panel"> 
        {pokemon?.id}
      </div>
      <div className="bottom-main-panel">
        {pokemon?.name}
      </div>
    </div>
  );
}

export default App;
