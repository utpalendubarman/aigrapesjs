import re
from openai import OpenAI


def extract_root_theme(html: str) -> str:
    match = re.search(r'<style.*?>(.*?)</style>', html, re.DOTALL | re.IGNORECASE)
    css= match.group(1).strip() if match else ''

    color_format="""```json {
        "primary-color": "",
        "secondary-color": "",
        "accent-color": "", 
        "dark-color": "",     
        "light-color":"",
        "overlay-color":"",
        "text-shadow":""}```
    """

    client = OpenAI(api_key="sk-b98b8a0162a84093995d2aed67d1186b", base_url="https://api.deepseek.com")
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=[
            {"role": "system", "content": "You are a color detector and theme schema maker, who only responds in json"},
            {"role": "user", "content": f"Analyse the css ```css {css}``` and fill value of ```json {color_format}``` extracting colors from the css, only respond in json following same provided format and keys"},
        ],
        stream=False
    )

    config=response.choices[0].message.content
    config=config.replace("```json", '')
    config=config.replace("```", '')
    print("Config is:")
    print(config)
    return config