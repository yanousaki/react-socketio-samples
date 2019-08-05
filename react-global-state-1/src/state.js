import { createGlobalState } from 'react-hooks-global-state';

const { GlobalStateProvider, setGlobalState, useGlobalState } = createGlobalState({
  count: 0,
});

export const countUp = () => {
  setGlobalState('count', v => v + 1);
};

export const countDown = () => {
  setGlobalState('count', v => v - 1);
};

export { GlobalStateProvider, useGlobalState };