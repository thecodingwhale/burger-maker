import update from 'immutability-helper';

import { ADD_INGREDIENT } from './containers/Home/constants';

const initialState = {
  burger: {
    ingredients: []
  },
  ingredients: [{
    key: 1,
    name: 'bun',
  }, {
    key: 2,
    name: 'tomato',
  }, {
    key: 3,
    name: 'salad',
  }, {
    key: 4,
    name: 'patty',
  }, {
    key: 5,
    name: 'bacon',
  }, {
    key: 6,
    name: 'mushrooms',
  }, {
    key: 7,
    name: 'cucumber',
  }, {
    key: 8,
    name: 'egg',
  }, {
    key: 9,
    name: 'onion',
  }, {
    key: 10,
    name: 'jalapeno',
  }],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return update(state, {
        burger: {
          ingredients: {$push: [action.key]},
        }
      });
    break;
    default:
      return state;
  }
}
