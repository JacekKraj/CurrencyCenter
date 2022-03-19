import { mount, ReactWrapper } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { findByTestAttr } from './utilities/tests/testsUtilityFunctions';

const setup = () => {
  return mount(
    <BrowserRouter>
      <App />
    </BrowserRouter>
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
