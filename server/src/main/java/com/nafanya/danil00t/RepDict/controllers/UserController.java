package com.nafanya.danil00t.RepDict.controllers;

import com.nafanya.danil00t.RepDict.funcs.JWTokenUtils;
import com.nafanya.danil00t.RepDict.funcs.JsonUtils;
import com.nafanya.danil00t.RepDict.funcs.ListUtils;
import com.nafanya.danil00t.RepDict.models.User;
import com.nafanya.danil00t.RepDict.repository.CardRepository;
import com.nafanya.danil00t.RepDict.repository.DeckRepository;
import com.nafanya.danil00t.RepDict.repository.UserRepository;
import lombok.Getter;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
public class UserController {
    @Getter
    private static final Integer USERS_ON_PAGE = 10;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CardRepository cardRepository;

    @Autowired
    DeckRepository deckRepository;

    @GetMapping("/rating")
    public JSONObject rating(
            @RequestParam(defaultValue = "1") Integer page
    ) throws IOException {
        JSONObject object = MainController.getSuccess();
        Integer pages = ((int) (userRepository.findAllByOrderByRatingDesc().size() / USERS_ON_PAGE)) +  1;
        object.put("pages", pages);
        List<User> users = ListUtils.getPageListUser(userRepository.findAllByOrderByRatingDesc(), USERS_ON_PAGE, page);
        if(users == null)
            return MainController.getError();
        JSONArray userArray = new JSONArray();
        users.forEach(u -> userArray.add(JsonUtils.getUserRatingJson(u)));
        object.put("users", userArray);
        return object;
    }

    @GetMapping("/user")
    public JSONObject user(
            @RequestParam String login,
            @RequestParam(required = false) String token,
            @RequestParam(defaultValue = "1") Integer page
    ) throws IOException{
        if(token != null)
            if(!LogRegController.MiddleWare(token, userRepository) || !userRepository.existsByLogin(login))
                return MainController.getError();
        JSONObject object;
        User user = userRepository.getByLogin(login);
        if(user == null)
            return MainController.getError();
        if(token == null)
            object = JsonUtils.getUserPublicJson(userRepository.getByLogin(login), page, deckRepository);
        else
            object = JsonUtils.getUserPublicJson(userRepository.getByLogin(login),
                    page,
                    deckRepository,
                    userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(token)));
        if(object == null)
            return MainController.getError();
        return object;
    }
}