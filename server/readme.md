# API links examples.
## POST.
#
> /new_deck
### Input:
```sh
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6Im9wdGltdXMiLCJsb2dpbiI6Im9wdGltdXMifQ.Kx-fai386FTdVzc2T2-ed8yDIlLO8H5r_rm3MsvIMUw",
    "name": "Lol Kek!!!",
    "isPrivate": false,
    "description":"тут чисто про реп",
    "mainLang":"eng",
    "secondLang":"rus",
    "price":0,
    "cards":[
{
    "main_word":"rap",
    "answer":"реп",
    "type":"default"
},
{
    "main_word":"loop",
    "answer":"мелодия",
    "type":"default"
},
{
    "main_word":"flow",
    "answer":"техника",
    "type":"default"
}
]
}
```
### Output:
```sh
{ "error":false }
```
> /change_deck
### Input:
```sh
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImFkbWluIiwibG9naW4iOiJhZG1pbiJ9.0A_h5-_WN0OeoT1eWQoeIWZR2_wACsfxmWSRu_WBOGo",
    "idDeck":1,
    "changes": [
{
    "type": "CHANGE_DECK",
    "payload": {
    "name": "isPrivate",
    "value": 1
}
},
{
    "type": "CHANGE_DECK",
    "payload": {
    "name": "name",
    "value": "RAP"
}
},
{
    "type": "CHANGE_CARD",
    "payload": {
    "name": "description",
    "value": "",
    "id": 3
}
},
{
    "type": "NEW_CARD",
    "payload": {
    "main_word" :"guap",
    "answer" :"богатство",
    "type" :"default",
    "description": null
}
},
{
    "type": "DELETE_CARD",
    "payload": {
    "id": 2
}
}
]
}
```
### Output:
```sh
{ "error": false }
```
> /like
### Input:
```sh
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImFkbWluIiwibG9naW4iOiJhZG1pbiJ9.0A_h5-_WN0OeoT1eWQoeIWZR2_wACsfxmWSRu_WBOGo",
    "deckId":1
}
```
### Output:
```sh
{
    "error": false,
    "status": true
}
```
### Input:
> /registration
```sh
{
    "name":"nafanya",
    "login":"nafanya",
    "password":"nafanyushka"
}
```
### Output:
```sh
{
    "balance": 0,
    "refer": null,
    "name": "nafanya",
    "is_checked": false,
    "id": 2,
    "error": false,
    "login": "nafanya",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImpycnRqcnJ0anJydGpycnRqcnJ0anJydGpycnRqcnJ0anJydCIsImxvZ2luIjoibmFmYW55YSJ9.uJKb3CKjVVpURmoEsYhBT06KfXLhmTL1VZD_k4whLNQ"
}
```
>/login
### Input:
```sh
{
	"login":"nafanya",
	"password":"nafanyushka"
}
```
### Output:
```sh
{
    "balance": 0,
    "refer": null,
    "name": "nafanya",
    "is_checked": false,
    "id": 2,
    "error": false,
    "login": "nafanya",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImpycnRqcnJ0anJydGpycnRqcnJ0anJydGpycnRqcnJ0anJydCIsImxvZ2luIjoibmFmYW55YSJ9.uJKb3CKjVVpURmoEsYhBT06KfXLhmTL1VZD_k4whLNQ"
}
```

## GET.
>/get_decks
### Input:
```sh
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImpycnRqcnJ0anJydGpycnRqcnJ0anJydGpycnRqcnJ0anJydCIsImxvZ2luIjoibmFmYW55YSJ9.uJKb3CKjVVpURmoEsYhBT06KfXLhmTL1VZD_k4whLNQ"
}
```
### Output:
```sh
{
    "decks": [
        {
            "is_private": 0,
            "author_login": "nafanya",
            "cards": [],
            "owner_login": "nafanya",
            "description": "тут чисто про реп",
            "count_repetitions": 0,
            "liked": false,
            "main_language": "eng",
            "second_language": "rus",
            "price": 0,
            "count_words": 0,
            "name": "Nafanya's deck",
            "id": 13,
            "likes": 0
        },
        {
            "is_private": 0,
            "author_login": "nafanya",
            "cards": [
                {
                    "answer": "реп",
                    "description": null,
                    "id": 36,
                    "main_word": "rap",
                    "type": "default"
                }
            ],
            "owner_login": "nafanya",
            "description": "тут чисто про реп",
            "count_repetitions": 0,
            "liked": false,
            "main_language": "eng",
            "second_language": "rus",
            "price": 0,
            "count_words": 1,
            "name": "Another",
            "id": 14,
            "likes": 0
        }
    ],
    "error": false
}
```

>/auth
### Input:
```sh
{ 
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImpycnRqcnJ0anJydGpycnRqcnJ0anJydGpycnRqcnJ0anJydCIsImxvZ2luIjoibmFmYW55YSJ9.uJKb3CKjVVpURmoEsYhBT06KfXLhmTL1VZD_k4whLNQ"
}
```
### Output:
```sh
{
    "data": {
        "balance": 0,
        "refer": null,
        "name": "nafanya",
        "is_checked": false,
        "id": 2,
        "login": "nafanya",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImpycnRqcnJ0anJydGpycnRqcnJ0anJydGpycnRqcnJ0anJydCIsImxvZ2luIjoibmFmYW55YSJ9.uJKb3CKjVVpURmoEsYhBT06KfXLhmTL1VZD_k4whLNQ"
    },
    "error": false
}
```
