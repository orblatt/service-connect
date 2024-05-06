class DataGovIL:
    base_url = "https://data.gov.il/api/3/action/datastore_search"

    def __init__(self, resource_id: str):
        self.resource_id = resource_id
