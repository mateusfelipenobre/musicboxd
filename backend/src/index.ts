import express from 'express';

const app = express();
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
