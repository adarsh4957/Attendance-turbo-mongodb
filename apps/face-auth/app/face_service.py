import face_recognition
import numpy as np
from PIL import Image
import io


async def extract_embedding(img_file):
    img_bytes=await img_file.read()
    img=Image.open(io.BytesIO(img_bytes))
    img_np=np.array(img)

    face_location=face_recognition.face_locations(img_np)

    if(len(face_location)!=1):
        return {"error":"only one face image required"}
    
    embedding=face_recognition.face_encodings(img_np,face_location)

    return {
        "embedding":embedding[0].tolist()
    }

async def recog_face(img_file):
    img_bytes=await img_file.read();
    img=Image.open(io.BytesIO(img_bytes))
    img_np=np.array(img)

    face_locations=face_recognition.face_locations(img_np)
    embeddings=face_recognition.face_encodings(img_np,face_locations)

    return {
        "face_detected":len(embeddings),
        "embeddings":(e.tolist() for e in embeddings)
    }