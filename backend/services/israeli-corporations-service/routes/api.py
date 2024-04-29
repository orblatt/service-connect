from fastapi import APIRouter, Depends
from ..dependencies import IsraeliCorporationsAuthorityAPI
from ..models import schema

router = APIRouter()

@router.get("/corporations", response_model=list[schema.Corporation], response_model_exclude_unset=True)
async def read_corporations(company_name: str, status: str = 'פעילה'):
    data = await IsraeliCorporationsAuthorityAPI().fetch(company_name, status)
    return data["result"]["records"]