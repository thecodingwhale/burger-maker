import React from 'react';
import { connect } from 'react-redux';

import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  BURGER_STATUS,
} from './constants';

export class Home extends React.Component {
  deleteIngredient = (index) => {
    this.props.onDeleteIngredient(index);
  }

  selectIngredient = (ingredient) => {
    this.props.onAddIngredient(ingredient);
  }

  renderBurger() {
    if (this.props.burger.ingredients.length === 0) return null;
    return (
      <div className="burger">
        {this.props.burger.ingredients.slice(0).reverse().map((ingredient, index) => (
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
            <div className="burger__options">
              <div
                className="burger__options__delete"
                onClick={() => this.deleteIngredient(index)}
              >
                delete
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  renderBurgerStatus() {
    const { ingredients } = this.props.burger;
    if (ingredients.length < 5) {
      return (
        <div className="burger-status">
          {BURGER_STATUS.DEFAULT}
        </div>
      );
    }
    const isValidBurger = burgerValidator(ingredients);
    const setIsValidBurger = isValidBurger ? ' burger-status__valid' : ' burger-status__error';
    return (
      <div className={`burger-status${setIsValidBurger}`}>
        {isValidBurger ? BURGER_STATUS.VALID : BURGER_STATUS.INVALID}
      </div>
    )
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
          {this.renderBurgerStatus()}
        </div>
      </div>
    );
  }
}

const burgerValidator = (ingredients) => {
  const EXCLUDE_KEY = 1;
  const INGREDIENTS_DIVIDER = 4
  const isMinimumIngredients = ingredients.length > INGREDIENTS_DIVIDER;
  const isBunAlwaysFirstLast = isMinimumIngredients && (ingredients[0].key === EXCLUDE_KEY && ingredients[ingredients.length - 1].key === EXCLUDE_KEY);
  const isBunPartitioned = ingredients
    .filter((ingredient, index) => index % INGREDIENTS_DIVIDER === 0)
    .map(ingredient => ingredient.key)
    .every((value, i, array) => value === array[0]);
  const isNoBunInBetween = ingredients
    .filter((ingredient, index) => index % INGREDIENTS_DIVIDER !== 0)
    .map(ingredient => ingredient.key)
    .every((val, i, array) => array.indexOf(EXCLUDE_KEY) === -1);
  return isMinimumIngredients && isBunPartitioned && isBunAlwaysFirstLast && isNoBunInBetween;
};

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
    onDeleteIngredient: (index) => dispatch({
      type: DELETE_INGREDIENT,
      index
    }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

