# API links examples.
## POST.
#
> /new_deck
### Input:
```json
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
```json
{ "error":false }
```
> /change_deck
### Input:
```json
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
```json
{ "error": false }
```
> /like
### Input:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImFkbWluIiwibG9naW4iOiJhZG1pbiJ9.0A_h5-_WN0OeoT1eWQoeIWZR2_wACsfxmWSRu_WBOGo",
    "deckId":1
}
```
### Output:
```json
{
    "error": false,
    "status": true
}
```
### Input:
> /registration
```json
{
    "name":"nafanya",
    "login":"nafanya",
    "password":"nafanyushka"
}
```
### Output:
```json
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
```json
{
	"login":"nafanya",
	"password":"nafanyushka"
}
```
### Output:
```json
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
>/delete_deck
### Input:
```json
{
	"deckId":4,
	"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImFkbWluIiwibG9naW4iOiJhZG1pbiJ9.0A_h5-_WN0OeoT1eWQoeIWZR2_wACsfxmWSRu_WBOGo"
}
```
### Output:
```json
{
    "decks": [
        {
            "is_private": 1,
            "author_login": "admin",
            "cards": [
                {
                    "answer": "реп",
                    "description": null,
                    "id": 1,
                    "main_word": "rap",
                    "type": "default"
                },
                {
                    "answer": "техника",
                    "description": null,
                    "id": 3,
                    "main_word": "flow",
                    "type": "default"
                },
                {
                    "answer": "богатство",
                    "description": null,
                    "id": 22,
                    "main_word": "guap",
                    "type": "default"
                },
                {
                    "answer": "богатство",
                    "description": null,
                    "id": 32,
                    "main_word": "guap",
                    "type": "default"
                }
            ],
            "owner_login": "admin",
            "description": "тут чисто про реп",
            "count_repetitions": 0,
            "liked": true,
            "main_language": "eng",
            "second_language": "rus",
            "price": 0,
            "count_words": 4,
            "name": "RAP",
            "id": 1,
            "likes": 2
        }
    ],
    "error": false
}
```
>/statistic
### Input:
```json
    {
    "deckId":1,
	"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImFkbWluIiwibG9naW4iOiJhZG1pbiJ9.0A_h5-_WN0OeoT1eWQoeIWZR2_wACsfxmWSRu_WBOGo",
	"results":[
		{
			"idCard":1,
			"time":41,
			"answer":true
		},
		{
			"idCard":3,
			"time":57,
			"answer":true
		},
		{
			"idCard":22,
			"time":10,
			"answer":false
		},
		{
			"idCard":32,
			"time":7,
			"answer":true
		}
		]
}
```
### Output:
```sh
{
    "score": 390,
    "error": false
}
```

>/subscribe
### Inout:
```json
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImpycnRqcnJ0anJydGpycnRqcnJ0anJydGpycnRqcnJ0anJydCIsImxvZ2luIjoibmFmYW55YSJ9.uJKb3CKjVVpURmoEsYhBT06KfXLhmTL1VZD_k4whLNQ",
    "deckId":1
}
```
### Output:
```json
{
    "error":false,
    "status":true
}
```

>/copy_deck
### Input:
```json
{ 
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImpycnRqcnJ0anJydGpycnRqcnJ0anJydGpycnRqcnJ0anJydCIsImxvZ2luIjoibmFmYW55YSJ9.uJKb3CKjVVpURmoEsYhBT06KfXLhmTL1VZD_k4whLNQ",
    "deckId":1
}
```
### Output:
```json
{
    "error":false,
    "cloneId":15
}
```
>/avatar
### Input:
```json
{
    "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImFkbWluIiwibG9naW4iOiJhZG1pbiJ9.0A_h5-_WN0OeoT1eWQoeIWZR2_wACsfxmWSRu_WBOGo",
    "file" : "IMAGE HERE IDK HOW TO DO THAT IN JSON"
}
```
### Output:
```json
{
    "error" : false
}
```

## GET.
>/get_deck
### Input:
```json
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImFkbWluIiwibG9naW4iOiJhZG1pbiJ9.0A_h5-_WN0OeoT1eWQoeIWZR2_wACsfxmWSRu_WBOGo",
    "id":1
}
```
### Output:
```json
{
    "deck": {
        "is_private": 0,
        "author_login": "admin",
        "cards": [
            {
                "answer": "реп",
                "description": null,
                "id": 1,
                "main_word": "rap",
                "type": "default"
            },
            {
                "answer": "техника",
                "description": null,
                "id": 3,
                "main_word": "flow",
                "type": "default"
            },
            {
                "answer": "богатство",
                "description": null,
                "id": 22,
                "main_word": "guap",
                "type": "default"
            },
            {
                "answer": "богатство",
                "description": null,
                "id": 32,
                "main_word": "guap",
                "type": "default"
            }
        ],
        "is_owner": true,
        "owner_login": "admin",
        "description": "тут чисто про реп",
        "count_repetitions": 0,
        "liked": true,
        "subscribed": false,
        "main_language": "eng",
        "second_language": "rus",
        "price": 0,
        "count_words": 4,
        "name": "rap",
        "id": 1,
        "likes": 2
    },
    "error": false
}
```

>/get_decks
### Input:
```json
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImpycnRqcnJ0anJydGpycnRqcnJ0anJydGpycnRqcnJ0anJydCIsImxvZ2luIjoibmFmYW55YSJ9.uJKb3CKjVVpURmoEsYhBT06KfXLhmTL1VZD_k4whLNQ"
}
```
### Output:
```json
{
    "subscriptions": [
        {
            "is_private": 0,
            "author_login": "admin",
            "cards": [
                {
                    "answer": "реп",
                    "description": null,
                    "id": 1,
                    "main_word": "rap",
                    "type": "default"
                },
                {
                    "answer": "техника",
                    "description": null,
                    "id": 3,
                    "main_word": "flow",
                    "type": "default"
                },
                {
                    "answer": "богатство",
                    "description": null,
                    "id": 22,
                    "main_word": "guap",
                    "type": "default"
                },
                {
                    "answer": "богатство",
                    "description": null,
                    "id": 32,
                    "main_word": "guap",
                    "type": "default"
                }
            ],
            "is_owner": false,
            "owner_login": "admin",
            "description": "тут чисто про реп",
            "count_repetitions": 0,
            "liked": true,
            "subscribed": true,
            "main_language": "eng",
            "second_language": "rus",
            "price": 0,
            "count_words": 4,
            "name": "rap",
            "id": 1,
            "likes": 2
        }
    ],
    "owned": [
        {
            "is_private": 0,
            "author_login": "nafanya",
            "cards": [],
            "is_owner": true,
            "owner_login": "nafanya",
            "description": "тут чисто про реп",
            "count_repetitions": 0,
            "liked": false,
            "subscribed": false,
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
            "is_owner": true,
            "owner_login": "nafanya",
            "description": "тут чисто про реп",
            "count_repetitions": 0,
            "liked": false,
            "subscribed": false,
            "main_language": "eng",
            "second_language": "rus",
            "price": 0,
            "count_words": 1,
            "name": "Another",
            "id": 14,
            "likes": 0
        },
        {
            "is_private": 1,
            "author_login": "admin",
            "cards": [
                {
                    "answer": "реп",
                    "description": null,
                    "id": 37,
                    "main_word": "rap",
                    "type": "default"
                },
                {
                    "answer": "техника",
                    "description": null,
                    "id": 38,
                    "main_word": "flow",
                    "type": "default"
                },
                {
                    "answer": "богатство",
                    "description": null,
                    "id": 39,
                    "main_word": "guap",
                    "type": "default"
                },
                {
                    "answer": "богатство",
                    "description": null,
                    "id": 40,
                    "main_word": "guap",
                    "type": "default"
                }
            ],
            "is_owner": true,
            "owner_login": "nafanya",
            "description": "тут чисто про реп",
            "count_repetitions": 0,
            "liked": false,
            "subscribed": false,
            "main_language": "eng",
            "second_language": "rus",
            "price": 0,
            "count_words": 4,
            "name": "RAP (clone)",
            "id": 15,
            "likes": 0
        }
    ],
    "error": false
}
```

>/auth
### Input:
```json
{ 
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImpycnRqcnJ0anJydGpycnRqcnJ0anJydGpycnRqcnJ0anJydCIsImxvZ2luIjoibmFmYW55YSJ9.uJKb3CKjVVpURmoEsYhBT06KfXLhmTL1VZD_k4whLNQ"
}
```
### Output:
```json
{
    "data": {
        "balance": 0,
        "refer": null,
        "name": "nafanya",
        "rating": 0,
        "is_checked": false,
        "id": 2,
        "donat_balance": 0,
        "login": "nafanya",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImpycnRqcnJ0anJydGpycnRqcnJ0anJydGpycnRqcnJ0anJydCIsImxvZ2luIjoibmFmYW55YSJ9.uJKb3CKjVVpURmoEsYhBT06KfXLhmTL1VZD_k4whLNQ"
    },
    "error": false
}
```

>/get_all_decks
### Input:
```json
    empty OR token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImpycnRqcnJ0anJydGpycnRqcnJ0anJydGpycnRqcnJ0anJydCIsImxvZ2luIjoibmFmYW55YSJ9.uJKb3CKjVVpURmoEsYhBT06KfXLhmTL1VZD_k4whLNQ"
```
### Output
```json
{
    "decks": [
        {
            "is_private": 0,
            "author_login": "admin",
            "cards": [
                {
                    "answer": "реп",
                    "description": null,
                    "id": 1,
                    "main_word": "rap",
                    "type": "default"
                },
                {
                    "answer": "техника",
                    "description": null,
                    "id": 3,
                    "main_word": "flow",
                    "type": "default"
                },
                {
                    "answer": "богатство",
                    "description": null,
                    "id": 22,
                    "main_word": "guap",
                    "type": "default"
                },
                {
                    "answer": "богатство",
                    "description": null,
                    "id": 32,
                    "main_word": "guap",
                    "type": "default"
                }
            ],
            "is_owner": false,
            "owner_login": "admin",
            "description": "тут чисто про реп",
            "count_repetitions": 0,
            "liked": true,
            "subscribed": true,
            "main_language": "eng",
            "second_language": "rus",
            "price": 0,
            "count_words": 4,
            "name": "rap",
            "id": 1,
            "likes": 2
        },
        {
            "is_private": 0,
            "author_login": "nafanya",
            "cards": [],
            "is_owner": true,
            "owner_login": "nafanya",
            "description": "тут чисто про реп",
            "count_repetitions": 0,
            "liked": false,
            "subscribed": false,
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
            "is_owner": true,
            "owner_login": "nafanya",
            "description": "тут чисто про реп",
            "count_repetitions": 0,
            "liked": false,
            "subscribed": false,
            "main_language": "eng",
            "second_language": "rus",
            "price": 0,
            "count_words": 1,
            "name": "Another",
            "id": 14,
            "likes": 0
        },
        {
            "is_private": 1,
            "author_login": "admin",
            "cards": [
                {
                    "answer": "реп",
                    "description": null,
                    "id": 37,
                    "main_word": "rap",
                    "type": "default"
                },
                {
                    "answer": "техника",
                    "description": null,
                    "id": 38,
                    "main_word": "flow",
                    "type": "default"
                },
                {
                    "answer": "богатство",
                    "description": null,
                    "id": 39,
                    "main_word": "guap",
                    "type": "default"
                },
                {
                    "answer": "богатство",
                    "description": null,
                    "id": 40,
                    "main_word": "guap",
                    "type": "default"
                }
            ],
            "is_owner": true,
            "owner_login": "nafanya",
            "description": "тут чисто про реп",
            "count_repetitions": 0,
            "liked": false,
            "subscribed": false,
            "main_language": "eng",
            "second_language": "rus",
            "price": 0,
            "count_words": 4,
            "name": "RAP (clone)",
            "id": 15,
            "likes": 0
        }
    ],
    "error": false
}
```
>/user
### Input:
```json
{
    (not required) "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImpycnRqcnJ0anJydGpycnRqcnJ0anJydGpycnRqcnJ0anJydCIsImxvZ2luIjoibmFmYW55YSJ9.uJKb3CKjVVpURmoEsYhBT06KfXLhmTL1VZD_k4whLNQ",
    "page" : 2,
    "login":"admin"
}
```
### Output:
```json
{
    "pages": 2,
    "name": "admin",
    "rating": 780,
    "is_checked": false,
    "walkthroughs": 0,
    "average_rating": 0,
    "decks": [
        {
            "is_private": 0,
            "author_login": "admin",
            "cards": [],
            "is_owner": false, (only if have token)
            "owner_login": "admin",
            "description": "тут чисто про реп",
            "count_repetitions": 0,
            "liked": false, (only if have token)
            "subscribed": false, (only if have token)
            "main_language": "eng",
            "second_language": "rus",
            "price": 0,
            "count_words": 0,
            "name": "Lol Kek!!!",
            "id": 16,
            "likes": 0
        },
        ...
        ],
    "id": 1,
    "error": false,
    "login": "admin"
}
```

>/rating
### Input:
```json
{
    "page": 1,
}
```
### Output:
```json
{
    "pages": 1,
    "error": false,
    "users": [
        {
            "name": "admin",
            "rating": 780,
            "walkthroughs": 0,
            "average_rating": 0,
            "id": 1,
            "error": false,
            "login": "admin"
        },
        {
            "name": "nafanya",
            "rating": 0,
            "walkthroughs": 0,
            "average_rating": 0,
            "id": 2,
            "error": false,
            "login": "nafanya"
        }
    ]
}
```
>/worst_decks
### Input:
```json
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImpycnRqcnJ0anJydGpycnRqcnJ0anJydGpycnRqcnJ0anJydCIsImxvZ2luIjoibmFmYW55YSJ9.uJKb3CKjVVpURmoEsYhBT06KfXLhmTL1VZD_k4whLNQ"
}
```
### Output:
```json
{
    "decks": [
        {
            "is_private": 1,
            "author_login": "admin",
            "cards": [
                {
                    "answer": "реп",
                    "description": null,
                    "id": 1,
                    "main_word": "rap",
                    "type": "default"
                },
                {
                    "answer": "техника",
                    "description": null,
                    "id": 3,
                    "main_word": "flow",
                    "type": "default"
                },
                {
                    "answer": "богатство",
                    "description": null,
                    "id": 22,
                    "main_word": "guap",
                    "type": "default"
                },
                {
                    "answer": "богатство",
                    "description": null,
                    "id": 32,
                    "main_word": "guap",
                    "type": "default"
                }
            ],
            "subscribers": 1,
            "is_owner": false,
            "owner_login": "admin",
            "description": "тут чисто про реп",
            "count_repetitions": 0,
            "liked": true,
            "subscribed": true,
            "main_language": "eng",
            "second_language": "rus",
            "price": 0,
            "count_words": 4,
            "name": "rap",
            "id": 1,
            "likes": 2
        }
    ],
    "error": false
}
```
