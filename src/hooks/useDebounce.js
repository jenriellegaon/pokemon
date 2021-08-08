import { useCallback, useState } from 'react'
import { debounce } from 'lodash'

const useDebounce = (value, wait) => {
  const [state, setState] = useState(value)

  const debounceValue = useCallback(
    debounce((debouncedValue) => {
      setState(debouncedValue)
    }, wait),
    [],
  )

  const setDebouncedState = (text) => {
    debounceValue(text)
  }

  return [state, setDebouncedState]
}

export default useDebounce
