from pydantic import BaseModel
from typing import Optional

class Corporation(BaseModel):
    מספר_חברה: int
    שם_חברה: str
    סטטוס_חברה: str
    תאריך_התאגדות: Optional[str]
    חברה_ממשלתית: Optional[str]
    מגבלות: Optional[str]
    מפרה: Optional[str]
    שנה_אחרונה_של_דוח_שנתי: Optional[str]
    שם_עיר: Optional[str]
    שם_רחוב: Optional[str]
    מספר_בית: Optional[str]
    מיקוד: Optional[str]
    ת_ד: Optional[str]
    מדינה: Optional[str]
    אצל: Optional[str]
    תת_סטטוס: Optional[str]