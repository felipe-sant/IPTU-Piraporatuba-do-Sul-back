import app from "./app"

const port = Number(process.env.PORT) || 3001

app.listen(port, '0.0.0.0', () => {
    console.log(`✅ | Servidor em execução, porta interna ${port}!`)
}).on('error', (err) => {
    console.error(`❌ | Erro ao iniciar o servidor: ${err}`)
})