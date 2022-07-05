const express = require('express')
const cors = require('cors')

const port = process.env.PORT || 3001
const timerDurationMs = 1000

const app = express()
app.use(cors())

var count = 0

function setTimedEvents(response) {
    setTimeout(() => {
        console.log(`Sending event ${count}`)
        response.write(`data: ${count++}\n\n`)
        setTimedEvents(response)
    }, timerDurationMs)
}

app.get('/stream', (request, response) => {
    console.log(`Stream requested`)
    response.writeHead(200, {
        'Content-Type': 'text/event-stream',
    })
    setTimedEvents(response)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
