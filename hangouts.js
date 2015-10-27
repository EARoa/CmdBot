var phantom = require('phantom');

var page = require('webpage').create();
page.settings.javascriptEnabled = true;
page.settings.loadImages = true;
