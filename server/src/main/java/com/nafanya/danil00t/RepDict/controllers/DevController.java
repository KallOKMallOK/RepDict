/*
package com.nafanya.danil00t.RepDict.controllers;

import com.nafanya.danil00t.RepDict.models.Card;
import com.nafanya.danil00t.RepDict.repository.CardRepository;
import com.nafanya.danil00t.RepDict.repository.UserRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Getter
@Setter
@CrossOrigin
@RestController
public class DevController {

    @Autowired
    CardRepository cardRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/set_rating")
    public String setRating(){
        cardRepository.findAll().forEach(card -> {
            card.generateRating();
            cardRepository.save(card);
        });
        return "success";
    }

    @GetMapping("/set_user_rating")
    public String setUserRating(){
        userRepository.findAll().forEach(user -> {
            user.setRating(0);
            user.setDonatBalance(0);
            userRepository.save(user);
        });
        return "success";
    }

}
*/