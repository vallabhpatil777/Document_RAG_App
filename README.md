# Document_RAG_App

## Developed a Document RAG (Retrieval-Augmented Generation) App that integrates Deepseek-R1-70b, Llama-70b and few more LLM models, LangChain, hugging face embeddings and Chroma vector database to enhance document querying and summarization. Using Python, Streamlit, and Groq Cloud API, the app provides a user-friendly interface for document search and context-aware AI responses utilising LLM.

## Key Features:
1. Efficient document retrieval using vector embeddings.
2. AI-driven Q/A for better insights on the document and real-time query responses.
3. Integration with Groq Cloud API for processing.
4. Use of LangChain library for PDF preprocessing and query chaining.
5. Different models can be selected to compare the responses.
6. Session based approach used to avoid the overwriting of different document embeddings.

## Usecases:
PDF analyzer, resume summarization/analyzer, Document Q&A and many such summarization/ Q&A applications.

## Skills: 
Python (Programming Language) · LangChain · Large Language Models (LLM) · Streamlit · Retrieval-Augmented Generation (RAG) · Vector database

## Steps

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```


### 2. Create Virtual Environment : 

For MacOS/Linux : 
```bash
python3 -m venv venv
source venv/bin/activate
```

For Windows :
```bash
python -m venv venv
.\venv\Scripts\activate
```

### 3. Install required libraries : 
```bash
pip install -r requirements.txt
```


### 4. Setup Groq Cloud API : 

Link : https://console.groq.com/login

### 5. Create .env file into the directory : 

Copy paste your API key into the file and save it.
```bash
GROQ_API_KEY = "your_groq_api_key"
```

### 6. Run the streamlit app : 

```bash
streamlit run main.py
```

## Snapshots 

### Below snapshot is an example that this application can be used for resume summarization. 

![image](https://github.com/user-attachments/assets/51603929-9cdc-41df-a3f3-cd9625502493)

![image](https://github.com/user-attachments/assets/2c7a9ce2-fe43-40d1-8faa-2adb0e5dbbd5)
