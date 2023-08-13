import { connect, connection } from "mongoose"

function initializeClient() {
  connection
    .on("error", function (err) {
      console.log("Connection error: ", err)
    })
    .once("open", function () {
      console.log("Database connected")
    })

  connect(process.env.MONGO_URL as string)
}

export { initializeClient }