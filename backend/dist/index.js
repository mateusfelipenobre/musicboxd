"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.get('*', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>MusicBoxd</title>
            </head>
            <body>
                <h1>MusicBoxd</h1>
                <p>Rede social onde o usuário pode pesquisar um álbum de música,
                 escrever uma resenha, editá-la e apagá-la caso queira.</p>
                <h2>Autores</h2>
                <ul>
                    <li>Mateus Felipe</li>
                    <li>Thais Alves</li>
                   
                </ul>
            </body>
        </html>
    `);
});
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
