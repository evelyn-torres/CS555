
# Vitalink Voice Assistant

**Team Members:**  
- Elizabeth Bruski  
- Ryan Camburn  
- Shannon McGratty  
- Nicholas Mohamed  
- Brayan Paredes  
- Evelyn Torres  

**Scrum Master:** Shannon McGratty

**Roles:**  
- **Frontend Developers:** Elizabeth Bruski  
- **Backend Developers:** Nicholas Mohamed, Brayan Paredes  
- **AI Developers:** Ryan Camburn  
- **Full-Stack Developer:** Evelyn Torres  

---

## Project Overview

The **Viitalink Voice Assistant** is a voice-enabled AI application designed to improve the interaction between seniors and healthcare technology. This app focuses on supporting senior users as they manage their medical needs by using voice recognition to capture, process, and log their responses. The assistant provides feedback both audibly and visually, creating a user-friendly experience for seniors.

Key features include:  
- **Multi-language support** for English, Chinese, Spanish, and Korean, tailored to meet the needs of our diverse senior user base.  
- **Casual conversational style** for health assessments, ensuring users don’t feel like they’re participating in a formal medical evaluation.  
- **Data collection** through natural conversations, providing insights into physical and mental health.  
- **Smart reminders** for medications and doctor appointments, with future improvements aimed at reducing manual data input.

---

## Branch Ticket Label Structure

- **Label Format:** `Type of update/Ticket Number-concise description`
  - Types of updates: `feat` or `bug`
  
**Example:**  
`feat/SCRUM1-hello-world-implementation`

---

## Make sure to have these downloaded 
 - **Make sure to  run these installed:**
  `Inorder to use Whisper by OpenAI you have to have FFMPREG installed, the link to install is here`
    - https://ffmpeg.org
  `To make sure you have ffmpeg installed run this:`
    - ffmpeg -version
  `If FFMPEG is installed now you can run this`
  - pip install openai-whisper

## To Run Project
  - cd FrontEnd/frontEnd
  - node server.js
  - npm run dev

  `In a different terminal run these:`
  - cd AI/well_being_chatbot
  - python app.py
