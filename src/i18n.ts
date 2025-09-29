import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => {
  // This can be set up to load translations from a CMS, database, etc.
 
  return {
    messages: (await import(`../locales/${locale}.json`)).default
  };
});