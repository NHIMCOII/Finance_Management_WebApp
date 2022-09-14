const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: false
    },
    lastName:{
        type: String,
        required: false
    },
    gender:{
        type: Boolean,
        required: false
    },
    dob:{
        type: Date,
        required: false
    },
    phone:{
        type: String,
        required: false
    },
    job:{
        type: String,
        required: false
    },
    facebook:{
        type: String,
        required: false
    },
    linkedin:{
        type: String,
        required: false
    },
    address:{
        type: String,
        required: false
    },
    resetToken: String,
    resetTokenExpiration: Date,
    myWallets:{
        list: [
            {wallet_id: {type: Schema.Types.ObjectId, ref: 'Wallet',required: false},}
        ]
    }
});

userSchema.methods.addToMyWallets = function(wallet) {
    let result = null
    if(!this.myWallets.list.length){
        const myWallets = []
        myWallets.push({wallet_id: wallet._id})  
        result = myWallets;
    } else {
        const myWallets = [... this.myWallets.list]
        myWallets.push({wallet_id: wallet._id})
        result = myWallets; 
    }
    this.myWallets.list = result
    return this.save()
}

userSchema.methods.deleteFromMyWallets = function(wallet_id) {
    const updatedMyWallets = this.myWallets.list.filter(wallet => {
        return wallet_id.toString() !== wallet.wallet_id.toString()
    })
    this.myWallets.list =  updatedMyWallets   
    return this.save()    
}

module.exports = mongoose.model('User',userSchema);


// const { ObjectId } = require('mongodb');

// const getDb = require('../utils/database').getDb;

// module.exports = class User {
//     constructor(username,email,password,firstName,lastName,gender,dob,phone,job,facebook,linkedin,address,myWallets,id) {
//         this.username = username;
//         this.password = password;
//         this.email = email;
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.gender = gender;
//         this.dob = new Date(dob) ;
//         this.phone = phone;
//         this.job = job;
//         this.facebook = facebook;
//         this.linkedin = linkedin;
//         this.address = address;
//         this.myWallets = myWallets;
//         this._id = id;
//     }

//     save() {
//         const db = getDb();
//         return db.collection('users').insertOne(this)
//         .then(result => {
//             return result;
//         })
//         .catch(err => console.log(err));
//     }

//     update() {
//         const db = getDb();
//         return db.collection('users')
//         .updateOne({_id: new ObjectId(this._id)}, {$set: this })
//     }
    
//     static findByPk(id) {
//         const db = getDb();
//         return db.collection('users')
//         .findOne({_id: id});
//     }

//     static findByEmail(email) {
//         const db = getDb();
//         return db.collection('users')
//         .findOne({email: email});
//     }

// // ==================== Wallet Method ===================

//     addToMyWallets(wallet) {
//         let result = null
//         if(!this.myWallets){
//             const myWallets = []
//             myWallets.push(new ObjectId(wallet._id))   
//             result = myWallets;

//         } else {
//             const myWallets = [... this.myWallets.list]
//             myWallets.push(new ObjectId(wallet._id))
//             result = myWallets;
//         }

//         const db = getDb();
//         return db.collection('users')
//         .updateOne({_id: new ObjectId(this._id)}, {$set: { myWallets: {list: result}} })    
//     }

//     deleteFromMyWallets(wallet_id) {
//         const updatedMyWallets = this.myWallets.list.filter(wallet => {
//             return new ObjectId(wallet_id).toString() !== wallet.toString()
//         })
//         const db = getDb();
//         return db.collection('users')
//         .updateOne({_id: this._id}, {$set: { myWallets: {list: updatedMyWallets}} })
//     }
// };