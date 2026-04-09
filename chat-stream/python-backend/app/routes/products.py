from fastapi import APIRouter, Request
import asyncio

router = APIRouter()



@router.get('/',response_model=list[str],summary="Get all products",description="Returns a list of all products in the database")
async def get_products(request: Request):
    print("Fetching products from the database...")
    await asyncio.sleep(1)  # Simulate a database call
    print("Products fetched successfully")
    return ["Product 1", "Product 2", "Product 3"]

