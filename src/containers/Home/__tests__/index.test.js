import React from 'react';
import { shallow, render } from 'enzyme';
import { Home } from '../index';
import { defaultIngredients } from '../../../redux';
import { BURGER_STATUS } from '../constants';

describe('<Home />', () => {
  let component;
  beforeEach(() => {
    component = shallow(
        <Home
          ingredients={defaultIngredients}
          burger={{
            ingredients: [],
          }}
        />
      );
  });

  it('should render the list of ingredients.', () => {
    expect(component.find('button').length).toEqual(defaultIngredients.length);
    expect(component.find('button').first().text()).toEqual(defaultIngredients[0].name);
    expect(component.find('button').last().text()).toEqual(defaultIngredients[defaultIngredients.length - 1].name);
  });

  it('should render a default burger status', () => {
    expect(component.find('div.burger-status').text()).toEqual(BURGER_STATUS.DEFAULT);
  });

  it('should called onAddIngredient on ingredient button click', () => {
    const spyOnAddIngredient = jest.fn();
    component.setProps({
      onAddIngredient: spyOnAddIngredient,
    });
    component.find('button').first().simulate('click');
    expect(spyOnAddIngredient).toHaveBeenCalled();
  });

  it('should called onDeleteIngredient on ingredient button click', () => {
    const spyOnDeleteIngredient = jest.fn();
    component.setProps({
      onDeleteIngredient: spyOnDeleteIngredient,
      burger: {
        ingredients: [
          defaultIngredients[0]
        ],
      },
    });
    component.find('.burger__options__delete').simulate('click');
    expect(spyOnDeleteIngredient).toHaveBeenCalled();
  });

  it('burger status should be valid burger', () => {
    component.setProps({
      burger: {
        ingredients: [
          defaultIngredients[0],
          defaultIngredients[2],
          defaultIngredients[3],
          defaultIngredients[4],
          defaultIngredients[0],
        ],
      },
    });
    expect(component.find('div.burger-status.burger-status__valid').text()).toEqual(BURGER_STATUS.VALID);
  });

  it('burger status should be valid burger', () => {
    component.setProps({
      burger: {
        ingredients: [
          defaultIngredients[0],
          defaultIngredients[2],
          defaultIngredients[3],
          defaultIngredients[4],
          defaultIngredients[1],
        ],
      },
    });
    expect(component.find('div.burger-status.burger-status__error').text()).toEqual(BURGER_STATUS.INVALID);
  });

  it('should handle multiple changes of ingredients and still diplay the burger status correctly', () => {
    component.setProps({
      burger: {
        ingredients: [
          defaultIngredients[0],
          defaultIngredients[2],
          defaultIngredients[3],
          defaultIngredients[4],
          defaultIngredients[0],
        ],
      },
    });
    expect(component.find('div.burger-status.burger-status__valid').text()).toEqual(BURGER_STATUS.VALID);

    component.setProps({
      burger: {
        ingredients: [
          defaultIngredients[0],
          defaultIngredients[2],
          defaultIngredients[3],
          defaultIngredients[4],
          defaultIngredients[0],
          defaultIngredients[3],
          defaultIngredients[3],
        ],
      },
    });
    expect(component.find('div.burger-status.burger-status__error').text()).toEqual(BURGER_STATUS.INVALID);

    component.setProps({
      burger: {
        ingredients: [
          defaultIngredients[0],
          defaultIngredients[2],
          defaultIngredients[3],
          defaultIngredients[4],
          defaultIngredients[0],
          defaultIngredients[5],
          defaultIngredients[3],
          defaultIngredients[7],
          defaultIngredients[0],
        ],
      },
    });
    expect(component.find('div.burger-status.burger-status__valid').text()).toEqual(BURGER_STATUS.VALID);
  });


});
