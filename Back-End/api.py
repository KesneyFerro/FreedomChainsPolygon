from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from LLM.AI import generate_guard_comments, generate_detainee_report
from LLM.markdown_to_pdf import convert_to_pdf
from pydantic import BaseModel
import os

class MyData(BaseModel):
    id_detento: str
    historico: list

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/historico/json")
async def get_historico_json(data: MyData):
    # data:
    # - id_detento
    # - histórico de comentários
    relatorio_json = generate_guard_comments(data)
    return relatorio_json

@app.post("/historico/pdf")
async def get_historico_pdf(data: MyData):
    relatorio_json = await get_historico_json(data)
    detainee_report = generate_detainee_report(relatorio_json)

    id_detento = data.id_detento
    historico = data.historico
    
    folder_path = f"./Reports/{id_detento}/"
    pdf_file = ""

    for item in os.listdir(folder_path):
        if item.lower().endswith('.pdf'):
            pdf_file = item

    return FileResponse("./Reports/" + id_detento + "/" + pdf_file)

    # ultimo_comentario = historico[-1]
    # comportamento = ultimo_comentario["comportamento"]
    # data = str(ultimo_comentario["data"]).replace("/", "-")

    # file_name = f"DetaineeReport_{id_detento}_{comportamento}_{data}.pdf"
    # await convert_to_pdf(detainee_report, file_name)

    # os.rename("./" + file_name, "./Reports/" + file_name)

    # file_path = f"./Reports/{file_name}"
    # return FileResponse(file_path)
