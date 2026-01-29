from fastapi import APIRouter,UploadFile,File;
from app.face_service import extract_embedding,recog_face

router=APIRouter()

@router.post("/extract_embedding")
async def extract(file:UploadFile=File(...)):
    return extract_embedding(file)


@router.post("/recognize")
async def recog(file:UploadFile=File(...)):
    return recog_face(file)

