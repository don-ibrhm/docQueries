import uvicorn
from uvicorn.config import LOGGING_CONFIG
from contextlib import asynccontextmanager
from fastapi import FastAPI, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import chromadb
from llama_index.vector_stores import ChromaVectorStore
from llama_index import VectorStoreIndex, SimpleDirectoryReader, StorageContext, load_index_from_storage
import openai
import os

# from llama_index.llms

with open("api_key.txt") as key:
    api_key = key.readline().strip()
    openai.api_key = api_key

storage_context = None
index = None
query_engine = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global index, storage_context
    startup()
    yield
    index.storage_context.persist()
    print("- Saved to memory")

def startup():
    global storage_context, index, query_engine
    if not os.path.isdir('data'):
        os.mkdir('data')
    chroma_client = chromadb.PersistentClient("./storage")
    chroma_collection = chroma_client.get_or_create_collection("diverge")
    vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
    storage_context = StorageContext.from_defaults(vector_store=vector_store)
    documents = SimpleDirectoryReader('data').load_data()
    index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
    index.storage_context.persist()
    query_engine = index.as_query_engine()
    print("- Startup Complete")
    

def reload():
    global query_engine, index, storage_context
    documents = SimpleDirectoryReader('data').load_data()
    index = VectorStoreIndex.from_documents(documents, storage_context=storage_context, show_progress=True)
    query_engine = index.as_query_engine()
    if not query_engine:
        print("Query Engine not properly initilaized\n" +
              os.listdir('./data'))
    else:
        return query_engine

app = FastAPI(lifespan=lifespan)

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
    global query_engine
    if not text:
        return "Provide a query with text (/query/?text=...)"
    response = query_engine.query(text)
    print(response)
    return response

@app.post("/upload/")
def upload(document:UploadFile) -> str:
    print("/upload/ pinged")
    if not document:
        return JSONResponse(content={"error": "No file provided"}, status_code=400)
    try:
        doc_file = document.file.read()
        doc_name = document.filename
        doc_path = os.path.join('data', os.path.basename(doc_name))
        with open(doc_path, 'wb') as doc_local:
            doc_local.write(doc_file)
        print(f"{doc_name} succesfully uploaded")
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

if __name__ == '__main__':
    LOGGING_CONFIG["formatters"]["default"]["fmt"] = "%(asctime)s [%(name)s] %(levelprefix)s %(message)s"
    uvicorn.run("server:app", reload=True, host='0.0.0.0', port=8000)