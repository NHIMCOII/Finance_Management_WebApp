const mongoose = require('mongoose');

const Schema = mongoose.Schema

const categorySchema = new Schema({
    category:{
        type: String,
        required: true
    },
    parent:{
        type: Number,
        required: true
    }
})



module.exports = mongoose.model('Category',categorySchema);

// const getDb = require('../utils/database').getDb;
// const { ObjectId } = require('mongodb');


// module.exports = class Category {
//     constructor(category,parent){
//         this.category = category,
//         this.parent = parent
//     }
//     seeder() {
//         const db = getDb();
//         return db.collection('categories').insertMany([
//             {category: "Money Transfer", parent: 0},
//             {category: "Others", parent: 9},
//             {category: "Salary", parent: 0},
//             {category: "Bonus", parent: 0},
//             {category: "Investment Interest", parent: 0},
//             {category: "Gifts", parent: 0},       
//             {category: "Gas", parent: 1},
//             {category: "Auto Service", parent: 1},
//             {category: "Charity", parent: 2},
//             {category: "Childcare", parent: 3},
//             {category: "Education", parent: 4},
//             {category: "Clothing", parent: 5},
//             {category: "Groceries", parent: 5},
//             {category: "Household", parent: 5},
//             {category: "Entertainment", parent: 6},
//             {category: "Medical", parent: 7},
//             {category: "Health & Fitness", parent: 7},
//             {category: "Cable TV", parent: 8},
//             {category: "Electric", parent: 8},
//             {category: "Internet", parent: 8},
//             {category: "Telephone", parent: 8},
//             {category: "Water", parent: 8},
//         ])
//     }

//     static findParent(category) {
//         const db = getDb();
//         return db.collection('categories').findOne({category: category})
//         .then(category => {
//             return  category.parent
//         })
//         .catch(err => console.log(err))
//     }
// }