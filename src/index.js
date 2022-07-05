const express = require('express')
const cors = require('cors')

const port = process.env.PORT || 3001
const timerDurationMs = 1000

const app = express()
app.use(cors())

var count = 0
var id = 0

function setTimedEvents(response) {
    setTimeout(() => {
        if (count <= 30) {
            console.log(`Sending event ${count}`)
            response.write(`id: Message ${id++}\n`)
            response.write(`data: Hello ${count++}\n\n`)
            setTimedEvents(response)
        } else {
            console.log(`Ending a long connection`)
            response.end()
            count = 0
        }
    }, timerDurationMs)
}

app.get('/stream', (request, response) => {
    console.log(`Stream requested`)
    response.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
    })
    setTimedEvents(response)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
