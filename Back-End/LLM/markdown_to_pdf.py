import pypandoc
import datetime
import os

async def convert_to_pdf(markdown_content: str, file_name = ""):
    if file_name.strip() == "":
        current_date_time = datetime.datetime.now()
        formatted_date_time = current_date_time.strftime("%Y_%m_%d %H_%M_%S")
        file_name = f"Detainee_report_{formatted_date_time}"

    # output_file = "../Reports/" + file_name
    pypandoc.convert_text(markdown_content, "pdf", format="md", outputfile=file_name, extra_args=['-V', 'graphviz'], encoding='utf-8')
