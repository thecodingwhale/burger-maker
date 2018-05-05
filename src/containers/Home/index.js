import React from 'react';
import { connect } from 'react-redux';

import {
  ADD_INGREDIENT
} from './constants';

class Home extends React.Component {
  selectIngredient = (ingredient) => {
    this.props.onAddIngredient(ingredient);
  }

  renderBurger() {
    if (this.props.burger.ingredients.length === 0) return null;
    return (
      <div className="burger">
        {this.props.burger.ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="burger__ingredient"
            style={{
              backgroundColor: `${ingredient.color}`,
            }}
          >
            <div className="burger__name">
              {ingredient.name}
            </div>
          </div>
        ))}
      </div>
    );
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
                onClick={() => this.selectIngredient(ingredient)}
              >
                {ingredient.name}
              </button>
            ))}
          </div>
        </div>
        <div className="cutting-board__main-area">
          {this.renderBurger()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { burger, ingredients } = state;
  return {
    ingredients,
    burger,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingredient) => dispatch({
      type: ADD_INGREDIENT,
      ingredient,
    }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

