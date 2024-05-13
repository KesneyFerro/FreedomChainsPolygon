from openai import OpenAI
from dotenv import dotenv_values
import pypandoc
import datetime

# Generate the prison guard comments about the detainee
def generate_guard_comments(comentario):
  prompt = """Baseado no histórico de comentários apresentado, leia os comentários e me retorne esta estrutura:
{
  "id_detento: "ID do detento"
  "range_data": "Período de tempo entre a data do primeiro comentário registrado até a data do último comentário registrado, no seguinte modelo: dd/mm/yyyy - dd/mm/yyyy"
  "indices_bom_comportamento": [
      "indice de bom comportamento 1",
      "indice de bom comportamento 2",
      "indice de bom comportamento 3"
  ],
  "indices_mau_comportamento": [
      "indice de mau comportamento 1",
      "indice de mau comportamento 2",
      "indice de mau comportamento 3"
  ],
  "atividades_ressocializacao": {
      "leitura": {
          "livros_lidos": "Total de livros lidos",
          "trecho": "Trecho do comentário que comprove que o detento leu tal quantidade de livros"
      },
      "estudo": {
          "horas_estudo": "Total de horas de frequência escolar",
          "trecho": "Trecho do comentário que comprove que o detento frequentou certa quantidade de horas de frequência escolar"
      },
      "trabalho": {
          "dias_trabalhados": "Total de dias em que o detento trabalhou",
          "trecho": "Trecho do comentário que comprove que o detento trabalhou certa quantidade de dias"
      }
  }
}

Para preencher os valores, utilize como base o seguinte comentário:""" + str(comentario)

  comments = ask_to_ai(prompt, context_type = "comentario")
  return comments


def generate_detainee_report(comments):
  # Generate the detainee report based on the prison guard comments
  report = ask_to_ai(context_type = "relatorio", prompt = str(comments))
  return report


# Take the report in markdown and convert to an PDF file
# The created PDF's are saved in the Reports folder
# convert_to_pdf(final_report)

def convert_to_pdf(markdown_content):
    current_date_time = datetime.datetime.now()
    formatted_date_time = current_date_time.strftime("%Y_%m_%d %H_%M_%S")
    print("Formatted date and time:", formatted_date_time)

    output_file = "../Reports/" + f"Detainee_report_{formatted_date_time}.pdf"
    pypandoc.convert_text(markdown_content, "pdf", format="md", outputfile=output_file, extra_args=['-V', 'graphviz'], encoding='utf-8')



# Load the enviroment variables
enviroment = dotenv_values(".env")

# Function that creates requests to chat gpt, passing the prompt
def ask_to_ai(prompt, context_type = "", context = ""):

    if context_type.strip().lower() == "comentario":
        context = """
Você vai receber um comentário de um agente penitenciário, informando ações positivas e/ou negativas de um detento, você deve elencar os índices de bom comportamento e mau comportamento, e as seguintes participações em atividades de ressocialização:

Atividade 1: Leitura de livros e criação de relatórios
Remição de pena: Cada obra lida corresponderá à remição de quatro dias de pena, limitando-se, no prazo de 12 meses, a até 12 obras efetivamente lidas e avaliadas, assegurando-se a possibilidade de remir até 48 dias a cada período de 12 meses.

Atividade 2: Estudos
Remição de pena: 1 dia de pena a cada 12 horas de frequência escolar (atividade de ensino fundamental, médio, inclusive profissionalizante, ou superior, ou ainda de requalificação profissional) divididas, no mínimo, em três dias

Atividade 3: Trabalho
Remição de pena: 1 dia de sua pena a cada três dias trabalhados (mínimo de seis e máximo de oito horas trabalhadas por dia)

Preciso que você me retorne um JSON com suas respostas, separados da seguinte maneira:

{
    "comentario": "comentário passado",
    "data_comentario": "data do comentario no modelo dd/mm/yyyy",
    "indices_bom_comportamento": [
        "indice de bom comportamento 1",
        "indice de bom comportamento 2",
        "indice de bom comportamento 3"
    ],
    "indices_mau_comportamento": [
        "indice de mau comportamento 1",
        "indice de mau comportamento 2",
        "indice de mau comportamento 3"
    ],
    "atividades_ressocializacao": {
        "leitura": {
            "livros_lidos": "Total de livros lidos",
            "trecho": "Trecho do comentário que comprove que o detento leu tal quantidade de livros"
        },
        "estudo": {
            "horas_estudo": "Total de horas de frequência escolar",
            "trecho": "Trecho do comentário que comprove que o detento frequentou certa quantidade de horas de frequência escolar"
        },
        "trabalho": {
            "dias_trabalhados": "Total de dias em que o detento trabalhou",
            "trecho": "Trecho do comentário que comprove que o detento trabalhou certa quantidade de dias"
        }
    }
}

Por favor, me retorne única e exclusivamente o JSON, e mais nada.
Preciso que você faça o comentário de 4 comentários diferentes e retorne os 4 comentários dentro de um JSON maior, por favor faça 2 comentários positivos e 2 comentários negativos.
"""
    elif context_type.strip().lower() == "relatorio":
        context = """Você vai receber diversos comentários feitos por agentes penitenciários indicando ações de um detento ao longo do tempo. Você deve analisar cada um dos comentários e gerar um relatório com as informações apresentadas. Separe e cite todos os comportamentos ruins e comportamentos bons do detento, separe o total de ações de ressocialização que ele fez (leituras, estudos e trabalho).
        O relatório deve ter 4 seções, sendo elas:
        1 - Lista de comportamentos ruins, com a data do comentário referente
        2 - Lista de recorrências de comportamentos ruins, ou seja, liste todos os comportamentos ruins que são recorrentes e acontecem mais de uma vez, caso o comportamento tenha a frequência de apenas uma vez, não coloque nesta lista
        3 - Lista de comportamentos bons, com a data do comentário referente
        4 - Lista de recorrências de comportamentos bons, ou seja, liste todos os comportamentos bons que são recorrentes e acontecem mais de uma vez, caso o comportamento tenha a frequência de apenas uma vez, não coloque nesta lista
        5 - Ações de ressocialização
        
        OBS: As seções 1, 2, 3 e 4 devem vir em forma de tabela markdown"""

    client = OpenAI(
        api_key = enviroment["API_KEY"],
        base_url = "https://api.openai.com/v1",
        default_headers={
            "Authorization": f"Bearer {enviroment['API_KEY']}"
        }
    )

    chat = client.chat.completions.create(
        messages = [
            {
                "role": "system",
                "content": context,
            },
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="gpt-4-turbo"
    )

    return chat.choices[0].message.content
