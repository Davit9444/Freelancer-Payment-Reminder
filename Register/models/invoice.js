const Model = require('./model');
const User = require('./user');
const bcrypt = require('bcrypt');

class Invoice extends Model {
    constructor(money, email, name, lastname, nameClient, lastnameClient, emailClient, payment_date) {
        super();
        this.money = money;
        this.email = email;
        this.name = name;
        this.lastname = lastname;
        this.name_client = nameClient;
        this.lastname_client = lastnameClient;
        this.emailClient = emailClient;
        this.payment_date = payment_date;
    }

    static async getByEmail(email) {
        const moneys = await Model.readFile('invoice.json');
        if(!moneys.length) {
            return ;
        }
        const filteredMoney = moneys.find((money) => money.email === email);

        return filteredMoney;
    }

    static async getById(id) {
        const moneys = await Model.readFile('invoice.json');
        if(!moneys.length) {
            return;
        }
        const filteredMoney = moneys.find((money) => money.id === id);
        return filteredMoney;
    }



    async save() {
        await Model.writeFile('invoice.json', this);
    }
}


module.exports = Invoice;