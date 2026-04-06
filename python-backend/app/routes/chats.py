from fastapi import APIRouter,Request

router = APIRouter()

@router.post("/")
async def chat(request: Request):
    return {"message": "Hello, World!"}


@router.get("/")
async def get_chats(request: Request):
    return {"chats": []}