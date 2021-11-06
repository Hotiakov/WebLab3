const fs = require("fs");

exports.idGenerator = () => '_' + Math.random().toString(36).substr(2, 9);

exports.findIdItem = (paintings, id) => {
    for(let i = 0; i < paintings.length; i++){
        if(paintings[i].id === id){
            return paintings[i];
        }
    }
    return {};
}

exports.findIdIndex = (paintings, id) => {
    for(let i = 0; i < paintings.length; i++){
        if(paintings[i].id === id)
            return i;
    }
    return -1;
};

exports.writeToFile = (file = './server/db.json', paintingJson) => {
    try{
        fs.writeFile(file, paintingJson, (err) => {
            if (err) throw err;
            console.log('База данных успешно обновлена');
        });
    } catch (err) {
        console.error(err);
    }
}

exports.sortAuction = (a, b) => {
    if(b.isInAuction)
        return 1;
    return -1;
}

exports.filterData = (filterType, data) => {
    let filteredData;
    switch (filterType){
        case "all":
            filteredData = [...data];
            break;
        case "availability":
            filteredData = data.filter(item => item.inLibrary.toLowerCase().trim() === "yes");
            break;
        case "expired":
            filteredData = data.filter(item => (
                item.inLibrary.toLowerCase().trim() === "no" &&
                item.returnDate && this.toDate(item.returnDate) < Date.now()
            ));
            break;
        case "returnDate":
            filteredData = data
                .filter(item => item.inLibrary.toLowerCase().trim() === "no")
                .sort(sortDate);
            break;
    }
    return filteredData;
}