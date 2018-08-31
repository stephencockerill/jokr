import argparse
import requests
import time

SOURCE_URL = 'https://icanhazdadjoke.com'
DEST_URL = 'http://localhost:8000'
MAX_JOKES = 100
WAIT = 5


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('username', help='User username')
    parser.add_argument('email', help='User email')
    parser.add_argument('password', help='User password')
    args = parser.parse_args()

    token = get_token(args.username, args.email, args.password)

    page = 6
    headers = {'Accept': 'application/json'}
    num_jokes = 0
    while num_jokes < MAX_JOKES:
        response = requests.get(
            '%s/search?page=%s' % (SOURCE_URL, page),
            headers=headers,
        )
        if response.status_code != 200:
            response.raise_for_status()
        data = response.json()
        page = data.get('next_page')
        jokes = data.get('results')
        for joke in jokes:
            post_joke(joke.get('joke'), token)
            num_jokes += 1
            print('%s:' % num_jokes, joke.get('joke'))
        time.sleep(WAIT)

def get_token(username, email, password):
    data = {'username': username, 'email': email, 'password': password}
    response = requests.post('%s/auth/login/' % DEST_URL, data=data)
    if response.status_code != 200:
        data = {
            'username': username,
            'email': email,
            'password1': password,
            'password2': password,
        }
        response = requests.post('%s/auth/registration/' % DEST_URL, data=data)
        if response.status_code != 201:
            print(response.content)
            response.raise_for_status()
        print('created user for %s' % email)
    print('logged in as %s' % email)
    return response.json().get('key')

def post_joke(text_content, token):
    data = {'text_content': text_content}
    headers = {'Authorization': 'Token %s' % token}
    response = requests.post('%s/jokes/' % DEST_URL, data=data, headers=headers)
    if response.status_code != 201:
        print(response.content)
        response.raise_for_status()
    return True

if __name__=='__main__':
    main()
