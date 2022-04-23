import { mount, ReactWrapper } from 'enzyme';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import GlobalContexts from './../../../context/globalContexts';
import Nav from './Nav';
import { findByTestAttr } from './../../../utilities/tests/testsUtilityFunctions';

const setup = () => {
  const history = createMemoryHistory();
  return mount(
    <Router location={history.location} navigator={history}>
      <GlobalContexts>
        <Nav />
      </GlobalContexts>
    </Router>
  );
};

describe('<App />', () => {
  describe('<Nav />', () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = setup();
      const showMobileNavIcon = findByTestAttr(wrapper, 'show-mobile-nav-icon').first();
      showMobileNavIcon.simulate('click');
    });

    afterEach(() => {
      wrapper.unmount();
    });
    it('shows mobile nav and backdrop on clicking show mobile nav icon', () => {
      const mobileNav = findByTestAttr(wrapper, 'mobile-nav');
      const backdrop = findByTestAttr(wrapper, 'backdrop');
      expect(backdrop.hasClass('shown')).toBeTruthy();
      expect(mobileNav.hasClass('shown')).toBeTruthy();
    });

    it('hides mobile nav and backdrop after clicking backdrop', () => {
      let backdrop = findByTestAttr(wrapper, 'backdrop');
      backdrop.simulate('click');
      const mobileNav = findByTestAttr(wrapper, 'mobile-nav');
      backdrop = findByTestAttr(wrapper, 'backdrop');
      expect(mobileNav.hasClass('shown')).toBeFalsy();
      expect(backdrop.hasClass('shown')).toBeFalsy();
    });
  });
});
