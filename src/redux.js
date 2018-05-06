import update from 'immutability-helper';

import {
  ADD_INGREDIENT,
} from './containers/Home/constants';

const initialState = {
  burger: {
    ingredients: []
  },
  ingredients: [{
    key: 1,
    name: 'bun',
    color: '#eac842',
  }, {
    key: 2,
    name: 'tomato',
    color: '#c10000',
  }, {
    key: 3,
    name: 'salad',
    color: '#98f14a',
  }, {
    key: 4,
    name: 'patty',
    color: '#943923',
  }, {
    key: 5,
    name: 'bacon',
    color: '#ff7e7e',
  }, {
    key: 6,
    name: 'mushrooms',
    color: '#ffe8a5',
  }, {
    key: 7,
    name: 'cucumber',
    color: '#19ad00',
  }, {
    key: 8,
    name: 'egg',
    color: '#fcff90',
  }, {
    key: 9,
    name: 'onion',
    color: '#f986ea',
  }, {
    key: 10,
    name: 'jalapeno',
    color: '#175200',
  }],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return update(state, {
        burger: {
          ingredients: {$push: [action.ingredient]},
        }
      });
    break;
    default:
      return state;
  }
}
