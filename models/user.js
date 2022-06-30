const db = require('../util/database');

module.exports = class User {
    constructor(id,username,email,password) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    save() {
        return db.execute('INSERT INTO users (username,email,password) VALUES (?,?,?)',
            [this.username,this.email,this.password]
        );
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