const fs = require('fs');
const path = require('path');
const process = require('process');
const matter = require('gray-matter');

const FILES = {};
const baseDir = path.join(process.cwd(), 'docs');

function scanDir(dir) {

    fs.readdirSync(dir).forEach(filename => {
        const filepath = path.resolve(dir, filename);
        if (!fs.statSync(filepath).isFile()) return;

        const fileInfo = path.parse(filename);
        const ext = fileInfo.ext;
        if (ext != '.md') return;

        const relativePath = filepath.substring(baseDir.length).replace(/\\/g, '/').replace(ext, '');

        const contents = fs.readFileSync(filepath, 'utf-8');
        const info = matter(contents);
        FILES[relativePath] = info.data;
    });
}

scanDir('docs')
scanDir('docs/releases')

fs.writeFileSync('docs/public/meta.js', 'let META_FILES = ' + JSON.stringify(FILES));