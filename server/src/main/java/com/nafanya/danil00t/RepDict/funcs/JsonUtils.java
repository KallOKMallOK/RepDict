package com.nafanya.danil00t.RepDict.funcs;

import com.nafanya.danil00t.RepDict.models.Card;
import com.nafanya.danil00t.RepDict.models.User;
import com.nafanya.danil00t.RepDict.models.Word;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.List;

public class JsonUtils {

    public static JSONObject parseUsers(Iterable<User> users){
        JSONObject main = new JSONObject();
        JSONArray usersArray = new JSONArray();
        users.forEach(user -> {
            JSONObject userObject = new JSONObject();
            userObject.put("id", user.getId());
            userObject.put("login", user.getLogin());
            usersArray.add(userObject);
        });
        main.put("data", usersArray);
        return main;
    }

    public static JSONObject parseCards(List<Card> cards){
        JSONObject main = new JSONObject();
        JSONArray cardsArray = new JSONArray();
        cards.forEach(card -> {
            JSONObject cardObject = new JSONObject();
            cardObject.put("id", card.getId());
            cardObject.put("name", card.getName());
            cardObject.put("author_id", card.getUser().getId());
            cardObject.put("subscribers_count", card.getSubscribers().size());
            cardObject.put("words", wordsToArray(card.getWords()));
            cardsArray.add(cardObject);
        });
        main.put("data", cardsArray);
        return main;
    }

    public static JSONObject getUserInfo(User user){
        JSONObject main = new JSONObject();
        main.put("login", user.getLogin());
        main.put("id", user.getId());
        return main;
    }

    public static JSONObject getCardInfo(Card card){
        JSONObject main = new JSONObject();
        main.put("id", card.getId());
        main.put("name", card.getName());
        main.put("author_id", card.getUser().getId());
        main.put("words", wordsToArray(card.getWords()));
        return main;
    }

    public static JSONObject getWordsInfo(List<Word> words){
        JSONObject object = new JSONObject();
        object.put("data", wordsToArray(words));
        return object;
    }

    private static JSONArray wordsToArray(List<Word> w){
        JSONArray words = new JSONArray();
        if(w.size() == 0)
            return words;
        w.forEach(word -> {
            JSONObject wordObject = new JSONObject();
            wordObject.put("id", word.getId());
            wordObject.put("first_word", word.getFirstWord());
            wordObject.put("second_word", word.getSecondWord());
            words.add(wordObject);
        });
        return words;
    }
}
