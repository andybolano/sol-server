const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();
const { v4: uuidv4 } = require('uuid');

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  next();
});

server.get("/trips", (req, res) => {
  res.jsonp(router.db.get("trips"));
});

server.get("/trip/:id", (req, res) => {
  const tripId = req.params.id
  const trip = router.db.get("trips").find({ id: tripId }).value();

  if (!trip) {
    return res.status(400).jsonp({ message: "ID not found" });
  }

  return res.json(trip)
})

server.post("/trip", (req, res) => {
  const trip = req.body;
  trip.id = uuidv4();
  router.db.get('trips').push(trip).write();
  res.jsonp(trip);
});

server.patch("/trip/:id", (req, res) => {
  const tripId = req.params.id;
  const updatedTripData = req.body;

  const tripIndex = router.db.get('trips').findIndex((trip) => trip.id === tripId);

  if (tripIndex !== -1) {
    router.db.get("trips").find({ id: tripId }).assign(updatedTripData).write();
    const updatedTrip = router.db.get("trips").find({ id: tripId }).value();
    res.jsonp(updatedTrip);
  } else {
    res.status(404).jsonp({ error: "Trip not found" });
  }

});

server.use(router);
server.listen(process.env.PORT || 3001, () => {
  console.log("JSON Server is running", process.env.PORT);
});
