import random
from datetime import datetime, timedelta

class UserProfile:
    def __init__(self, mobility, last_suggestion_date=None):
        self.mobility = mobility
        self.last_suggestion_date = last_suggestion_date or datetime.now() - timedelta(days=1)

class ActivitySuggestion:
    def __init__(self, user_profile):
        self.user_profile = user_profile
        self.suggestion_history = {"physical": None, "mental": None, "nutrition": None}
        self.mobility_options = {
            "walking": ["Take a stroll around the park", "Go for a brisk walk"],
            "cane": ["Go for a walk with your cane", "Try light stretching exercises"],
            "walker": ["Take a walk with your walker around the neighborhood", "Do seated leg raises"],
            "wheelchair": ["Do some upper body stretches", "Try wheelchair exercises"]
        }
        self.mental_activities = ["Call a friend or family member", "Do a puzzle or brain game", 
                                  "Watch a favorite movie or TV show", "Write in a journal"]
        self.social_activities = ["Join an online class", "Attend a community event", 
                                  "Participate in a book club or discussion group"]
        self.food_suggestions = ["Add more leafy greens to your meals", "Try a smoothie with fruits and vegetables",
                                 "Eat a handful of nuts for a snack", "Include whole grains in your diet"]
        
    def get_suggestion(self, category):
        if category == "physical":
            return self._get_physical_suggestion()
        elif category == "mental":
            return self._get_mental_suggestion()
        elif category == "nutrition":
            return self._get_food_suggestion()
        else:
            return "Category not recognized. Please choose from physical, mental, or nutrition."

    def provide_unprompted_suggestion(self):
        days_since_last = (datetime.now() - self.user_profile.last_suggestion_date).days
        if days_since_last >= 1:
            category = random.choice(["physical", "mental", "nutrition"])
            suggestion = self.get_suggestion(category)
            self.user_profile.last_suggestion_date = datetime.now()
            return f"It's been a while! Here's a {category} suggestion: {suggestion}"
        return None

    def _get_physical_suggestion(self):
        mobility_level = self.user_profile.mobility
        suggestions = self.mobility_options.get(mobility_level, ["Try some light stretching"])
        suggestion = self._select_unique_suggestion(suggestions, "physical")
        return suggestion

    def _get_mental_suggestion(self):
        suggestion = self._select_unique_suggestion(self.mental_activities, "mental")
        return suggestion

    def _get_food_suggestion(self):
        suggestion = self._select_unique_suggestion(self.food_suggestions, "nutrition")
        return suggestion

    def _select_unique_suggestion(self, suggestions_list, category):
        suggestion = random.choice(suggestions_list)
        while suggestion == self.suggestion_history[category]:
            suggestion = random.choice(suggestions_list)
        self.suggestion_history[category] = suggestion
        return suggestion