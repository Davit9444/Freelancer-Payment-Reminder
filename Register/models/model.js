const fs = require('fs/promises');
const path = require('path');
class Model {
    static async readFile(fileName) {
        const modelsBuffer = await fs.readFile(path.join(__dirname, `../dbs/${fileName}`));
        const modelsJson = modelsBuffer.toString();

        if(!modelsJson) {
            return [];
        }
        return JSON.parse(modelsJson);
    }
    static async writeFile(fileName,model) {
        const models = await this.readFile(fileName);
        model.id = models.length + 1;
        models.push(model);

        await fs.writeFile(path.join(__dirname, `../dbs/${fileName}`),
            JSON.stringify(models));
    }
}

module.exports = Model;



