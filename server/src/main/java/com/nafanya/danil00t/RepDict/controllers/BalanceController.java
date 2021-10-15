package com.nafanya.danil00t.RepDict.controllers;

import com.nafanya.danil00t.RepDict.funcs.JWTokenUtils;
import com.nafanya.danil00t.RepDict.models.Card;
import com.nafanya.danil00t.RepDict.models.User;
import com.nafanya.danil00t.RepDict.repository.CardRepository;
import com.nafanya.danil00t.RepDict.repository.DeckRepository;
import com.nafanya.danil00t.RepDict.repository.UserRepository;
import lombok.Getter;
import lombok.Setter;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
public class BalanceController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private DeckRepository deckRepository;

    @PostMapping("/statistic")
    public JSONObject statistic(
            @RequestBody StatisticRequest request
    ) throws IOException {
        if(!LogRegController.MiddleWare(request.getToken(), userRepository))
            return MainController.getError();
        User user = userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(request.getToken()));
        Integer deltaRating = 0;
        for(CardResult result : request.getResults())
            deltaRating += getBalls(result);
        user.setBalance(user.getBalance() + deltaRating);
        user.setRating(user.getRating() + deltaRating);
        if(user.getWalkthroughs().equals(0)) {
            user.setAverageRating(deltaRating * 1d);
            user.setWalkthroughs(1);
        }
        else{
            user.setAverageRating((user.getAverageRating() * user.getWalkthroughs() + deltaRating) / (user.getWalkthroughs() + 1));
            user.setWalkthroughs(user.getWalkthroughs() + 1);
        }
        userRepository.save(user);
        JSONObject object = MainController.getSuccess();
        object.put("score", deltaRating);
        return object;
    }

    private Integer getBalls(CardResult result){
        if(!result.getAnswer())
            return 0;
        Integer cardRating = 0;
        Integer timeBonus = 0;
        if(result.getTime().compareTo(60) < 0)
            timeBonus += (int) Math.pow((result.getTime() - 60)/10d, 2);
        Card card = cardRepository.getById(result.getIdCard());
        cardRating += card.getRating() + timeBonus;
        return cardRating * 10;
    }
}

@Getter
@Setter
class StatisticRequest extends BanalRequest{
    private List<CardResult> results; //success/all answers
}

@Getter
@Setter
class CardResult{
    private Integer idCard;
    private Integer time;
    private Boolean answer;
}