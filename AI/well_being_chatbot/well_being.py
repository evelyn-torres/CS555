# well_being_convo.py
import random
from textblob import TextBlob


class AIConvo:
    def __init__(self):
        self.responses = []  # Stores the conversation history

    def analyze_response(self, response):
        """
        Analyze the sentiment of the user's response.
        Returns a reply based on the sentiment polarity.
        """
        analysis = TextBlob(response)
        sentiment = analysis.sentiment.polarity  # Polarity score: -1.0 (negative) to 1.0 (positive)
        print(f"Sentiment score: {sentiment}")  # Debugging: Log sentiment score

        if sentiment > 0.5:
            return "I'm glad to hear that! What's something positive that happened today?"
        elif sentiment > 0:  # Mildly positive sentiment
            return "That sounds good. Did anything nice happen recently?"
        elif sentiment < 0:
            return "I'm sorry to hear that. Do you want to talk about it?"
        else:
            return "That’s interesting. Can you tell me more?"

    def log_response(self, response):
        """
        Log the user's response, analyze its sentiment, and generate a reply.
        Ensure sentiment reply is prioritized and follow-up questions enhance the response.
        """
        self.responses.append(response)  # Log the user's response

        # Handle empty or nonsensical input
        if not response.strip():
            return "I didn't quite catch that. Can you try rephrasing?"

        # Analyze sentiment and generate sentiment-based reply
        sentiment_reply = self.analyze_response(response)

        # Generate a follow-up question if conditions are met
        follow_up_question = ""
        if len(self.responses) <= 3 or any(
            word in response.lower() for word in ["stress", "busy", "overwhelmed"]
        ):
            follow_up_question = f" {self.ask_other_questions()}"

        return sentiment_reply + follow_up_question

   
    def ask_other_questions(self):
        """
        Asks follow-up questions based on the conversation progress.
        Dynamically adjusts questions based on sentiment or history.
        """
        if len(self.responses) == 1:  # After the first user response
            return "Have you eaten anything good today?"
        elif len(self.responses) == 2:  # After the second user response
            return "Did you manage to go for a walk today?"
        elif any(word in self.responses[-1].lower() for word in ["stress", "busy", "overwhelmed"]):
            return "It sounds like you’ve had a lot on your plate. Would you like to discuss it further?"
        else:  # Default fallback
            return "Is there anything else you'd like to share?"

    def get_responses(self):
        """
        Retrieve the logged conversation history.
        """
        return self.responses