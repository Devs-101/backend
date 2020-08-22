const Attendees = require('./attendees.mocks');

const db = {
    Attendees
}

async function getAll(table, filter={}) {
    let data = db[table];
    let { order, limit, page, all } = filter;
    delete filter.order;
    delete filter.limit;
    delete filter.page;
    delete filter.all;
    if ( Object.keys(filter).length ) {
        Object.entries(filter).forEach(([key, value]) =>{
            if(value){
                data = data.filter(item => item[key] == value);
            }
        })
    }
    if( order ) {
        data = order === 'asc' ? data.sort() : data.reverse();
    }
    if( limit && !all ) {
        let init = limit * --page;
        limit = init ? Number(init) + Number(limit) : limit;
        data = data.length >= Number(limit) ? data.slice(init, limit) : data;
    }
    return data;
}
async function getOne(table, filter={}) {
    const row = await getAll(table,filter);
    return row[0];
}
async function getById(table, id) {
    const row = await getAll(table);
    return row.filter(item => item.id == id)[0];
}

async function create(table, data) {
    table =  table == 'authentication' ? 'users' : table;
    if(table == 'details'){
        data = await getAll(table, data);
    } else {
        db[table].push(data);
        data = await getById(table, data.id);
    }
    return data;
}

async function update(table, data, Id) {
    const { id } = await getById(table, Id);
    return id ? [1] : [0];
}
async function upsert(table, data, Id) {
    const { id } = await getById(table, Id);
    return id ? [1] : [0];
}

async function remove(table, Id) {
    const { id } = await getById(table, Id);
    return { id };
}

async function deleted(table, data) {
    const deletedData = await getAll(table, data);
    return deletedData;
}
module.exports={
    getAll,
    getById,
    getOne,
    create,
    update,
    upsert,
    remove,
    deleted
}