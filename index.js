#! usr/bin/node node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const basicEmoji = JSON.parse(fs.readFileSync('basic.json').toString());
const readImages = (imageType, character = fs.readdirSync(`./${imageType}`)) => {
    const owoJson = Object.assign({}, basicEmoji);
    character.forEach((name) => {
        owoJson['原神-' + name] = { type: 'image', container: [] };
        fs.readdirSync(`./${imageType}/${name}`).forEach((image) => {
            if (image !== 'desktop.ini') {
                owoJson['原神-' + name].container.push({
                    icon: `<img style="width:8em" src="https://cdn.jsdelivr.net/npm/mihoyoemoji/${imageType}/${name}/${image}" alt="${name}-${image}">`,
                    text: `${name}-${image}`
                });
            }
        });
    });
    return owoJson;
};
console.log('Building owo.json...');
const pngEmoji = readImages('png');
const webpEmoji = readImages('webp');
const liteEmoji = readImages('webp', ['八重神子', '可莉', '安柏', '提纳里', '枫原万叶', '派蒙', '温迪', '行秋', '魈']);
fs.writeFileSync('owo.png.json', JSON.stringify(pngEmoji));
fs.writeFileSync('owo.webp.json', JSON.stringify(webpEmoji));
fs.writeFileSync('owo.lite.json', JSON.stringify(liteEmoji));
