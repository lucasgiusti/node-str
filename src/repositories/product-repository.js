'use strict'

const mongoose = require('mongoose');
const Item = mongoose.model('product');

exports.get = async() => {
    const res = await Item.find({active: true}, 'title price slug');
    return res;
};

exports.getBySlug = async(slug) => {
    const res = await Item.findOne({slug: slug, active: true}, 'title description price slug tags')
    return res;
};

exports.getById = async(id) => {
    const res = await Item.findById(id, 'title description price slug tags')
    return res;
};

exports.getByTag = async(tag) => {
    const res = await Item.find({ tags: tag,active: true}, 'title description price slug tags')
    return res;
};

exports.create = async(data) => {
    var item = new Item(data);
    await item.save();
};

exports.update = async(id, data) => {
    await Item
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
            }
        })
};

exports.delete = async(id) => {
    await Item.findByIdAndRemove(id)
;}