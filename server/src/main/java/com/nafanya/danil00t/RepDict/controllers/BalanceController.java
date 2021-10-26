package com.nafanya.danil00t.RepDict.controllers;

import com.nafanya.danil00t.RepDict.funcs.JWTokenUtils;
import com.nafanya.danil00t.RepDict.models.*;
import com.nafanya.danil00t.RepDict.repository.*;
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

    @Autowired
    CardRatingRepository cardRatingRepository;

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
            deltaRating += getBalls(result, user, cardRepository, cardRatingRepository);
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

    private static Integer getBalls(
            CardResult result,
            User user,
            CardRepository cardRepository,
            CardRatingRepository cardRatingRepository
    ){
        CardRating cardRating;
        if(cardRatingRepository.existsById(new CardRatingKey(user.getId(), result.getIdCard())))
            cardRating = cardRatingRepository.getById(new CardRatingKey(user.getId(), result.getIdCard()));
        else
            cardRating = new CardRating(user, result.getIdCard());
        if(!result.getAnswer()) {
            cardRating.setAnswerRating(cardRating.getAnswerRating() - 1);
            cardRatingRepository.save(cardRating);
            return 0;
        }
        else
            cardRating.setAnswerRating(cardRating.getAnswerRating() + 1);
        cardRatingRepository.save(cardRating);
        Integer cardRatingBalls = 0;
        Integer timeBonus = 0;
        if(result.getTime().compareTo(60) < 0 && result.getTime().compareTo(0) >= 0)
            timeBonus += (int) Math.pow((result.getTime() - 60)/10d, 2);
        Card card = cardRepository.getById(result.getIdCard());
        cardRatingBalls += card.getRating() + timeBonus;
        return cardRatingBalls * 10;
    }

    public static Integer getMaximumRating(Deck deck){
        CardResult result = new CardResult();
        if(deck.getCards().size() == 0)
            return 0;
        result.setAnswer(true);
        result.setTime(0);
        Integer rating = 0;
        for(Card card : deck.getCards()){
            result.setIdCard(card.getId());
            rating += ((int) Math.pow((result.getTime() - 60)/10d, 2) + card.getRating()) * 10;
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