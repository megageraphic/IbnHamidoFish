import pandas as pd
import json

excel_file = "menu.xlsx"
try:
    df = pd.read_excel(excel_file, sheet_name=0)
    menu_items = []
    for index, row in df.iterrows():
        if pd.notna(row.iloc[0]) and str(row.iloc[0]).strip() != "النوع" and str(row.iloc[0]).strip() != "nan":
            item = {
                "category": str(row.iloc[0]).strip(),
                "nameAr": str(row.iloc[1]).strip() if len(row) > 1 and pd.notna(row.iloc[1]) else "",
                "nameEng": str(row.iloc[2]).strip() if len(row) > 2 and pd.notna(row.iloc[2]) else "",
                "desc": str(row.iloc[3]).strip() if len(row) > 3 and pd.notna(row.iloc[3]) else "طازج يومياً",
                "price": float(row.iloc[4]) if len(row) > 4 and pd.notna(row.iloc[4]) else 150,
                "unit": str(row.iloc[5]).strip() if len(row) > 5 and pd.notna(row.iloc[5]) else "ج.م / كيلو",
                "status": "متوفر"
            }
            menu_items.append(item)
    
    if len(menu_items) > 0:
        with open("menu_data.json", "w", encoding="utf-8") as f:
            json.dump(menu_items, f, ensure_ascii=False, indent=4)
        print("✅ تم تحديث ملف menu_data.json بنجاح!")
    else:
        print("⚠️ لم يتم العثور على بيانات جديدة في الإكسيل.")
except Exception as e:
    print("❌ حدث خطأ أثناء قراءة الإكسيل:", e)