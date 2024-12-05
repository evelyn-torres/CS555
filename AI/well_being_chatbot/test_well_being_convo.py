import unittest



from well_being import AIConvo
ai_convo = AIConvo()
print("initialized AICOnvo successfulyyy")

#AI\AI\well_being_chatbot\well_being.py

class TestAIConvo(unittest.TestCase):
    def setUp(self):
        self.ai = AIConvo()

    def test_ask_question(self):
        question = self.ai.ask_question1()
        self.assertEqual(question, "How are you feeling today?")
    def test_log_response(self):
        response = "I am feeling fine"
        self.ai.log_response(response)
        self.assertIn(response, self.ai.get_responses())
   
    def test_other_questions(self):
        valid_questions =[
            "Did you sleep well last night?",
            "Have you eaten anything good today?",
            "Did you manage to go for a walk today?",
            "How’s your energy level today?"
        ]
        question = self.ai.ask_other_questions()
        self.assertIn(question,valid_questions)

    def test_empty_response(self):
        response = ""
        self.ai.log_response(response)
        self.assertIn(response, self.ai.get_responses())

if __name__ == "__main__":
    unittest.main()