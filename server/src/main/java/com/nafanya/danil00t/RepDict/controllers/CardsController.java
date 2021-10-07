package com.nafanya.danil00t.RepDict.controllers;

import com.nafanya.danil00t.RepDict.funcs.JsonUtils;
import com.nafanya.danil00t.RepDict.models.Card;
import com.nafanya.danil00t.RepDict.models.User;
//import com.nafanya.danil00t.RepDict.models.Word;
import com.nafanya.danil00t.RepDict.repository.CardRepository;
import com.nafanya.danil00t.RepDict.repository.UserRepository;
//import com.nafanya.danil00t.RepDict.repository.WordRepository;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


/* TODO:
*   Сделать добавление комментария и систему лайков
*/

@RestController
public class CardsController {
/*
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private WordRepository wordRepository;

    @GetMapping("/cards")
    public JSONObject showCards(){
        return JsonUtils.parseCards(cardRepository.findAll());
    }
    @PostMapping("/u{u_id}/add_card")
    public JSONObject addCard(@PathVariable(value = "u_id") Integer userId,
                              @RequestParam String name,
                              @RequestParam Integer cost) throws NullPointerException{
        if(cost < 0)
            throw new NullPointerException();
        User user = userRepository.findById(userId).get();
        if(cardRepository.existsByUserAndName(user, name))
            return MainController.getERROR();
        else{
            Card card = new Card(name, user, cost);
            cardRepository.save(card);
           return JsonUtils.getCardInfo(cardRepository.findByUserAndName(user, name).get(0));
        }
    }

    // -------------------- !!! ----------------------- //
    @PostMapping("/u{u_id}/c{c_id}/add_word")
    public JSONObject addWord(@PathVariable(value = "u_id") Integer userId,
                          @PathVariable(value = "c_id") Integer cardId,
                          @RequestParam(value = "first_word") String firstWord,
                          @RequestParam(value = "second_word") String secondWord){

        Card card = cardRepository.getById(cardId);
        if(!card.getUser().getId().equals(userId))
            return MainController.getERROR();
        Word word;
        if(!wordRepository.existsByFirstWordAndSecondWord(firstWord, secondWord))
            wordRepository.save(new Word(firstWord, secondWord));
        word = wordRepository.findByFirstWordAndSecondWord(firstWord, secondWord);
        if(!card.getWords().contains(word))
            card.getWords().add(word);
        cardRepository.save(card);
        return JsonUtils.getCardInfo(cardRepository.findById(card.getId()).get());
    }

    @PostMapping("/u{u_id}/c{c_id}/delete_word")
    public JSONObject deleteWord(@PathVariable(value = "u_id") Integer userId,
                                 @PathVariable(value = "c_id") Integer cardId,
                                 @RequestParam(value = "w_id") Integer wordId){
        Card card = getCardById(cardRepository, cardId, userId);
        JSONObject notExistObject = new JSONObject();
        notExistObject.put("status", "not_exist");

        JSONObject successObject = new JSONObject();
        successObject.put("status", "success");

        if(card == null)
            return MainController.getERROR();
        if(!wordRepository.existsById(wordId)){
            return notExistObject;
        }
        Word word = wordRepository.findById(wordId).get();
        if(!card.getWords().contains(word))
            return notExistObject;
        card.getWords().remove(word);
        cardRepository.save(card);
        return successObject;
    }

    @PostMapping("/u{u_id}/subscribe")
    public JSONObject subscribe(@PathVariable(value = "u_id") Integer subscriberId,
                                @RequestParam(value = "c_id") Integer cardId){
        if(!cardRepository.existsById(cardId) || !userRepository.existsById(subscriberId))
            return MainController.getERROR();
        Card card = cardRepository.getById(cardId);
        User user = userRepository.getById(subscriberId);
        if(card.getCost().compareTo(user.getBalance()) > 0)
            return MainController.getERROR();
        if(!user.getSubscriptions().contains(card)) {
            user.getSubscriptions().add(card);
            user.setBalance(user.getBalance() - card.getCost());
        }
        userRepository.save(user);
        cardRepository.save(card);
        JSONObject object = new JSONObject();
        object.put("status", "success");
        return object;
    }

    @PostMapping("/u{u_id}/subscriptions/cancel")
    public JSONObject cancelSubscription(@PathVariable(name = "u_id") Integer userId,
                                         @RequestParam(name = "c_id") Integer cardId){
        if(!userRepository.existsById(userId) || !cardRepository.existsById(cardId))
            return MainController.getERROR();
        User user = userRepository.getById(userId);
        Card card = cardRepository.getById(cardId);
        if(!user.getSubscriptions().remove(card))
            return MainController.getERROR();
        card.getSubscribers().remove(user);
        userRepository.save(user);
        cardRepository.save(card);
        JSONObject object = getSuccessJSON();
        return object;
    }

    @PostMapping("/u{u_id}/subscriptions/copy_to_profile")
    public JSONObject copyToProfile(@PathVariable(value = "u_id") Integer userId,
                                    @RequestParam(value = "c_id") Integer cardId){
        if(!checkUserAndCardById(userId, cardId))
            return MainController.getERROR();
        Card mainCard = cardRepository.getById(cardId);
        User user = userRepository.getById(userId);
        String name = mainCard.getName().substring(0);
        Integer cost = mainCard.getCost().intValue();
        Card newCard = new Card(name, user, cost);
        mainCard.getWords().forEach(word -> {
            Word what = wordRepository.findById(word.getId()).get();
            newCard.getWords().add(what);
        });
        cardRepository.save(newCard);
        JSONObject object = getSuccessJSON();
        object.put("status", "success");
        return object;
    }

    private boolean checkUserAndCardById(Integer userId, Integer cardId){
        return (userRepository.existsById(userId) & cardRepository.existsById(cardId));
    }

    private Card getCardById(CardRepository cardRepository, Integer cardId, Integer userId){
        Card card = cardRepository.getById(cardId);
        if(!card.getUser().getId().equals(userId))
            return null;
        return card;
    }

    private JSONObject getSuccessJSON(){
        JSONObject object = new JSONObject();
        object.put("status", "success");
        return object;
    }
*/
}
