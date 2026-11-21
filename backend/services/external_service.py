import httpx, os

HEADERS = {"User-Agent": os.getenv("WIKIDATA_USER_AGENT", "Dharohar/1.0")}

async def wikidata_search(query: str):
    url = "https://www.wikidata.org/w/api.php"
    params = {"action":"wbsearchentities","search":query,"language":"en","format":"json","limit":5}
    async with httpx.AsyncClient(timeout=8, headers=HEADERS) as client:
        r = await client.get(url, params=params)
        r.raise_for_status()
        return r.json().get("search", [])

async def wikipedia_summary(title: str):
    url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + title.replace(" ", "_")
    async with httpx.AsyncClient(timeout=8, headers=HEADERS) as client:
        r = await client.get(url)
        if r.status_code != 200:
            return None
        return r.json()
