/**
 * Created by bogdanbegovic on 12/20/16.
 */

const xml2js = require('xml2js');
const parser = new xml2js.Parser({preserveChildrenOrder: true, explicitArray: true});
const _ = require('lodash');

module.exports = function(data, componentName, attributeName, attributeValue) {

    let contains = {
        value: false,
        error: false
    };

    try {
        parser.parseString(data, function(err, parsedXML) {
            checkIfComponentHasAttributeWithValue(parsedXML, componentName, attributeName, attributeValue, contains);
        });
    } catch (e) {
        contains.error = true;
    }

    return contains;
};

function checkIfComponentHasAttributeWithValue(node, componentName, attributeName, attributeValue, contains) {
    if (_.isArray(node)) {
        node.forEach((subNode)=> {
            checkIfComponentHasAttributeWithValue(subNode, componentName, attributeName, attributeValue, contains);
        });
    } else {
        if (_.isObject(node)) {
            for (let x in node) {
                if (node.hasOwnProperty(x)) {
                    if (x === componentName) {

                        if (_.isArray(node[x])) {
                            node[x].forEach((subNode)=> {
                                if (_.isObject(subNode) && subNode.hasOwnProperty('$') && subNode['$'].hasOwnProperty(attributeName) && subNode['$'][attributeName] === attributeValue) {
                                    contains.value = true;
                                } else {
                                    checkIfComponentHasAttributeWithValue(subNode, componentName, attributeName, attributeValue, contains);
                                }
                            });
                        } else {
                            if (_.isObject(node[x]) && node[x].hasOwnProperty('$') && node[x]['$'].hasOwnProperty(attributeName) && node[x]['$'][attributeName] === attributeValue) {
                                contains.value = true;
                            } else {
                                checkIfComponentHasAttributeWithValue(node[x], componentName, attributeName, attributeValue, contains);
                            }
                        }
                    } else {
                        checkIfComponentHasAttributeWithValue(node[x], componentName, attributeName, attributeValue, contains);
                    }
                }
            }
        }
    }
}
