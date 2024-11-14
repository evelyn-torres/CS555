import os
import requests
from bs4 import BeautifulSoup
import time
import random
from fake_useragent import UserAgent

# Set up user-agent rotation
ua = UserAgent()
base_url = 'https://www.webmd.com'

# Headers without proxies
headers = {'User-Agent': ua.random}

# Define disallowed paths from robots.txt and unrelated paths to skip
disallowed_paths = [
    "/search/search_results/", "/drugs/ReportAbuse.aspx", "/cm/", "/Share.aspx", "/mm/", "/kapi/", "/click",
    "/drugs/2/search", "/sponsored/", "/api/", "/search/2/api/", "/webmd_static_vue/", "/aim/",
    "/6-tools-for-managing-your-medications", "/attr-cm-warning-signs", "/bipolar-disorder/bipolar-depression-management",
    "/bipolar-disorder/video/bipolar-fatherhood", "/bipolar-disorder/video/bipolar-toolbox", "/bluechew-review",
    "/brain/treating-gmg-video", "/brain/video/treating-gmg-video", "/breast-cancer/bc-treatment-21/provider-select",
    "/cbd/about-cbd", "/cbd/best-cbd-gummies-for-anxiety", "/cbd/best-cbd-oil-for-anxiety", "/cbd/best-cbd-oil-for-pain",
    "/cbd/best-cbd-oil-of-2023", "/cbd/best-full-spectrum-cbd-oils", "/cbd/best-gummies-of-2023", "/cbd/cbd-101-concentrated-cannabidiol",
    "/cbd/cbd-for-dogs", "/cbd/cbd-for-sleep", "/cbd/cbdfx-review", "/cbd/cbdistillery-review", "/cbd/koi-cbd-review",
    "/chemo-combo", "/cholesterol-management/high-cholesterol-treatment", "/choose-cancer-care", "/diagnosed-with-glioblastoma",
    "/dna", "/dna/meet-your-match", "/dna/meet-your-match-acne-prone-skin-routine", "/dna/meet-your-match-combination-to-oily-skin-routine",
    "/dna/meet-your-match-normal-to-dry-skin-routine", "/dupuytrens/default.htm", "/dupuytrens/treatment",
    "/dupuytrens/what-to-expect", "/ear-health-support/balance", "/ear-health-support/daily-care", "/ear-health-support/default.htm",
    "/ear-health-support/hearing-loss", "/epilepsy-seizures-rapid-rescue-single-treatment", "/friends-through-gvhd",
    "/gum-disease-treatment", "/hair-transplant-services", "/hims-hard-mints", "/how-caregivers-helped-loved-ones-with-attr-cm",
    "/knee-osteoarthritis-clinical-trial", "/lung/copd/treat-copd-21/copd-new-treatment", "/mental-health-genetic-testing",
    "/mother-to-baby-observational-research-studies", "/neuromyelitis-optica-spectrum-disorder-nmosd-treatment",
    "/nvaf-stroke-risk-treatment", "/oral-and-maxillofacial-surgeon", "/parenting/cpp-21/what-is-cpp",
    "/peyronies-treatment-option/talk-to-doctor", "/peyronies-treatment-option/treatment-option",
    "/prevent-bee-sting-allergic-reactions", "/psoriasis-plaques-biologic-medicines-targeted-therapies",
    "/robotic-assisted-surgery", "/straightline-cml", "/telehealth-for-women", "/treating-sleep-apnea",
    "/understanding-c3g", "/understanding-melanoma", "/video/mucinex-md", "/world-class-heart-care",
    "/dnastudio/default.htm", "/dnastudio/contact", "/dnastudio/about", "/dnastudio/our-work",
    "/multiple-sclerosis/rrms-20/monthly-rms-treatment", "/dna/the-journey-starts-now", "/ohcm",
    "/liver-transplant-doctor-interview", "/chronic-rare-kidney-disease-iga-nephropathy"
]

# Define allowed paths with focus on senior-related content
allowed_topics = ["/healthy-aging", "/senior-health", "/nutrition-fitness-after-70", "/condition"]

def is_allowed(url):
    """Check if the URL is allowed and focuses on senior-related content."""
    if any(disallowed_path in url for disallowed_path in disallowed_paths):
        return False
    return any(topic in url for topic in allowed_topics)

def scrape_article(url, save_dir='WebMD_Articles'):
    """Scrape content from an allowed article URL."""
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        title = soup.find('h1').get_text(strip=True) if soup.find('h1') else 'Untitled'
        content = '\n'.join([p.get_text(strip=True) for p in soup.select('p')])

        # Save the article content to a .txt file
        if content:
            os.makedirs(save_dir, exist_ok=True)
            file_path = os.path.join(save_dir, f'{title[:50].replace(" ", "_")}.txt')
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f"Saved article: {title}")
        else:
            print(f"No content found for URL: {url}")

    except requests.exceptions.Timeout:
        print(f"Timeout occurred for URL: {url}")
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")

def get_all_links(url, visited_urls):
    """Recursively find all allowed links within a given page."""
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find all links on the page
        links = set()
        for link in soup.find_all('a', href=True):
            href = link['href']
            full_url = href if href.startswith('http') else base_url + href
            if full_url not in visited_urls and full_url.startswith(base_url):
                if is_allowed(full_url):
                    links.add(full_url)

        return links
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch links from {url}: {e}")
        return set()

def main():
    # Starting URLs limited to senior-related content
    start_urls = [
        'https://www.webmd.com/healthy-aging/',
        'https://www.webmd.com/nutrition-fitness-after-70/',
        'https://www.webmd.com/condition/senior-health/'
    ]

    visited_urls = set()

    # Breadth-first scraping approach
    to_visit = set(start_urls)
    depth_limit = 2
    current_depth = 0

    while to_visit and current_depth < depth_limit:
        next_to_visit = set()

        for current_url in to_visit:
            if current_url in visited_urls:
                continue

            visited_urls.add(current_url)
            print(f"Visiting: {current_url}")

            # Scrape article if it seems like an article page
            if '/article/' in current_url or '/healthy-aging/' in current_url:
                scrape_article(current_url)

            # Discover new links from the current page
            new_links = get_all_links(current_url, visited_urls)
            next_to_visit.update(new_links)

            # Respect polite scraping with a delay
            time.sleep(random.uniform(2, 5))

        to_visit = next_to_visit
        current_depth += 1

if __name__ == "__main__":
    main()

