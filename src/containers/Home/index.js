import React from 'react';
import { connect } from 'react-redux';

import {
  ADD_INGREDIENT
} from './constants';

class Home extends React.Component {
  selectIngredient = (key) => {
    this.props.onAddIngredient(key);
  }

  render() {
    return (
      <div className="cutting-board">
        <div className="cutting-board__ingredients">
          <div className="button-group button-group--column">
            {this.props.ingredients.map((ingredient, index) => (
              <button
                key={index}
                className="button button--default"
                onClick={() => this.selectIngredient(ingredient.key)}
              >
                {ingredient.name}
              </button>
            ))}
          </div>
        </div>
        <div className="cutting-board__main-area">

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { burger, ingredients } = state;
  return {
    ingredients,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (key) => dispatch({
      type: ADD_INGREDIENT,
      key,
    }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

