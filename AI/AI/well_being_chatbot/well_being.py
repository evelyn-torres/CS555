#well_being_convo
import random

class AIConvo:
    def __init__(self):
        self.responses=[]
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
    