package com.nafanya.danil00t.RepDict.controllers;

import com.nafanya.danil00t.RepDict.funcs.JWTokenUtils;
import com.nafanya.danil00t.RepDict.funcs.JsonUtils;
import com.nafanya.danil00t.RepDict.models.User;
import com.nafanya.danil00t.RepDict.repository.CardRepository;
import com.nafanya.danil00t.RepDict.repository.UserRepository;
import org.jboss.jandex.Main;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@Controller
public class MainStaticFilesControllers {

    @Autowired
    CardRepository cardRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/smoke")
    public Object go(){
        return JsonUtils.getCardInfo(cardRepository.findById(1).get());
    }

    @GetMapping("/*")
    public String test(){
        return "index";
    }

}
