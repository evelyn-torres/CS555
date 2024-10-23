import unittest
from reminder import Reminder

class TestReminder(unittest.TestCase):
    def setUp(self):
        self.reminder = Reminder()

    def test_reminde_user(self):
        expected = "It's time for your daily health check. Did you take your medication?"
        self.assertEqual(self.reminder.reminde_user(), expected)

    def test_log_response_yes(self):
        response = "yes"
        result = self.reminder.log_response(response)
        self.assertTrue(result)
        self.assertEqual(len(self.reminder.health_log), 1)
        self.assertEqual(self.reminder.health_log[0]["status"], "Medication taken")

    def test_log_response_no(self):
        response = "no"
        result = self.reminder.log_response(response)
        self.assertFalse(result)
        self.assertEqual(len(self.reminder.health_log), 1)
        self.assertEqual(self.reminder.health_log[0]["status"], "Medication not taken")

    def test_log_response_invalid(self):
        with self.assertRaises(ValueError):
            self.reminder.log_response("invalid")

if __name__ == '__main__':
    unittest.main()