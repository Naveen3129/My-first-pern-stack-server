const express=require("express");
 const app=express();
 const cors =require("cors");
const pool=require("./db");
const port = 3001
// //middleware
app.use(cors());
app.use(express.json());

// //Routes//


// //get all todos
app.get('/todos', async(req, res) => {
  // res.status(200).send(req.body);
  try{
    
   
   //console.log(req.body)
     //const {description} =req.body;
    const allTodo = await pool.query('SELECT * FROM todo');
     res.json(allTodo.rows);
      }
      catch (err){
          console.error(err.message);
      }
  
 });

// //get a todo
app.get('/todos/:id', async(req, res) => {
  // res.status(200).send(req.body);
  try{
    
   
   //console.log(req.body)
     const {id} =req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id =$1',[id]);
     res.json(todo.rows[0]);
      }
      catch (err){
          console.error(err.message);
      }
  
 });

// //update a todo
app.put('/todos/:id', async(req, res) => {
  // res.status(200).send(req.body);
  try{
    
   
   //console.log(req.body)
   const {id} =req.params;
     const {description} =req.body;
    const updateTodo = await pool.query('UPDATE todo SET description =$1 WHERE todo_id =$2',[description,id]);
     res.json("Todo was updated");
      }
      catch (err){
          console.error(err.message);
      }
  
 });

// //delete todo
app.delete('/todos/:id', async(req, res) => {
  // res.status(200).send(req.body);
  try{
    
   
   //console.log(req.body)
     const {id} =req.params;
    const deletetodo = await pool.query('DELETE  FROM todo WHERE todo_id =$1',[id]);
     res.json("Todo deleted");
      }
      catch (err){
          console.error(err.message);
      }
  
 });
/////////////////////////////
app.post('/todos', async(req, res) => {
 // res.status(200).send(req.body);
 try{
   
  
  //console.log(req.body)
    const {description} =req.body;
   const newTodo = await pool.query('INSERT INTO todo(description) VALUES($1) RETURNING *',[description]);
    res.json(newTodo.rows[0]);
     }
     catch (err){
         console.error(err.message);
     }
 
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})