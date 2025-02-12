# Document_RAG_App


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
venv\Scripts\activate
```

### 3. Install required libraries : 
```bash
pip install -r requirements.txt
```


### 5. Setup Groq Cloud API : 

Link : https://console.groq.com/login

### 6. Create .env file into the directory : 

Copy paste your API key into the file and save it.
```bash
GROQ_API_KEY = "your_groq_api_key"
```

### 7. Run the streamlit app : 

```bash
streamlit run main.py
```