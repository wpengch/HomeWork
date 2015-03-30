/**
 * 创建人：pengchao
 * 创建时间：2015-3-26-0026
 * 工厂名字：Theme
 * 作用：主题定义
 */
(function () {
    'use strict';

    angular.module('home').constant('Theme', {
      palettes:{
        white:{
          '50': '22fe22',
          '100': '36fe55',
          '200': '52fd14',
          '300': '65fd45',
          '400': '62ff15',
          '500': 'ffffff',
          '600': 'abfda1',
          '700': 'acfed5',
          '800': 'cdffe5',
          '900': 'cefed8',
          'A100': 'adfde5',
          'A200': 'cffca8',
          'A400': 'caff85',
          'A700': 'acffef'
        },
        altgreen:{
          '50': '#e0f2f1',
          '100': '#b2dfdb',
          '200': '#80cbc4',
          '300': '#4db6ac',
          '400': '#26a69a',
          '500': '#30b77a',
          '600': '#00897b',
          '700': '#00796b',
          '800': '#00695c',
          '900': '#004d40',
          'A100': '#a7ffeb',
          'A200': '#64ffda',
          'A400': '#1de9b6',
          'A700': '#00bfa5',
          'contrastDefaultColor': 'dark',
          'contrastLightColors': '500 600 700 800 900',
          'contrastStrongLightColors': '500 600 700'
        },
        gray: {
          '0': '#ffffff',
          '50': '#fafafa',
          '100': '#f5f5f5',
          '200': '#9e9e9e',
          '300': '#e0e0e0',
          '400': '#bdbdbd',
          '500': '#eeeeee',
          '600': '#757575',
          '700': '#616161',
          '800': '#424242',
          '900': '#212121',
          '1000': '#000000',
          'A100': '#ffffff',
          'A200': '#eeeeee',
          'A400': '#bdbdbd',
          'A700': '#616161',
          'contrastDefaultColor': 'dark',
          'contrastLightColors': '600 700 800 900'
        }
      },
      themes:[
        {name:'altTheme',primaryPalette:'white'},
        {name:'default',primaryPalette:'altgreen'},
        {name:'userTheme',primaryPalette:'gray'}
      ]
    });
})();
