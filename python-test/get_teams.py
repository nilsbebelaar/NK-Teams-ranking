import requests
from bs4 import BeautifulSoup
import json

HEADERS = {
    "Sec-Ch-Ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": "Windows",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
}

def main():
    teams = get_teams(2024)
    print(json.dumps(teams))


def get_teams(year):
    teams = {}
    s = requests.session()

    for gender in ['Mannen', 'Vrouwen']:
        teams[gender] = []

        url = 'https://www.atletiek.nu/competitie/' + str(year) + '/competitiestand/' + gender + '%20NK%20Teams/'
        print(url)
        page = s.get(url=url, headers=HEADERS)

        soup = BeautifulSoup(page.content, features="html.parser")

        # find the results table, loop through each row
        for row in soup.select_one("table#competitieteams1>tbody").find_all("tr"):
            # save each column
            cols = []
            for col in row.find_all('td'):
                cols.append(col.text.rstrip("\n").strip())

            # save data to teams
            teams[gender].append({
                'team': cols[1],
                'rank': cols[3],
                'points': cols[5]
            })
    return teams


if __name__ == '__main__':
    main()
