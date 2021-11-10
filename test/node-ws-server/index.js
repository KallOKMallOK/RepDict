var Server = require('simple-websocket/server')
var argv = require('minimist')(process.argv.slice(2))


var server = new Server({ port: argv.port || 8080 }) // see `ws` docs for other options

server.on('connection', function (socket) {
	// init massage!
	socket.write(JSON.stringify({ massage: "INIT" }))


	socket.on('data', function (data) {
		const __data = JSON.parse(data)
		console.log(__data)
		// calculating
		socket.write(JSON.stringify({ result: __data.op1 + __data.op2 === 10 ? "Vadim hahahahahahaa": __data.op1 + __data.op2 }))
	})

	socket.on('close', function () {
		console.log("socket closed(")
	})
	socket.on('error', function (err) {
		console.log('error', err)
	})
})

// server.close()