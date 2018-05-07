import update from 'immutability-helper';
import { reducer, initialState, defaultIngredients } from './redux';

import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
} from './containers/Home/constants';

describe('Reducers', () => {
  it('should return base initialized state', () => {
    const store = reducer(initialState, {});
    expect(store.ingredients.length).toEqual(initialState.ingredients.length);
    expect(store.burger.ingredients.length).toEqual(0);
  });

  it('should call ADD_INGREDIENT and add a state', () => {
    const store = reducer(initialState, {
      type: ADD_INGREDIENT,
      ingredient: defaultIngredients[1]
    });
    expect(store.burger.ingredients[0]).toEqual(defaultIngredients[1]);
    expect(store.burger.ingredients.length).toEqual(1);
  });

  it('should call DELETE_INGREDIENT and delete a state', () => {
    const newInitialState = update(initialState, {
      burger: {
        ingredients: {$push: [
          defaultIngredients[0],
          defaultIngredients[1],
          defaultIngredients[2],
        ]},
      }
    });
    const store = reducer(newInitialState, {
      type: DELETE_INGREDIENT,
      index: 1,
    });
    expect(store.burger.ingredients.length).toEqual(2);
  });
});
