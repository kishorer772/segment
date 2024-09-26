import { useReducer } from 'react';

export const useSegment = () => {
  const initialState = {
    schema_length: 0,
    segment_name: '',
    schema: [],
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        break;
      case 'REMOVE':
        break;
      default:
        break;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};
