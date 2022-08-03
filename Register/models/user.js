const Model = require('./model');
const bcrypt = require('bcrypt');
const Invoice = require('./invoice');
class User extends Model {
    constructor(name, lastname, age, email, password) {
        super();
        this.name = name;
        this.lastname = lastname;
        this.age = age;
        this.email = email;
        this.password = password;


    }

   static async getByEmail(email, showPassword = false) {
        const users = await Model.readFile('users.json');
        if(!users.length) {
            return;
        }

        const filteredUser = users.find((user) => user.email === email);
        if(showPassword) {
            delete filteredUser.password;
        }

        return filteredUser;

    }
    static async getByEmailClient(email) {
        const users = await Model.readFile('users.json');
        if(!users.length) {
            return;
        }

        const client = users.find((user) => user.email === email);
        return client;
    }

    static async getById(id) {
        const users = await Model.readFile('users.json');
        if(!users.length) {
            return;
        }

        const filteredUser = users.find((user) => user.id === id);
        delete filteredUser.password;

        return filteredUser;
    }


    async save() {
        this.password = await bcrypt.hash(this.password,10);
        await Model.writeFile('users.json', this)
    }
}

module.exports = User;
