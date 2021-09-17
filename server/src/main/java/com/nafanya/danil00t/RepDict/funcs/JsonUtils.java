package com.nafanya.danil00t.RepDict.funcs;

import com.nafanya.danil00t.RepDict.controllers.MainController;
import com.nafanya.danil00t.RepDict.models.Card;
import com.nafanya.danil00t.RepDict.models.User;
//import com.nafanya.danil00t.RepDict.models.Word;
import org.jboss.jandex.Main;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.List;

public class JsonUtils {

    public static JSONObject parseUsers(Iterable<User> users){
        JSONObject main = MainController.createSuccess();
        JSONArray usersArray = new JSONArray();
        users.forEach(user -> {
            JSONObject userObject = new JSONObject();
            userObject.put("login", user.getLogin());
            userObject.put("login", user.getLogin());
            userObject.put("id", user.getId());
            userObject.put("token", user.getToken());
            userObject.put("name", user.getName());
            userObject.put("balance", user.getBalance());
            userObject.put("refer", user.getRefer());
            userObject.put("is_checked", user.getIsChecked());
            usersArray.add(userObject);
        });
        main.put("data", usersArray);
        return main;
    }

    public static JSONObject parseCards(List<Card> cards){
        JSONObject main = MainController.createSuccess();
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
        JSONObject main = MainController.createSuccess();
        main.put("login", user.getLogin());
        main.put("id", user.getId());
        return main;
    }

    public static JSONObject getCardInfo(Card card){
        JSONObject main = MainController.createSuccess();
        main.put("id", card.getId());
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
        JSONObject object = MainController.getSUCCESS();
        object.put("login", user.getLogin());
        object.put("id", user.getId());
        object.put("token", user.getToken());
        object.put("name", user.getName());
        object.put("balance", user.getBalance());
        object.put("refer", user.getRefer());
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
