/**
 * Created by bogdanbegovic on 12/20/16.
 */

const xml2js = require('xml2js');
const parser = new xml2js.Parser({preserveChildrenOrder: true, explicitArray: true, ignoreAttrs: true});
const _ = require('lodash');

module.exports = function(data, componentName) {

    let contains = {
        value: false,
        error: false
    };

    try {
        parser.parseString(data, function(err, parsedXML) {
            checkIfComponentIsUsed(parsedXML, componentName, contains);
        });
    } catch (e) {
        contains.error = e.message;
    }

    return contains;
};

function checkIfComponentIsUsed(node, componentName, contains) {
    if (_.isArray(node)) {
        node.forEach((subNode)=> {
            checkIfComponentIsUsed(subNode, componentName, contains);
        });
    } else {
        if (_.isObject(node)) {
            for (let x in node) {
                if (node.hasOwnProperty(x)) {
                    if (x === componentName) {
                        contains.value = true;
                    } else {
                        checkIfComponentIsUsed(node[x], componentName, contains);
                    }
                }
            }
        }
    }
}
