package com.nafanya.danil00t.RepDict.controllers;

import com.nafanya.danil00t.RepDict.funcs.JsonUtils;
import com.nafanya.danil00t.RepDict.models.User;
import com.nafanya.danil00t.RepDict.repository.UserRepository;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LogRegController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public JSONObject login(@RequestParam String login, @RequestParam String password){
        User user = userRepository.findByLogin(login).get(0);
        if(user.getPassword().equals(password))
            return JsonUtils.getUserInfo(user);
        else
            return MainController.getERROR();

    }

    @PostMapping("/registration")
    public JSONObject registration(@RequestParam String login, @RequestParam String password){
        if(userRepository.existsByLogin(login))
            return MainController.getERROR();
        else {
            User user = new User(login, password);
            user.setIsChecked(false);
            userRepository.save(user);
        }
        return JsonUtils.getUserInfo(userRepository.findByLogin(login).get(0));
    }
}
