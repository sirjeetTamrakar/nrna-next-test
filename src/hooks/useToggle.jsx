import { useState, useCallback } from 'react';

// custom hooks that has toggle logic in it
const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  // memoized toggle function that changes state value to it's opposite
  const toggle = useCallback(() => setState((initial) => !initial), []);

  return [state, toggle];
};

export default useToggle;
