import httpx
from fastapi import HTTPException
from ..configs.default import ISRAELI_CORPORATIONS_AUTHORITY_RESOURCE_ID
from .data_gov_il import DataGovIL
class IsraeliCorporationsAuthorityAPI(DataGovIL):
    def __init__(self):
        super().__init__(resource_id=ISRAELI_CORPORATIONS_AUTHORITY_RESOURCE_ID)

    async def fetch(self, company_name: str, status: str = "פעילה"):
        params = self._create_payload(company_name, status)
        async with httpx.AsyncClient() as client:
            response = await client.get(self.base_url, params=params)
            if response.status_code == 200:
                return response.json()
            else:
                raise HTTPException(status_code=404, detail="Data not found")

    def _create_payload(self, company_name: str, status: str):
        return {
            "resource_id": self.resource_id,
            "limit": 1,
            "q": {"שם חברה": f'{company_name}'},
            "filters": {"סטטוס חברה": f"{status}"}
        }
