import time
import os
import json
from langchain_community.document_loaders import UnstructuredPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_groq import ChatGroq
from langchain.chains import RetrievalQA
from dotenv import load_dotenv

load_dotenv()


# Loading GROQ API key
working_dir = os.path.dirname(os.path.abspath((__file__)))   
#config_data = json.load(open(f"{working_dir}/config.json"))
GROQ_API_KEY  = os.getenv("GROQ_API_KEY")
os.environ["GROQ_API_KEY"] = GROQ_API_KEY

# Load embedding model 
embedding = HuggingFaceEmbeddings()

available_models = [
    "deepseek-r1-distill-llama-70b",
    "llama-3.3-70b-versatile",
    "gemma2-9b-it",
    "mixtral-8x7b-32768",
    "deepseek-r1-distill-qwen-32b",
]

# Function to select the model
def get_llm(model_name):
    if model_name in available_models:
        return ChatGroq(model=model_name, temperature=0)
    else:
        return ChatGroq(model="deepseek-r1-distill-llama-70b", temperature=0)

# function to process document into vector store (Chroma)
def process_doc_to_chroma_db(file_name):
    loader = UnstructuredPDFLoader(f"{working_dir}/{file_name}")
    documents = loader.load()

    vectorstore_path = f"{working_dir}/doc_vectorstore"

    # Generating a unique session ID 
    session_id = str(int(time.time())) 

    # Splitting into chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=80
    )

    texts = text_splitter.split_documents(documents)

    # adding session id
    for text in texts:
        text.metadata["session_id"] = session_id  

    # Store in Chroma
    vectordb = Chroma.from_documents(
        documents=texts,
        embedding=embedding,
        persist_directory=vectorstore_path
    )

    # Save the latest session ID
    with open(f"{vectorstore_path}/latest_session.json", "w") as f:
        json.dump({"latest_session_id": session_id}, f)

    return session_id

# function to answer the query based on selected model with session based approach 
def answer_query(user_query, model_name):
    llm = get_llm(model_name)

    
    vectorstore_path = f"{working_dir}/doc_vectorstore"
    vectordb = Chroma(persist_directory=vectorstore_path, embedding_function=embedding)
    
    # Load latest session ID
    latest_session_id = None
    session_file = f"{vectorstore_path}/latest_session.json"
    if os.path.exists(session_file):
        with open(session_file, "r") as f:
            latest_session_id = json.load(f).get("latest_session_id")
    
    # Use a retriever based on latest session
    retriever = vectordb.as_retriever(
        search_kwargs={"filter": {"session_id": latest_session_id}}
    )

    # QA chain
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",  # map_reduce - large documents, refine - slow as it requires multiple llm calls, map_rerank - rank based, higher rank answer is given as output
        retriever=retriever,
    )

    response = qa_chain.invoke({"query": user_query})
    return response["result"]


