from fastapi import FastAPI
from app.routes import router


app=FastAPI(title="face-auth")

app.include_router(router)

@app.get("/health")
def health():
    return {"Status":"OK"}