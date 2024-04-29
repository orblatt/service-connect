import httpx
from fastapi import HTTPException

ISRAELI_CORPORATIONS_AUTHORITY_RESOURCE_ID = "f004176c-b85f-4542-8901-7b3176f9a054"


# Function to handle API requests to the external service

class DataGovIL:
    base_url = "https://data.gov.il/api/3/action/datastore_search"

    def __init__(self, resource_id: str):
        self.resource_id = resource_id


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
