const router = require('express').Router();
const participants = require("../participants");
const path = require("path");
const jsonParser = require('express').json();
const {findIdIndex, findIdItem, writeToFile, idGenerator} = require("./secondaryFunction");

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'participants.html'));
});

router.get('/actual', (req, res) => {
    res.json(participants);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const item = findIdItem(participants, id);
    res.json(item);
});

router.post('/', (req, res) => {
    const participant = {...req.body, id: idGenerator()};
    participants.push(participant);
    writeToFile('./server/participants.json', JSON.stringify(participants));
    res.json(participants);
});

router.put('/', (req, res) => {
    const item = req.body;
    const index = findIdIndex(participants, item.id);
    if(index !== -1){
        participants[index] = item;
        writeToFile('./server/participants.json', JSON.stringify(participants));
    } else {
        console.warn("Картины с таким индексом не существует");
    }
    res.json(participants);
});

router.delete('/', (req, res)=>{
    const id = req.body;
    const index = findIdIndex(participants, id.id);
    if(index !== -1){
        participants.splice(index, 1);
        writeToFile('./server/participants.json', JSON.stringify(participants));
    } else {
        console.warn("Картины с таким индексом не существует");
    }
    res.json(participants);
});

module.exports = router;