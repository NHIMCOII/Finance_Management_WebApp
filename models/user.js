const db = require('../util/database');

module.exports = class User {
    constructor(id,username,email,password,firstName,lastName,gender,dob,phone,job,facebook,linkedin,address) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dob = dob ;
        this.phone = phone;
        this.job = job;
        this.facebook = facebook;
        this.linkedin = linkedin;
        this.address = address;
    }

    save() {
        return db.execute('INSERT INTO users (username,email,password,firstName,lastName,gender,dob,phone,job,facebook,linkedin,address) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
            [this.username,this.email,this.password,this.firstName,this.lastName,this.gender,this.dob,this.phone,this.job,this.facebook,this.linkedin,this.address]
        );
    }

    update() {
        return  db.execute('UPDATE users SET username = ?, email = ?,firstName = ?,lastName = ?,job = ?,address = ?,phone = ?,facebook = ?,linkedin = ?,gender = ?,dob = ? WHERE id = ?;',
        [this.username,this.email,this.firstName,this.lastName,this.job,this.address,this.phone,this.facebook,this.linkedin,this.gender,this.dob,this.id]);
    }
    
    static fetchAll() {
        db.execute('SELECT * from users');
    }

    static findByPk(id) {
        return db.execute('SELECT * FROM users WHERE users.id = ?', [id]);
    }

    static findByEmail(email) {
        return db.execute('SELECT * FROM users WHERE users.email = ?', [email]);
    }
};