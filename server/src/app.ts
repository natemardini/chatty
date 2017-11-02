import * as express from 'express'
import * as morgan from 'morgan'
import * as http from 'http'
import * as path from 'path'
import ChatSocketServer from './sockets/chat'

const PORT: number = Number(process.env.PORT) || 3001

/**
 * Initialize our Express http server
 * @return {http.Server} server
 */
const app: any = express()

app.use(morgan('dev'))
app.use('/public', express.static('./client/dist'))

app.get('/', (req: any, res: any) => {
    res.sendFile(path.join(__dirname + '../../index.html'));
})


const server = app.listen(PORT, () => {
        console.log(`Running Backend Server at http://0.0.0.0:${PORT}`)
})

/**
 * Initialize a new socket server instance
 */
new ChatSocketServer({ server }).listen()
