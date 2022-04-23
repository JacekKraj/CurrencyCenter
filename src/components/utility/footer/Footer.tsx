import React from 'react';
import { NavLink } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import { breakpoints } from '../../../utilities/breakpoints/breakpoints';
import classes from './footer.module.scss';
import FooterIcon from './footerIcon/FooterIcon';

const { mobileHorizontal, tabletHorizontal } = breakpoints;

const useStyles = makeStyles(() => ({
  icon: {
    color: '#edfced',
    width: 35,
    height: 35,
    transition: '0.2s',
    '&:hover': {
      color: '#fff',
      transform: 'scale(1.1)',
    },
    [mobileHorizontal]: {
      width: 40,
      height: 40,
    },
    [tabletHorizontal]: {
      width: 35,
      height: 35,
    },
  },
}));

const Footer: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={classes.footerWrapper}>
      <div className={classes.footer}>
        <p className={classes.texts}>
          &copy; CurrencyCenter
          <NavLink to='/' className={classes.footerLink}>
            Rules and Regulations
          </NavLink>
        </p>
        <div className={classes.icons}>
          <FooterIcon Icon={<FacebookIcon className={styles.icon} />} path='https://www.facebook.com' />
          <FooterIcon Icon={<TwitterIcon className={styles.icon} />} path='https://www.twitter.com' />
          <FooterIcon Icon={<LinkedInIcon className={styles.icon} />} path='https://www.linkedin.com' />
          <FooterIcon Icon={<YouTubeIcon className={styles.icon} />} path='https://www.youtube.com' />
        </div>
      </div>
    </div>
  );
};

export default Footer;
