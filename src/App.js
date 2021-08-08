
//* External imports
import React, { useContext, useEffect } from 'react';
import { isEmpty } from 'lodash';

//* Local imports
import { GlobalContext } from 'store/provider'
import { useMount } from 'hooks'

//* Actions
import {
  getPokemon,
  getPokemons,
} from 'store/actions'

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

  useMount(() => {
    const queryParams = {
      offset: `offset=${0}`,
      limit: `limit=${3}`,
    };

    getPokemons(queryParams)(dispatch)

    return () => {
      // Unmount
    }
  })

  // Check data updates
  useEffect(() => {
    if (isEmpty(pokemons)) return

    const { results } = pokemons

    results?.map((value) => {
      getPokemon(value?.name)(dispatch)
    })
  }, [pokemons, isFetchingPokemons])

  useEffect(() => {
    if (isEmpty(pokemon)) return
    console.log("Pokemon: ", pokemon)
  }, [pokemon, isFetchingPokemon])

  return (
    <div className="App" />
  );
}

export default App;
