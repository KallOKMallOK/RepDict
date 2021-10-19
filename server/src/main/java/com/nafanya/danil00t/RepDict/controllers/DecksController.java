package com.nafanya.danil00t.RepDict.controllers;

import com.nafanya.danil00t.RepDict.funcs.JWTokenUtils;
import com.nafanya.danil00t.RepDict.funcs.JsonUtils;
import com.nafanya.danil00t.RepDict.funcs.Parser;
import com.nafanya.danil00t.RepDict.models.Card;
import com.nafanya.danil00t.RepDict.models.Deck;
import com.nafanya.danil00t.RepDict.models.User;
import com.nafanya.danil00t.RepDict.repository.CardRepository;
import com.nafanya.danil00t.RepDict.repository.DeckRepository;
import com.nafanya.danil00t.RepDict.repository.UserRepository;
import com.sun.tools.javac.Main;
import lombok.Getter;
import lombok.Setter;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URL;
import java.util.List;

@Getter
@Setter
@CrossOrigin
@RestController
public class DecksController {

    private final Integer decksOnOnePage = 10;

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
            @RequestParam(required = false) String token,
            @RequestParam(defaultValue = "1") Integer page
    ) throws IOException{
        JSONObject object = MainController.getSuccess();
        List<Deck> decksList = deckRepository.findAllByOrderByIdDesc();
        int pages = (Integer) (decksList.size()  / decksOnOnePage) + 1;
        object.put("pages", pages);
        if(page > pages)
            return MainController.getError();
        JSONArray decks = new JSONArray();
        int fromIndex = (page - 1) * decksOnOnePage;
        int toIndex = page.equals(pages) ? decksList.size() : fromIndex + decksOnOnePage;
        decksList = decksList.subList(fromIndex, toIndex);
        if(token == null)
            decksList.forEach(deck -> {
                if(deck.getIsPrivate().equals(0))
                    decks.add(JsonUtils.getDeckJson(deck));
            });
        else {
            User user = userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(token));
            decksList.forEach(deck -> {
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
            @RequestParam String token,
            @RequestParam(defaultValue = "1", name = "owned_page") Integer ownedPage,
            @RequestParam(defaultValue = "1", name = "subscribed_page") Integer subscribedPage
    ) throws IOException{
        if(!LogRegController.MiddleWare(token, userRepository))
            return MainController.getError();
        User user = userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(token));
        JSONObject object = new JSONObject();

        List<Deck> ownedList = deckRepository.findAllByOwnerOrderByIdDesc(user);
        int ownedPages = (int) (ownedList.size() / 10) + 1;
        if(ownedPage > ownedPages)
            return MainController.getError();
        object.put("owned_pages", ownedPages);
        JSONArray owned = new JSONArray();
        int fromIndex, toIndex;
        fromIndex = (ownedPage - 1) * decksOnOnePage;
        toIndex = ownedPage.equals(ownedPages) ? ownedList.size() : fromIndex + decksOnOnePage;
        ownedList.subList(fromIndex, toIndex).forEach(deck -> {
            owned.add(JsonUtils.getDeckJson(deck, user));
        });

        JSONArray subscriptions = new JSONArray();
        List<Deck> subscriptionsList = user.getSubscriptions();
        int subscriptionPages = (int) (subscriptionsList.size() / 10) + 1;
        if(subscribedPage > subscriptionPages)
            return MainController.getError();
        object.put("subscription_pages", subscriptionPages);
        fromIndex = (subscribedPage - 1) * decksOnOnePage;
        toIndex = subscribedPage.equals(subscriptionPages) ? subscriptionsList.size() : fromIndex + decksOnOnePage;
        subscriptionsList.subList(fromIndex, toIndex).forEach(deck -> {
            if(!deck.getOwner().equals(user)) subscriptions.add(JsonUtils.getDeckJson(deck, user));
        });
        object.put("error", false);
        object.put("owned", owned);
        object.put("subscriptions", subscriptions);
        return object;
    }

    //TODO: Добавить в readme.md
    @GetMapping("/get_deck")
    public JSONObject getDeck(
            @RequestParam(required = false) String token,
            @RequestParam Integer id
    ) throws IOException{
        if(token != null)
            if(!LogRegController.MiddleWare(token, userRepository))
                return MainController.getError();
        Deck deck = deckRepository.getById(id);
        JSONObject object = MainController.getSuccess();
        if(token == null) {
            if (deck.getIsPrivate().equals(0)) {
                object.put("deck", JsonUtils.getDeckJson(deck));
                return object;
            }
            else
                return MainController.getError();
        }
        User user = userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(token));
        if(deck.getIsPrivate().equals(0) || deck.getOwner().equals(user)){
            object.put("deck", JsonUtils.getDeckJson(deck, user));
            return object;
        }
        return MainController.getError();
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
        if(!deck.getOwner().getLogin().equals(user.getLogin()))
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
        if(!deck.getOwner().equals(userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(request.getToken()))))
            return MainController.getError();
        cardRepository.deleteAll(deck.getCards());
        deckRepository.delete(deck);
        return MainController.getSuccess();
    }

    @PostMapping("/subscribe")
    public JSONObject subscribe(
            @RequestBody LikeRequest request
    ) throws IOException{
        if(!LogRegController.MiddleWare(request.getToken(), userRepository))
            return MainController.getError();
        JSONObject object = MainController.getSuccess();
        User user = userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(request.getToken()));
        Deck deck = deckRepository.getById(request.getDeckId());
        if(deck.getOwner().equals(user))
            return MainController.getError();
        if(!user.getSubscriptions().contains(deck)){
            user.getSubscriptions().add(deck);
            userRepository.save(user);
            object.put("status", true);
            return object;
        }
        user.getSubscriptions().remove(deck);
        userRepository.save(user);
        object.put("status", false);
        return object;
    }

    @PostMapping("/copy_deck")
    public JSONObject copy(
        @RequestBody LikeRequest request
    ) throws IOException{
        if(!LogRegController.MiddleWare(request.getToken(), userRepository))
            return MainController.getError();
        User user = userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(request.getToken()));
        Deck original = deckRepository.getById(request.getDeckId());
        Deck clone = new Deck(original, user);
        cardRepository.saveAll(clone.getCards());
        deckRepository.save(clone);
        JSONObject object = MainController.getSuccess();
        object.put("cloneId", clone.getId());
        return object;
    }

    @PostMapping("/parser")
    public void parser(@RequestBody BanalRequest request) throws IOException{
        if(!LogRegController.MiddleWareIsAdmin(request.getToken(), userRepository))
            return;
        Document document = Jsoup.parse(
                new URL(Parser.getENGLISH_LIBRARY_URL() + "anglijskie-slova-po-temam/"),
                10000);
        Elements routes = document.select("tbody").first().select("a");
        routes.forEach(route -> {
            try {
                Parser.parseUrl(route.attr("href"),
                        userRepository,
                        deckRepository,
                        cardRepository,
                        userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(request.getToken())).getId());
            } catch (IOException ignore) {

            }
                }
        );
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
        card.generateRating();
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