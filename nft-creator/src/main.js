const basePath = process.cwd();
const fs = require("fs");
const { startCreating, buildSetup } = require(`${basePath}/nft-creator/src/hashlip_main.js`);

const layersPath = `${basePath}/nft-creator/layers`;
const imagesPath = `${basePath}/nft-creator/images`;
const jsonsPath = `${basePath}/nft-creator/jsons`;

const start = () => {
    makeLayers();
    setImageSets(1);
    buildSetup();
    startCreating();
}

const makeLayers = () => {
    if (fs.existsSync(layersPath)) {
        fs.rmSync(layersPath, { recursive: true });
    }
    fs.mkdirSync(layersPath);
    fs.mkdirSync(`${layersPath}/main`);
    fs.mkdirSync(`${layersPath}/background`);
    fs.mkdirSync(`${layersPath}/acc`);
}

const setImageSets = (tokenId) => {
    const metaDataFile = fs.readFileSync(`${jsonsPath}/${tokenId}.json`);
    const metaData = JSON.parse(metaDataFile);
    metaData.attributes.forEach( attribute => {
        if(attribute.value != "null") fs.writeFileSync(`${layersPath}/${attribute.trait_type}/${attribute.value}.png`, fs.readFileSync(`${imagesPath}/${attribute.trait_type}/${attribute.value}.png`));
    });
}

module.exports = { start };