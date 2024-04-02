const queries = require('./../db/query');

const db = require("../db");

const trips = (server,db)=>{

server.post('/trips', async (req, res) => {
    const { user_id, trip_name, destination, start_date, end_date, notes } = req.body;

    try {
        const result = await db.query( 
            queries.trips
            [ user_id,trip_name, destination, start_date, end_date, notes]
        );

        res.status(201).json({message:"hello"});
    } catch (error) {
        console.error('Error creating trip:', error);
        res.status(500).send('Error creating trip');
    }
})};


const gettrips = (server,db)=>{
server.get('/trips', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM trips');
        res.json(result.rows);
    } catch (error) {
        console.error('Error getting trips:', error);
        res.status(500).send('Error getting trips');
    }
});}


const deletetrips = (server,db)=>{
server.delete('/trips/:trip_id', async (req, res) => {
    const tripId = req.params.trip_id;

    try {
        const result = await db.query(queries.deletetrips,[tripId]);

        if (result.rows.length === 0) {
            return res.status(404).send('Trip not found');
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error deleting trip:', error);
        res.status(500).send('Error deleting trip');
    }
});}

module.exports={
    trips,gettrips,deletetrips
}


