require('../../scripts/load-cloudflare-local-env');

module.exports = {
  siteURL: process.env.URL || 'http://localhost:8080',
  siteName: 'Yuri Vyatkin | Personal Website',
  siteDescription: 'Technical blog with digressions to fine arts',
  siteImage: '/assets/images/site/default.png',
  lang: 'en',
  locale: 'en_us',
  authorName: 'Yuri Vyatkin',
  authorURL: 'yuri-vyatkin',
  authorEmail: 'yuri.vyatkin@gmail.com',
  twitterSite: '@niktayv',
  twitterCreator: '@niktayv',
  address: {
    street: '17 Farnham Street',
    city: 'Oamaru',
    state: '',
    zip: '',
    postalCode: '9400',
    phoneDisplay: '+64 (22) 090-4544',
    phoneCall: '+64220904544',
    email: 'yuri.vyatkin@gmail.com',
  },
};
