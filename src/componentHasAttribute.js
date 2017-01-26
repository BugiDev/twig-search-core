/**
 * Created by bogdanbegovic on 12/20/16.
 */

const xml2js = require('xml2js');
const parser = new xml2js.Parser({preserveChildrenOrder: true, explicitArray: true});
const _ = require('lodash');

module.exports = function(data, componentName, attributeName) {

    let contains = {
        value: false,
        error: false
    };

    try {
        parser.parseString(data, function(err, parsedXML) {
            checkIfComponentHasAttribute(parsedXML, componentName, attributeName, contains);
        });
    } catch (e) {
        contains.error = true;
    }

    return contains;
};

function checkIfComponentHasAttribute(node, componentName, attributeName, contains) {
    if (_.isArray(node)) {
        node.forEach((subNode)=> {
            checkIfComponentHasAttribute(subNode, componentName, attributeName, contains);
        });
    } else {
        if (_.isObject(node)) {
            for (let x in node) {
                if (node.hasOwnProperty(x)) {
                    if (x === componentName) {

                        if (_.isArray(node[x])) {
                            node[x].forEach((subNode)=> {
                                if (_.isObject(subNode) && subNode.hasOwnProperty('$') && subNode['$'].hasOwnProperty(attributeName)) {
                                    contains.value = true;
                                } else {
                                    checkIfComponentHasAttribute(subNode, componentName, attributeName, contains);
                                }
                            });
                        } else {
                            if (_.isObject(node[x]) && node[x].hasOwnProperty('$') && node[x]['$'].hasOwnProperty(attributeName)) {
                                contains.value = true;
                            } else {
                                checkIfComponentHasAttribute(node[x], componentName, attributeName, contains);
                            }
                        }
                    } else {
                        checkIfComponentHasAttribute(node[x], componentName, attributeName, contains);
                    }
                }
            }
        }
    }
}
