package com.nafanya.danil00t.RepDict.controllers;

import com.nafanya.danil00t.RepDict.funcs.JWTokenUtils;
import com.nafanya.danil00t.RepDict.models.*;
import com.nafanya.danil00t.RepDict.repository.CardRepository;
import com.nafanya.danil00t.RepDict.repository.DeckRepository;
import com.nafanya.danil00t.RepDict.repository.SubscriptionRepository;
import com.nafanya.danil00t.RepDict.repository.UserRepository;
import lombok.Data;
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
    private SubscriptionRepository subscriptionRepository;

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
        Deck deck = deckRepository.getById(request.getDeckId());
        Subscription subscription = subscriptionRepository.getById(new SubscriptionKey(user, deck));
        Integer deltaRating = 0;
        for(CardResult result : request.getResults())
            deltaRating += getBalls(result, cardRepository);
        if(subscription != null) {
            subscription.setAverageRating((subscription.getAverageRating() * subscription.getPlayCount() + deltaRating) / (subscription.getPlayCount() + 1));
            subscription.setPlayCount(subscription.getPlayCount() + 1);
            subscriptionRepository.save(subscription);
        }
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
        deck.setCountRepetitions(deck.getCountRepetitions() + 1);
        deckRepository.save(deck);
        userRepository.save(user);
        JSONObject object = MainController.getSuccess();
        object.put("score", deltaRating);
        return object;
    }

    private static Integer getBalls(CardResult result, CardRepository cardRepository){
        if(!result.getAnswer())
            return 0;
        Integer cardRating = 0;
        Integer timeBonus = 0;
        if(result.getTime().compareTo(60) < 0 && result.getTime().compareTo(0) >= 0)
            timeBonus += (int) Math.pow((result.getTime() - 60)/10d, 2);
        Card card = cardRepository.getById(result.getIdCard());
        cardRating += card.getRating() + timeBonus;
        return cardRating * 10;
    }

    public static Integer getMaximumRating(Deck deck, CardRepository cardRepository){
        CardResult result = new CardResult();
        if(deck.getCards().size() == 0)
            return 0;
        result.setAnswer(true);
        result.setTime(0);
        Integer rating = 0;
        for(Card card : deck.getCards()){
            result.setIdCard(card.getId());
            rating += getBalls(result, cardRepository);
        }
        return rating;
    }
}

@Getter
@Setter
class StatisticRequest extends BanalRequest{
    private Integer deckId;
    private List<CardResult> results; //success/all answers
}

@Data
class CardResult{
    private Integer idCard;
    private Integer time;
    private Boolean answer;
}