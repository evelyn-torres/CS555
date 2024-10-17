import datetime

class Reminder:
    def __init__(self):
        self.health_log = []
    
    def reminde_user(self):
        return "It's time for your daily health check. Did you take your medication?"
    
    def log_response(self, response):
        timestamp = datetime.datetime.now()
        if response.lower() in ['yes', 'i did', 'yup']:
            self.health_log.append({"date": timestamp, "status": "Medication taken"})
            return True
        
        elif response.lower() in ['no', 'not yet', 'i haven\'t']:
            self.health_log.append({"date": timestamp, "status": "Medication not taken"})
            return False
        
        else:
            raise ValueError("Invalid Response")