const queries = require('./../db/query')

const login = (server,db,bcrypt,jwt,secretKey)=>{
    server.post('/login', async (req, res) => {
        const { username, password } = req.body;
      
        try {
          const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
          const user = result.rows[0];
      
          if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).send('Invalid username or password');
          }
      
          const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 3600 });
          res.send({ auth: true, token: token });
      
        } catch (error) {
          console.error('Error logging in:', error);
          res.status(500).send('Error logging in');
        }
      });

}

const register = (server,db,bcrypt)=>{
    server.post('/register', async (req, res) => {
        const { username , age,level ,contact,password,picture ,date} = req.body;
      
        try { 
             const existingUser = await db.query('SELECT * FROM users WHERE username = $1', [username]);

        if (existingUser.rows.length !== 0) {
          return res.status(409).send('User with the same username already exists');
        }
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
      
          // Insert user data into the database
          await db.query(queries.register, [username , age,level ,contact,hashedPassword,picture ,date]);
      
          res.status(201).send('User registered successfully');
        } catch (error) {
          console.error('Error registering user:', error);
          res.status(500).send('Error registering user');
        }
      });
      
}

module.exports={
    login,register
}

