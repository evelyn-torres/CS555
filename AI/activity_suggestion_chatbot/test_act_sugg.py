import unittest
from datetime import datetime, timedelta
from activitySuggestion import UserProfile, ActivitySuggestion

class TestActivitySuggestion(unittest.TestCase):
    def setUp(self):
        # Initialize user profiles with different mobility levels
        self.walking_user = UserProfile(mobility="walking")
        self.cane_user = UserProfile(mobility="cane")
        self.walker_user = UserProfile(mobility="walker")
        self.wheelchair_user = UserProfile(mobility="wheelchair")
        
        # Initialize ActivitySuggestion instances for each user
        self.walking_assistant = ActivitySuggestion(self.walking_user)
        self.cane_assistant = ActivitySuggestion(self.cane_user)
        self.walker_assistant = ActivitySuggestion(self.walker_user)
        self.wheelchair_assistant = ActivitySuggestion(self.wheelchair_user)

    def test_physical_suggestion_varies_with_mobility(self):
        # Check that each mobility level provides relevant suggestions
        self.assertIn(self.walking_assistant.get_suggestion("physical"), 
                      self.walking_assistant.mobility_options["walking"])
        self.assertIn(self.cane_assistant.get_suggestion("physical"), 
                      self.cane_assistant.mobility_options["cane"])
        self.assertIn(self.walker_assistant.get_suggestion("physical"), 
                      self.walker_assistant.mobility_options["walker"])
        self.assertIn(self.wheelchair_assistant.get_suggestion("physical"), 
                      self.wheelchair_assistant.mobility_options["wheelchair"])

    def test_no_consecutive_repeated_suggestions(self):
        # Test that consecutive suggestions are not repeated for each category
        categories = ["physical", "mental", "nutrition"]
        
        for category in categories:
            suggestion1 = self.walking_assistant.get_suggestion(category)
            suggestion2 = self.walking_assistant.get_suggestion(category)
            self.assertNotEqual(suggestion1, suggestion2, f"{category} suggestions should not repeat consecutively")

    def test_provide_unprompted_suggestion_after_day_passed(self):
        # Set last suggestion date to 2 days ago to trigger an unprompted suggestion
        self.walking_user.last_suggestion_date = datetime.now() - timedelta(days=2)
        
        suggestion = self.walking_assistant.provide_unprompted_suggestion()
        
        # Check that a suggestion is provided
        self.assertIsNotNone(suggestion)
        self.assertIn("Here's a", suggestion)
        
    def test_no_unprompted_suggestion_within_same_day(self):
        # Set last suggestion date to today, so no unprompted suggestion should occur
        self.walking_user.last_suggestion_date = datetime.now()
        
        suggestion = self.walking_assistant.provide_unprompted_suggestion()
        
        # Check that no suggestion is provided
        self.assertIsNone(suggestion)

    def test_category_suggestions(self):
        # Test if specific category suggestions can be retrieved
        physical_suggestion = self.walking_assistant.get_suggestion("physical")
        mental_suggestion = self.walking_assistant.get_suggestion("mental")
        food_suggestion = self.walking_assistant.get_suggestion("nutrition")
        
        self.assertIn(physical_suggestion, self.walking_assistant.mobility_options["walking"])
        self.assertIn(mental_suggestion, self.walking_assistant.mental_activities)
        self.assertIn(food_suggestion, self.walking_assistant.food_suggestions)

if __name__ == "__main__":
    unittest.main()