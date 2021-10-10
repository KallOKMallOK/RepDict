package com.nafanya.danil00t.RepDict.controllers;

import com.nafanya.danil00t.RepDict.funcs.JWTokenUtils;
import com.nafanya.danil00t.RepDict.funcs.JsonUtils;
import com.nafanya.danil00t.RepDict.models.Card;
import com.nafanya.danil00t.RepDict.models.Deck;
import com.nafanya.danil00t.RepDict.models.User;
import com.nafanya.danil00t.RepDict.repository.CardRepository;
import com.nafanya.danil00t.RepDict.repository.DeckRepository;
import com.nafanya.danil00t.RepDict.repository.UserRepository;
import lombok.Getter;
import lombok.Setter;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Getter
@Setter
@CrossOrigin
@RestController
public class DecksController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    DeckRepository deckRepository;

    @Autowired
    CardRepository cardRepository;

    @PostMapping("/new_deck")
    public JSONObject newDeck(
        @RequestBody DeckRequest cards
    ) throws IOException {
        if(!LogRegController.MiddleWare(cards.getToken(), userRepository))
            return MainController.getError();
        Deck deck = new Deck(cards.getName(),
                cards.getIsPrivate(),
                userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(cards.getToken())).getId(),
                cards.getDescription(),
                cards.getMainLang(),
                cards.getSecondLang(),
                cards.getPrice(),
                userRepository);
        Deck _deck = deckRepository.save(deck);
        cards.getCards().forEach(c -> {
            Card card = new Card(c.getMain_word(), c.getAnswer(), c.getType());
            card = cardRepository.save(card);
            _deck.getCards().add(card);
        });
        _deck.setCountWords(_deck.getCards().size());
        deckRepository.save(_deck);
        return MainController.getSuccess();
    }

    @GetMapping("/get_all_decks")
    public JSONObject getAllDecks(
            @RequestParam(required = false) String token
    ) throws IOException{
        JSONObject object = MainController.getSuccess();
        JSONArray decks = new JSONArray();
        if(token == null)
            deckRepository.findAll().forEach(deck -> {
                if(deck.getIsPrivate().equals(0))
                    decks.add(JsonUtils.getDeckJson(deck));
            });
        else {
            User user = userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(token));
            deckRepository.findAll().forEach(deck -> {
                if (deck.getIsPrivate().equals(0) || deck.getOwner().equals(user))
                    decks.add(JsonUtils.getDeckJson(deck, user));
            });
        }
        object.put("decks", decks);
        return object;
    }

    @GetMapping("/get_decks")
    public JSONObject getDecks(
            //@RequestBody GetDeckRequest request
            @RequestParam String token
    ) throws IOException{
        if(!LogRegController.MiddleWare(token, userRepository))
            return MainController.getError();
        User user = userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(token));
        JSONArray array = new JSONArray();
        user.getOwned(deckRepository).forEach(deck -> array.add(JsonUtils.getDeckJson(deck, user)));
        JSONObject object = new JSONObject();
        object.put("error", false);
        object.put("decks", array);
        return object;
    }

    @PostMapping("/like")
    public JSONObject like(
            @RequestBody LikeRequest request
    ) throws IOException{
        if(!LogRegController.MiddleWare(request.getToken(), userRepository))
            return MainController.getError();
        User user = userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(request.getToken()));
        Deck deck = deckRepository.getById(request.getDeckId());
        if(!deck.getLikesList().contains(user)){
            deck.getLikesList().add(user);
            System.out.println(deck.getLikesList().size());
            deck.setLikes(deck.getLikes() + 1);
            System.out.println(deck.getLikes());
            deckRepository.save(deck);
            JSONObject object = MainController.getSuccess();
            object.put("status", true);
            return object;
        }
        deck.getLikesList().remove(user);
        user.getLikesList().remove(deck);
        System.out.println(deck.getLikesList().size());
        deck.setLikes(deck.getLikes() - 1);
        deckRepository.save(deck);
        userRepository.save(user);
        JSONObject object = MainController.getSuccess();
        object.put("status", false);
        return object;
    }

    @PostMapping("/change_deck")
    public JSONObject changeDeck(
            @RequestBody ChangeRequest body
    ) throws IOException{
        if(!LogRegController.MiddleWare(body.getToken(), userRepository))
            return MainController.getError();
        User user = userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(body.getToken()));
        Deck deck = deckRepository.getById(body.getIdDeck());
        if(!deck.getAuthor().getLogin().equals(user.getLogin()))
            return MainController.getError();
        body.getChanges().forEach(change -> {
            Card card;
            switch (change.getType()){
                case "CHANGE_DECK":
                    changeDeckSwitch(change.getPayload(), deck);
                    break;
                case "CHANGE_CARD":
                    changeCardSwitch(change.getPayload(), deck);
                    break;
                case "NEW_CARD":
                    card = new Card(
                            (String) change.getPayload().get("main_word"),
                            (String) change.getPayload().get("answer"),
                            (String) change.getPayload().get("type"),
                            (String) change.getPayload().get("description"));
                    card = cardRepository.save(card);
                    deck.getCards().add(card);
                    deckRepository.save(deck);
                    break;
                case "DELETE_CARD":
                    card = null;
                    Integer cardId = (Integer) change.getPayload().get("id");
                    for(Card c : deck.getCards()) {
                        if (c.getId().equals(cardId)) {
                            card = c;
                            deck.getCards().remove(c);
                            card.getDecks().remove(deck);
                            deckRepository.save(deck);
                            cardRepository.delete(card);
                            break;
                        }
                    }
                    break;
            }
        });
        deck.setCountWords(deck.getCards().size());
        deckRepository.save(deck);
        return MainController.getSuccess();
    }

    @PostMapping("/delete_deck")
    public JSONObject deleteDeck(
            @RequestBody LikeRequest request
    ) throws IOException{
        if(!LogRegController.MiddleWare(request.getToken(), userRepository))
            return MainController.getError();
        Deck deck = deckRepository.getById(request.getDeckId());
        if(!deck.getAuthor().equals(userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(request.getToken()))))
            return MainController.getError();
        cardRepository.deleteAll(deck.getCards());
        deckRepository.delete(deck);
        return getDecks(request.getToken());
    }

    private void changeCardSwitch(JSONObject payload, Deck deck){
        Card card = null;
        Integer cardId = (Integer) payload.get("id");
        for(Card c : deck.getCards()) {
            if (c.getId().equals(cardId)) {
                card = c;
                break;
            }
        }
        if(card == null)
            return;
        switch((String) payload.get("name")){
            case "main_word":
                card.setMainWord((String) payload.get("value"));
                break;
            case "answer":
                card.setAnswer((String) payload.get("value"));
                break;
            case "type":
                card.setType((String) payload.get("value"));
                break;
            case "description":
                card.setDescription((String) payload.get("description"));
                break;
        }
        card = cardRepository.save(card);
    }

    private void changeDeckSwitch(JSONObject payload, Deck deck){
        switch((String) payload.get("name")){
            case "name":
                deck.setName((String) payload.get("value"));
                break;
            case "isPrivate":
                deck.setIsPrivate((Integer) payload.get("value"));
                break;
            case "description":
                deck.setDescription((String) payload.get("value"));
                break;
            case "mainLang":
                deck.setMainLanguage((String) payload.get("value"));
                break;
            case "secondLang":
                deck.setSecondLanguage((String) payload.get("value"));
                break;
            case "price":
                deck.setPrice((Integer) payload.get("value"));
                break;
            default:
                break;
        }
    }
}

@Getter
@Setter
class BanalRequest{
    private String token;
}

@Getter
@Setter
class LikeRequest extends BanalRequest{
    private Integer deckId;
}

@Getter
@Setter
class GetDeckRequest extends BanalRequest{
    Integer userId;
}


@Getter
@Setter
class DeckRequest extends BanalRequest{
    String name;
    Boolean isPrivate;
    String description;
    String mainLang;
    String secondLang;
    Integer price;
    List<ListBody> cards;
}

@Getter
@Setter
class ListBody{
    String main_word;
    String answer;
    String description;
    String type;
}

@Getter
@Setter
class ChangeRequest extends BanalRequest{
    int idDeck;
    private List<ChangeBody> changes;
}

@Getter
@Setter
class ChangeBody {
    private String type;
    private JSONObject payload;
}