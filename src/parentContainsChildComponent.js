/**
 * Created by bogdanbegovic on 12/20/16.
 */

/**
 * Created by bogdanbegovic on 12/20/16.
 */

const xml2js = require('xml2js');
const parser = new xml2js.Parser({preserveChildrenOrder: true, explicitArray: true, ignoreAttrs: true});
const _ = require('lodash');

module.exports = function(data, parentName, childName) {

    let contains = {
        value: false,
        error: false
    };

    try {
        parser.parseString(data, function(err, parsedXML) {
            checkIfParentComponentContainsChildComponent(parsedXML, parentName, childName, contains);
        });
    } catch (e) {
        contains.error = true;
    }

    return contains;
};

function checkIfParentComponentContainsChildComponent(node, parentName, childName, contains) {
    if (_.isArray(node)) {
        node.forEach((subNode)=> {
            checkIfParentComponentContainsChildComponent(subNode, parentName, childName, contains);
        });
    } else {
        if (_.isObject(node)) {
            for (let x in node) {
                if (node.hasOwnProperty(x)) {
                    if (x === parentName) {
                        if (_.isArray(node[x])) {
                            node[x].forEach((subNode)=> {
                                if (_.isObject(subNode)) {
                                    if (subNode.hasOwnProperty(childName)) {
                                        contains.value = true;
                                    }
                                }
                            });
                        } else {
                            if (_.isObject(node[x])) {
                                if (node[x].hasOwnProperty(childName)) {
                                    contains.value = true;
                                }
                            }
                        }
                    } else {
                        checkIfParentComponentContainsChildComponent(node[x], parentName, childName, contains);
                    }
                }
            }
        }
    }
}
