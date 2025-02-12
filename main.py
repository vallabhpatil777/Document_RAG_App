import os
import streamlit as st
from rag_utility import process_doc_to_chroma_db, answer_query, available_models

# Set working dir
working_dir = os.getcwd()

st.title("Document RAG App")

upload_file = st.file_uploader("Upload PDF file", type=["pdf"])



if upload_file is not None:
    save_path = os.path.join(working_dir, upload_file.name)
    with open(save_path, "wb") as f:
        f.write(upload_file.getbuffer())
    
    process_doc = process_doc_to_chroma_db(upload_file.name)
    st.info("Document Processed Successfully!!")


model_options = [i for i in available_models]
selected_model = st.selectbox("Select a Model", model_options)


user_query = st.text_area("Ask your question about the document")

if st.button("Answer"):
    answer = answer_query(user_query, selected_model)
    st.markdown("### Response : ")
    st.markdown(answer)
