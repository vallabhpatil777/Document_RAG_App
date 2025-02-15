from fastapi import FastAPI, UploadFile, File, Form
import os
from rag_utility import process_doc_to_chroma_db, answer_query, available_models
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request

app = FastAPI()

working_dir = os.getcwd()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)




@app.post("/upload/")
async def upload_document(request: Request, file: UploadFile = File(...)):
    try:
        # Save file to disk
        save_path = os.path.join(working_dir, file.filename)
        with open(save_path, "wb") as f:
            f.write(file.file.read())
        
        # Process document (Chroma DB update or other actions)
        process_doc_to_chroma_db(file.filename)

        # Return success message
        return {"message": f"Document {file.filename} processed successfully!"}
    except Exception as e:
        return {"error": str}

@app.get("/models/")
def get_models():
    print(available_models)  # Log available models
    return {"available_models": available_models}


@app.post("/query/")
def get_answer(query: str = Form(...), model: str = Form(...)):
    if model not in available_models:
        return {"error": "Invalid model selected."}
    answer = answer_query(query, model)
    return {"response": answer}
