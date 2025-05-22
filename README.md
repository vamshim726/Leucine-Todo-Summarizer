
# Todo Summary Assistant

This is a full-stack application that allows users to manage their to-do items and generate a meaningful summary of pending to-dos using an LLM (Cohere AI). The generated summary is then sent to a Slack channel via Slack Webhooks.

### Features:
- **Create, Edit, and Delete Todo Items**: Manage personal to-do list items.
- **Summarize Todos**: Click a button to generate a summary of all pending to-dos using Cohere AI.
- **Send Summary to Slack**: The generated summary is posted to a Slack channel using Slack Incoming Webhooks.

---

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js (Express)
- **LLM Integration**: Cohere AI
- **Slack Integration**: Slack Incoming Webhooks
- **Hosting**: Vercel (Frontend), Render (Backend)
- **Database**:  MongoDB

---

## Setup Instructions

### 1. **Clone the Repository**

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/todo-summary-assistant.git
cd todo-summary-assistant
```

### 2. **Frontend Setup (React)**

- Navigate to the **frontend** directory and install dependencies:

```bash
cd frontend
npm install
```

- **Environment Variables for Frontend**:  
  Create a `.env` file in the `frontend` directory, then add your backend URL and any other configurations like so:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

- **Start Frontend Development Server**:

```bash
npm start
```

Your frontend will now be accessible at `http://localhost:3000` by default.

### 3. **Backend Setup (Node.js + Express)**

- Navigate to the **backend** directory and install dependencies:

```bash
cd backend
npm install
```

- **Environment Variables for Backend**:  
  Create a `.env` file in the `backend` directory, and add the following variables:

```env
PORT=5000
COHERE_API_KEY=your-cohere-api-key
SLACK_WEBHOOK_URL=your-slack-webhook-url
```

  - Replace `your-cohere-api-key` with your actual **Cohere AI** API key.
  - Replace `your-slack-webhook-url` with the **Slack Incoming Webhook URL** for posting the summaries to Slack.

- **Start Backend Development Server**:

```bash
npm start
```

Your backend API will now be running at `http://localhost:5000`.

### 4. **Cohere AI Setup**

- **Sign up for Cohere**:  
  To integrate Cohere for generating summaries, sign up at [Cohere](https://cohere.ai/) and obtain an API key.

- Add your Cohere API key to the `.env` file in the **backend** directory as mentioned in step 3.

### 5. **Slack Webhook Setup**

- **Create a Slack App**:  
  1. Go to [Slack API](https://api.slack.com/apps) and click "Create New App".
  2. Select the "From Scratch" option and follow the instructions to create your app.
  3. Enable the **Incoming Webhooks** feature for your app and create a new Webhook URL for your channel.

- Copy the Webhook URL and add it to your backend `.env` file as described in step 3.

### 6. **Testing the Application**

1. **Start the Backend**:  
   Ensure that your backend server is running at `http://localhost:5000`.
2. **Start the Frontend**:  
   Run the frontend server at `http://localhost:3000`.
3. **Interacting with the App**:  
   - Add, delete, and manage to-dos.
   - Click the **Summarize Todos** button to generate the summary and send it to Slack.

### 7. **Deploying the Application**

#### Backend Deployment

- **Render** is a great option for deploying the backend.  
- After signing up on Render, create a new **Web Service** and link your backend repository to deploy it.

#### Frontend Deployment

- **Vercel** is the recommended platform for deploying the React frontend.  
- After signing up on Vercel, import your frontend repository and deploy it to get a live URL.

---

## Folder Structure

```
/todo-summary-assistant
  /frontend            # React frontend files
  /backend             # Node.js backend files
  .env.example         # Example environment variables file
  README.md            # Project setup and instructions
```

---

## API Endpoints

1. **GET /todos**  
   Fetch all to-do items.
   - **Response**: `[{ id, title, status }]`

2. **POST /todos**  
   Add a new to-do item.
   - **Request Body**: `{ title: string, status: 'pending' | 'completed' }`

3. **DELETE /todos/:id**  
   Delete a to-do item by ID.
   - **Response**: Success or failure message.

4. **POST /summarize**  
   Summarize all to-dos and send the summary to Slack.
   - **Request Body**: `{ todos: [todo_titles] }`
   - **Response**: Success or failure message.

---

## Additional Notes

- **Slack Webhook URL**: To receive summaries in Slack, ensure you have correctly configured the Incoming Webhook URL in your Slack settings.
- **Cohere API**: The LLM API (Cohere) provides text summarization features. Ensure your API key is valid and properly integrated in the backend.

---

## License

This project is licensed under the MIT License - see the [[LICENSE]](https://opensource.org/license/mit) file for details.
