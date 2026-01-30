from fastapi import APIRouter,UploadFile,File;
from app.face_service import extract_embedding,recog_face

router=APIRouter()

@router.post("/extract_embedding")
async def extract(file:UploadFile=File(...)):
    embedding=await extract_embedding(file)
    return embedding


@router.post("/recognize")
async def recog(file:UploadFile=File(...)):
    recogface=await recog_face(file)
    return recogface

