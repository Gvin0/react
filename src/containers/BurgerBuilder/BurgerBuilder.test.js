import { BurgerBuilder } from './BurgerBuilder';
import React from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//shallow AR aketebs deep renders

configure({adapter: new Adapter()});

describe('<BurderBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />)
    });
    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

  
});