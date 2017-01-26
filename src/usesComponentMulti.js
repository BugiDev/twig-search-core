/**
 * Created by bogdanbegovic on 12/20/16.
 */

const xml2js = require('xml2js');
const parser = new xml2js.Parser({preserveChildrenOrder: true, explicitArray: true, ignoreAttrs: true});
const _ = require('lodash');

module.exports = function(data, componentName) {

    let contains = {
        value: 0,
        error: false
    };

    try {
        parser.parseString(data, function(err, parsedXML) {
            checkIfComponentIsUsedMultipleTimes(parsedXML, componentName, contains);
        });
    } catch (e) {
        contains.error = e.message;
    }

    return contains;
};

function checkIfComponentIsUsedMultipleTimes(node, componentName, contains) {
    if (_.isArray(node)) {
        node.forEach((subNode)=> {
            checkIfComponentIsUsedMultipleTimes(subNode, componentName, contains);
        });
    } else {
        if (_.isObject(node)) {
            for (let x in node) {
                if (node.hasOwnProperty(x)) {
                    if (x === componentName) {
                        if (_.isArray(node[x])) {
                            contains.value += node[x].length
                        } else {
                            contains.value++;
                        }
                    } else {
                        checkIfComponentIsUsedMultipleTimes(node[x], componentName, contains);
                    }
                }
            }
        }
    }
}
