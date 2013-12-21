/**
 * This file should be loaded before all other files to ensure various global
 * and global-like operations have been completed.
 */

'use strict';

<% if (includeBootstrap || includeBackone) { %>
var $ = require('jquery');
<% }

if (includeBackbone) { %>
var Backbone = require('backbone');

// Tell Backbone where to find jQuery.
Backbone.$ = $;
<% }

if (includeBootstrap) { %>
// Include Bootstrap
require('../../../bower_components/bootstrap/js/transition.js');
require('../../../bower_components/bootstrap/js/alert.js');
require('../../../bower_components/bootstrap/js/button.js');
require('../../../bower_components/bootstrap/js/carousel.js');
require('../../../bower_components/bootstrap/js/collapse.js');
require('../../../bower_components/bootstrap/js/dropdown.js');
require('../../../bower_components/bootstrap/js/modal.js');
require('../../../bower_components/bootstrap/js/tooltip.js');
require('../../../bower_components/bootstrap/js/popover.js');
require('../../../bower_components/bootstrap/js/scrollspy.js');
require('../../../bower_components/bootstrap/js/tab.js');
require('../../../bower_components/bootstrap/js/affix.js');
<% } %>
