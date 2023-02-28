/* eslint-disable import/no-extraneous-dependencies */
import TagManager from 'react-gtm-module';

export const GTM_ID = 'GTM-MG3NDXJ';

export const initGTM = () => {
  TagManager.initialize({
    gtmId: GTM_ID,
  });
};
