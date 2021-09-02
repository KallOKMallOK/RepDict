package com.nafanya.danil00t.RepDict.funcs;

import com.nafanya.danil00t.RepDict.models.Card;
import com.nafanya.danil00t.RepDict.models.User;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.Optional;

public class JsonWorker {

    public static String parseUsers(Iterable<User> users){
        JSONObject main = new JSONObject();
        JSONArray usersArray = new JSONArray();
        users.forEach(user -> {
            JSONObject obj = new JSONObject();
            JSONObject namePass = new JSONObject();
            namePass.put("id", user.getId());
            namePass.put("password", user.getPassword());
            namePass.put("name", user.getName());
            usersArray.add(namePass);
        });
        main.put("data", usersArray);
        return main.toJSONString();
    }

    public static String parseCards(Optional<Card> cards){
        return null;
    }
}
