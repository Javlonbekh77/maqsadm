import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';
 
export const locales = ['en', 'uz'] as const;
 
// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  '/': '/',
  '/dashboard': '/dashboard',
  '/groups': '/groups',
  '/leaderboard': '/leaderboard',
  
  // If locales use different paths, you can
  // specify each external path per locale.
  '/profile/[id]': {
    en: '/profile/[id]',
    uz: '/profil/[id]'
  },
  '/groups/[id]': '/groups/[id]',
};
 
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createLocalizedPathnamesNavigation({locales, pathnames});