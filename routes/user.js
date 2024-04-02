
const getusers = (server,db)=> {

    server.get('/', async (req, res) => {
        try {
          const result = await db.query('SELECT * FROM users');
          res.json(result.rows);
        } catch (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
      })

}
const deleteuser = (server,db)=>{

    server.delete('/users/:id', async (req, res) => {
        const userId = req.params.id;
      
        try {
          // Execute SQL DELETE query
          const result = await db.query('DELETE FROM users WHERE id = $1', [userId]);
      
          // Check if any rows were affected
          if (result.rowCount === 1) {
            res.status(200).send('User deleted successfully');
          } else {
            res.status(404).send('User not found');
          }
        } catch (error) {
          console.error('Error deleting user:', error);
          res.status(500).send('Error deleting user');
        }
      });
      
}


module.exports={
    getusers,deleteuser
}