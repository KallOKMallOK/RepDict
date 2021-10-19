package com.nafanya.danil00t.RepDict.funcs;

import com.nafanya.danil00t.RepDict.controllers.MainController;
import com.nafanya.danil00t.RepDict.controllers.UserController;
import com.nafanya.danil00t.RepDict.models.Card;
import com.nafanya.danil00t.RepDict.models.Deck;
import com.nafanya.danil00t.RepDict.models.User;
//import com.nafanya.danil00t.RepDict.models.Word;
import com.nafanya.danil00t.RepDict.repository.DeckRepository;
import org.jboss.jandex.Main;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.List;
import java.util.stream.Collectors;

public class JsonUtils {

    public static JSONObject getDeckJson(Deck deck, User user){
        JSONObject object = getDeckJson(deck);
        object.put("liked", deck.getLikesList().contains(user));
        object.put("subscribed", deck.getSubscribers().contains(user));
        object.put("is_owner", deck.getOwner().equals(user));
        return object;
    }

    public static JSONObject getDeckJson(Deck deck){
        JSONObject object = new JSONObject();
        object.put("id", deck.getId());
        object.put("author_login", deck.getAuthor().getLogin());
        object.put("owner_login", deck.getOwner().getLogin());
        object.put("description", deck.getDescription());
        object.put("count_repetitions", deck.getCountRepetitions());
        object.put("count_words", deck.getCountWords());
        object.put("is_private", deck.getIsPrivate());
        object.put("likes", deck.getLikes());
        object.put("name", deck.getName());
        object.put("main_language", deck.getMainLanguage());
        object.put("second_language", deck.getSecondLanguage());
        object.put("price", deck.getPrice());
        JSONArray array = new JSONArray();
        deck.getCards().forEach(card -> {
            array.add(getCardJson(card));
        });
        object.put("cards", array);
        return object;
    }

    public static JSONObject getCardJson(Card card){
        JSONObject object = new JSONObject();
        object.put("id", card.getId());
        object.put("type", card.getType());
        object.put("answer", card.getAnswer());
        object.put("main_word", card.getMainWord());
        object.put("description", card.getDescription());
        return object;
    }

    public static JSONObject parseUsers(Iterable<User> users){
        JSONObject main = MainController.getSuccess();
        JSONArray usersArray = new JSONArray();
        users.forEach(user -> {
            JSONObject userObject = new JSONObject();
            userObject.put("login", user.getLogin());
            userObject.put("id", user.getId());
            userObject.put("token", user.getToken());
            userObject.put("name", user.getName());
            userObject.put("balance", user.getBalance());
            userObject.put("refer", user.getRefer());
            userObject.put("is_checked", user.getIsChecked());
            userObject.put("rating", user.getRating());
            userObject.put("donat_balance", user.getDonatBalance());
            usersArray.add(userObject);
        });
        main.put("data", usersArray);
        return main;
    }

    public static JSONObject parseCards(List<Card> cards){
        JSONObject main = MainController.getSuccess();
        JSONArray cardsArray = new JSONArray();
        cards.forEach(card -> {
            JSONObject cardObject = new JSONObject();
            cardObject.put("id", card.getId());
            cardObject.put("main_word", card.getMainWord());
            cardObject.put("answer", card.getAnswer());
            cardObject.put("type", card.getType());
            /*Card parent = card.getParent();
            if(parent != null)
                cardObject.put("parent_id", card.getParent().getId());
            else
                cardObject.put("parent_id", null);
            cardObject.put("subscribers_count", card.getSubscribers().size());
            cardObject.put("words", wordsToArray(card.getWords()));
            cardsArray.add(cardObject);*/
        });
        main.put("data", cardsArray);
        return main;
    }

    public static JSONObject getUserInfo(User user){
        JSONObject main = MainController.getSuccess();
        main.put("login", user.getLogin());
        main.put("id", user.getId());
        return main;
    }

    public static JSONObject getCardInfo(Card card){
        JSONObject main = MainController.getSuccess();
        main.put("id", card.getId());
        main.put("description", card.getDescription());
        main.put("main_word", card.getMainWord());
        main.put("answer", card.getAnswer());
        main.put("type", card.getType());
//        Card parent = card.getParent();
//        if(parent != null)
//            main.put("parent_id", card.getParent().getId());
//        else
//            main.put("parent_id", null);
//        main.put("words", wordsToArray(card.getWords()));
        return main;
    }

//    public static JSONObject getWordsInfo(List<Word> words){
//        JSONObject object = MainController.createSuccess();
//        object.put("data", wordsToArray(words));
//        return object;
//    }

    public static JSONObject getUserJson(User user){
        JSONObject object = MainController.getSuccess();
        object.put("login", user.getLogin());
        object.put("id", user.getId());
        object.put("token", user.getToken());
        object.put("name", user.getName());
        object.put("balance", user.getBalance());
        object.put("donat_balance", user.getDonatBalance());
        object.put("refer", user.getRefer());
        object.put("is_checked", user.getIsChecked());
        object.put("rating", user.getRating());
        object.put("walkthroughs", user.getWalkthroughs());
        object.put("average_rating", user.getAverageRating());
        return object;
    }

    public static JSONObject getUserRatingJson(User user){
        JSONObject object = MainController.getSuccess();
        object.put("login", user.getLogin());
        object.put("name", user.getName());
        object.put("id", user.getId());
        object.put("rating", user.getRating());
        object.put("walkthroughs", user.getWalkthroughs());
        object.put("average_rating", user.getAverageRating());
        return object;
    }

    public static JSONObject getUserPublicJson(User user, Integer page, DeckRepository deckRepository, User guest){
        JSONObject object = getUserRatingJson(user);
        Integer pages;
        if(!user.equals(guest))
            pages = (((int) user.getOwned(deckRepository).
                    stream().
                    filter(deck -> deck.getIsPrivate().
                            equals(0)).count() / UserController.getUSERS_ON_PAGE())) + 1;
        else
            pages = ((int) (user.getOwned(deckRepository).size() / UserController.getUSERS_ON_PAGE())) + 1;
        if(page > pages)
            return null;
        object.put("pages", pages);
        List<Deck> owned;
        if(!user.equals(guest))
            owned = ListUtils.getPageListDeck(
                    user.getOwned(deckRepository).
                            stream().
                            filter(deck -> deck.getIsPrivate().equals(0)).
                            collect(Collectors.toList()),
                    UserController.getUSERS_ON_PAGE(),
                    page
            );
        else
            owned = ListUtils.getPageListDeck(
                    user.getOwned(deckRepository),
                    UserController.getUSERS_ON_PAGE(),
                    page
            );
        JSONArray array = new JSONArray();
        owned.forEach(deck -> {
            array.add(JsonUtils.getDeckJson(deck, guest));
        });
        object.put("decks", array);
        object.put("is_checked", user.getIsChecked());
        return object;
    }

    public static JSONObject getUserPublicJson(User user, Integer page, DeckRepository deckRepository){
        JSONObject object = getUserRatingJson(user);
        Integer pages = ((int) (user.getOwned(deckRepository).size() / UserController.getUSERS_ON_PAGE())) + 1;
        if(page > pages)
            return null;
        object.put("pages", pages);
        List<Deck> owned = ListUtils.getPageListDeck(
                user.getOwned(deckRepository),
                UserController.getUSERS_ON_PAGE(),
                page
        );
        JSONArray array = new JSONArray();
        owned.forEach(deck -> {
            array.add(JsonUtils.getDeckJson(deck));
        });
        object.put("decks", array);
        object.put("is_checked", user.getIsChecked());
        return object;
    }

//    private static JSONArray wordsToArray(List<Word> w){
//        JSONArray words = new JSONArray();
//        if(w.size() == 0)
//            return words;
//        w.forEach(word -> {
//            JSONObject wordObject = new JSONObject();
//            wordObject.put("id", word.getId());
//            wordObject.put("first_word", word.getFirstWord());
//            wordObject.put("second_word", word.getSecondWord());
//            words.add(wordObject);
//        });
//        return words;
//    }
}