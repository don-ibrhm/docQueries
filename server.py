from fastapi import FastAPI, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import chromadb
from llama_index.vector_stores import ChromaVectorStore
from llama_index import VectorStoreIndex, SimpleDirectoryReader, StorageContext, load_index_from_storage
import openai
import os

openai.api_key = "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"

if not os.path.isdir('data'):
    os.mkdir('data')
chroma_client = chromadb.PersistentClient("./storage")
chroma_collection = chroma_client.get_or_create_collection("diverge")
vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
storage_context = StorageContext.from_defaults(vector_store=vector_store)

def reload():
    global query_engine
    documents = SimpleDirectoryReader('data').load_data()
    index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
    index.storage_context.persist()
    query_engine = index.as_query_engine()
    if not query_engine:
        print("Query Engine not properly initilaized\n" +
              os.listdir('./data'))
    else:
        return query_engine

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def root() -> str:
    reload()
    return ("Reloaded successfully")

@app.get("/query/")
def query(text:str=None):
    # query_engine = reload()
    global query_engine
    if not text:
        return "Provide a query with text (/query/?text=...)"
    response = query_engine.query(text)
    print(response)
    return response

@app.post("/upload/")
def upload(document:UploadFile) -> str:
    if not document:
        return JSONResponse(content={"error": "No file provided"}, status_code=400)
    try:
        doc_file = document.file.read()
        doc_name = document.filename
        doc_path = os.path.join('data', os.path.basename(doc_name))
        with open(doc_path, 'wb') as doc_local:
            doc_local.write(doc_file)
        reload()
        return(f"{doc_name} succesfully uploaded")
    except Exception as e:
        return("Error: " + str(e.args))
    
@app.get("/documents")
def documents() -> list:
    return os.listdir('./data')

# query_engine = None  
# reload()
# query = input("What is your question: ")
# while query:
#     response = query_engine.query(query)
#     print(response)
#     query = input("What is your question: ")

# print(__name__, end='\n\n\n')
# if __name__ == '__main__':
documents = SimpleDirectoryReader('data').load_data()
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
index.storage_context.persist()
query_engine = index.as_query_engine()
print("--- MANUAL - RELOAD ---")