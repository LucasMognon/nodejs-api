const express = require("express")
const mongoose = require("mongoose")

const app = express()
const port = 3000
app.use(express.json())


/**
 * Defining properties of our document
 */
const Film = mongoose.model("Film", { 
  title: String, 
  description: String,
  image_url: String,
  trailer_url: String
});

app.get("/", async (req, res) => {
  const films = await Film.find()
  return res.send(films)
})

/**
 * To find and edit data from database
 */
app.put("/:id", async(req, res) =>{
  const film = await Film.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url
  }, {
      new: true
  })

  return res.send(film)
})

/**
 * To find and delete data from database
 */
app.delete("/:id", async(req, res) => {
  const film = await Film.findByIdAndDelete(req.params.id)
  return res.send(film)
})


/**
 * To add new data to database
 */
app.post("/", async (req, res) => {
  const film = new Film({
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url
  })

  await film.save()
  res.send(film)

})

  app.listen(port, () => {
    mongoose.connect('mongodb+srv://lucas:OtMHxXvF2vLb82yf@node-api.5lczvpj.mongodb.net/?retryWrites=true&w=majority&appName=node-api')
    console.log(`App running on port ${port}`)
})