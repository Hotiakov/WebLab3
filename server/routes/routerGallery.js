const router = require('express').Router();
const paintings = require("../db");
const path = require("path");
const jsonParser = require('express').json();
const {findIdIndex, writeToFile, sortAuction} = require("./secondaryFunction");
let actualPaintings = paintings.sort(sortAuction);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'gallery.html'));
});

router.get('/actual', (req, res) => {
    res.json(actualPaintings);
});

router.post('/', (req, res) => {
    const painting = {...req.body, id: req.query.value};
    paintings.push(painting);
    actualPaintings = paintings.sort(sortAuction);
    writeToFile('./server/db.json', JSON.stringify(paintings));
    res.json({done: "ok"});
});

router.put('/', (req, res) => {
    const painting = JSON.parse(req.query.value);
    const index = findIdIndex(paintings, painting.id);
    if(index !== -1){
        paintings[index] = painting;
        const paintingJson = JSON.stringify(paintings);
        actualPaintings = paintings.sort(sortAuction);
        writeToFile('./server/db.json', paintingJson);
    } else {
        console.warn("Картины с таким индексом не существует");
    }
    res.json({done: "ok"});
});

router.delete('/', (req, res)=>{
    const id = req.query.value;
    const index = findIdIndex(paintings, id);
    if(index !== -1){
        paintings.splice(index, 1);
        writeToFile('./server/db.json', JSON.stringify(paintings));
    } else {
        console.warn("Картины с таким индексом не существует");
    }
    res.json(actualPaintings);
});

module.exports = router;