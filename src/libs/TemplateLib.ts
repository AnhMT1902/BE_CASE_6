import * as fs from 'fs';
import * as path from 'path';

class TemplateLib {

    private _baseDir: string = './../../../src/views';

    private static _formatAr: string = '{{%s}}';

    private _path: string = '';
    private _args: any;

    public config(path: string, args: any) : TemplateLib
    {
        this._path = path;
        this._args = args;
        return this;
    }

    public async getTemplate()
    {
        const file = await this._getFile();
        const args = await this._handleFormat();

        return await this._attachVar(file, args);
    }

    private async _getFile()
    {
        return fs.readFileSync(path.join(__dirname, this._baseDir, this._path), 'utf8');
    }

    private async _handleFormat()
    {
        let newArgs = {};
        for (let [key, value] of Object.entries(this._args)) {
            let format = await TemplateLib._formatAr;
            key = await format.replace('%s', key);
            newArgs[key] = await value;
        }
        return await newArgs;
    }

    private async _attachVar(file: string, args : object)
    {
        for (const [key, value] of Object.entries(args)) {
            await file.replace(key, value);
        }
        return file;
    }

}

export default new TemplateLib();