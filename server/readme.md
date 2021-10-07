# API links examples.
## POST.
#
> /new_deck
```sh
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6Im9wdGltdXMiLCJsb2dpbiI6Im9wdGltdXMifQ.Kx-fai386FTdVzc2T2-ed8yDIlLO8H5r_rm3MsvIMUw",
    "name": "Lol Kek!!!",
    "isPrivate": false,
    "idUser": 1,
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
> /edit_deck
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

> /like

```sh
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImFkbWluIiwibG9naW4iOiJhZG1pbiJ9.0A_h5-_WN0OeoT1eWQoeIWZR2_wACsfxmWSRu_WBOGo",
    "deckId":1
}
```

> /registration
```sh
{
	"name":"admin",
	"login":"admin",
	"password":"admin"
}
```

>/login
```sh
{
	"login":"admin",
	"password":"admin"
}
```
