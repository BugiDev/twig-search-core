/**
 * Created by bogdanbegovic on 12/20/16.
 */

const fs = require('fs');
const path = require('path');

module.exports = function(basePath) {
    let allFilenames = [];
    findFiles(basePath, '.twig', allFilenames);
    return allFilenames;
};

function findFiles(startPath, filter, allFilenames) {
    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    let files = fs.readdirSync(startPath);
    files.forEach((file) => {
        let filename = path.join(startPath, file);
        let stat = fs.lstatSync(filename);

        if (stat.isDirectory()) {
            findFiles(filename, filter, allFilenames);
        }
        else {
            if (filename.indexOf(filter) >= 0) {
                allFilenames.push(filename);
            }
        }
    });
}