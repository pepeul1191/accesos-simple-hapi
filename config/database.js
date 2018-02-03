var EJDB = require('ejdb');
var jb = EJDB.open('db/accesos', EJDB.DEFAULT_OPEN_MODE);

exports.conn = jb;