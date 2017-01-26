/**
 * Created by bogdanbegovic on 1/26/17.
 */

const componentHasAttribute = require('./src/componentHasAttribute');
const componentHasAttributeWithValue = require('./src/componentHasAttributeWithValue');
const getAllTwigs = require('./src/getAllTwigs');
const parentContainsChildComponent = require('./src/parentContainsChildComponent');
const usesComponent = require('./src/usesComponent');
const usesComponentMulti = require('./src/usesComponentMulti');

module.exports = {
    componentHasAttribute: componentHasAttribute,
    componentHasAttributeWithValue: componentHasAttributeWithValue,
    getAllTwigs: getAllTwigs,
    parentContainsChildComponent: parentContainsChildComponent,
    usesComponent: usesComponent,
    usesComponentMulti: usesComponentMulti
};