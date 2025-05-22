const express = require("express")
const app = express()
const { createTodo,updateTodo, deleteTodo } = require ("./types")
const {todo} = require ("./db")
const cors = require('cors')
const { CohereClient } = require('cohere-ai');
const dotenv = require('dotenv');
dotenv.config();

 const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});
app.use(express.json()) 
app.use(cors({
    origin: 'https://leucine-todo-summarizer.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
 }))

const port = process.env.PORT || 3000

app.post("/todos", async (req,res)=>{
    const createPayLoad=req.body;   
    const parsePayLoad=createTodo.safeParse(createPayLoad);

    if(!parsePayLoad.success){
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return;
    } 
    //put in mongo db
   await todo.create({
        title: createPayLoad.title,
        description: createPayLoad.description,
        completed:false
        
    })

    res.json({
        msg: "Todo Created"
    })

 
})
 
 


app.delete("/todo", async (req, res) => {
    try {
        const deletePayLoad = deleteTodo.safeParse(req.body);
        if (!deletePayLoad.success) {
            res.status(411).json({ msg: "You sent the wrong inputs" });
            return;
        }

        const deletedTodo = await todo.findByIdAndDelete(req.body.id);
        if (!deletedTodo) {
            return res.status(404).send('Todo not found');
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/todos", async(req,res)=>{
    
    const todos= await todo.find({})
    // console.log(todos);
    res.json({
        todos
    })

})

 



app.put("/completed", async (req, res) => {
    try {
        const updatePayLoad = updateTodo.safeParse(req.body);
        if (!updatePayLoad.success) {
            res.status(411).json({ msg: "You sent the wrong inputs" });
            return;
        }

        const updatedTodo = await todo.findByIdAndUpdate(req.body.id, { completed: true }, { new: true });
        if (!updatedTodo) {
            return res.status(404).send('Todo not found');
        }
        res.status(200).json({ message: 'Todo marked as completed' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/summarize', async (req, res) => {
  try {
    const todos = req.body.todos; // e.g. ["Do X", "Fix Y"]
    const todoText = todos.map((t, i) => `${i + 1}. ${t}`).join('\n');

    const response = await cohere.generate({
      model: 'command',
      prompt: `Summarize the following list of todos:\n${todoText}`,
      maxTokens: 100,
      temperature: 0.5,
    });

    const summary = response.generations[0].text.trim();

     await axios.post(process.env.SLACK_WEBHOOK_URL, {
      text: `📝 *Todo Summary:*\n${summary}`,
    });
    
    res.status(200).json({ summary });
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});


app.listen(port,()=>{
console.log("Server listening on port "+port);
})
 