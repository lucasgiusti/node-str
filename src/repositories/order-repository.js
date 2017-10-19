'use strict'

const mongoose = require('mongoose');
const Item = mongoose.model('order');

exports.get = async() => {
    var res = await Item.find({}, 'number status customer items')
        .populate('customer', 'name')
        .populate('items.product', 'title');
    return res;
}

exports.create = async(data) => {
    var item = new Item(data);
    await item.save();
};