import unittest
import os
import tempfile
from unittest.mock import patch, MagicMock
from bs4 import BeautifulSoup
from webscraper import scrape_article, is_allowed

class TestWebMDScraper(unittest.TestCase):

    @patch('requests.get')
    def test_scrape_article_creates_txt_file(self, mock_get):
        # Simulate a successful HTTP response
        mock_response = MagicMock()
        mock_response.raise_for_status = MagicMock()
        mock_response.text = '''
        <html>
            <head><title>Test Article</title></head>
            <body>
                <h1>Test Article Title</h1>
                <p>This is a paragraph in the test article.</p>
                <p>Another paragraph.</p>
            </body>
        </html>
        '''
        mock_get.return_value = mock_response

        # Set up temporary directory to store .txt files for testing
        with tempfile.TemporaryDirectory() as temp_dir:
            # Call the scrape_article function with a test URL and save_dir as temp_dir
            test_url = 'https://www.webmd.com/healthy-aging/test-article'
            scrape_article(test_url, save_dir=temp_dir)

            # Construct expected file path in the temporary directory
            file_path = os.path.join(temp_dir, 'Test_Article_Title.txt')
            
            # Check that the .txt file was created
            self.assertTrue(os.path.isfile(file_path), "The .txt file for the article was not created.")
    def test_is_allowed(self):
        # Define test cases for allowed and disallowed URLs
        allowed_url = "https://www.webmd.com/healthy-aging/senior-health"
        disallowed_url = "https://www.webmd.com/search/search_results/"

        # Test that allowed URLs are detected correctly
        self.assertTrue(is_allowed(allowed_url), "Allowed URL was incorrectly disallowed.")
        # Test that disallowed URLs are rejected correctly
        self.assertFalse(is_allowed(disallowed_url), "Disallowed URL was incorrectly allowed.")

if __name__ == '__main__':
    unittest.main()
