#well_being_convo
import random
from textblob import TextBlob

class AIConvo:
    def __init__(self):
        self.responses=[]
    def analyze_response(self, response):
        analysis = TextBlob(response)
        sentiment = analysis.sentiment.polarity
        if sentiment > 0.5:
            return "I'm glad to hear that! What's something positive that happened today?"
        elif sentiment < 0:
            return "I'm sorry to hear that. Do you want to talk about it?"
        else:
            return "That’s interesting. Can you tell me more?"

    def ask_question1(self):
        return "How are you feeling today?"
    
    def ask_other_questions(self):
        questions =[
            "Did you sleep well last night?",
            "Have you eaten anything good today?",
            "Did you manage to go for a walk today?",
            "How’s your energy level today?"
        ]
        return random.choice(questions)
    
    def log_response(self, response):
        self.responses.append(response)
        return True 
    def get_responses(self):
        return self.responses
    