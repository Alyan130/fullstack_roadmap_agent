from dotenv import load_dotenv
import os
from smtplib import SMTP
from email.message import EmailMessage

load_dotenv()

APP_PASSWORD = os.getenv("APP_PASSWORD")
MY_EMAIL = os.getenv("EMAIL")

def email_sending(pdf_bytes:bytes,to_email:str):
    msg = EmailMessage()
    msg["From"] = MY_EMAIL
    msg["To"] = to_email
    msg["Subject"] = "Learning Roadmap Summary"
    msg.set_content("Here's your roadmap summmary:")
    
    msg.add_attachment(
        pdf_bytes,
        maintype='application',
        subtype='pdf',
        filename='roadmap_summary.pdf'
    )


    with SMTP("smtp.gmail.com",587) as server:
      try: 
        server.starttls()
        server.login(MY_EMAIL,APP_PASSWORD)
        server.send_message(msg)
      except Exception as e:
         print("Error sending email.")
         

         