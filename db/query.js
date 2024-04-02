


module.exports = {
    register:'INSERT INTO users (username , age ,level,contact, password,picture,date ) VALUES ($1, $2, $3 ,$4 ,$5 ,$6 ,$7)',
    trips: 'INSERT INTO trips (user_id, trip_name, destination, start_date, end_date, notes) VALUES ($1, $2, $3, $4, $5, $6)',
    deletetrips:'DELETE FROM trips WHERE trip_id = $1 RETURNING *'
}

