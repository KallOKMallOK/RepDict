package com.nafanya.danil00t.RepDict.controllers;

import com.nafanya.danil00t.RepDict.funcs.JWTokenUtils;
import com.nafanya.danil00t.RepDict.models.Card;
import com.nafanya.danil00t.RepDict.models.Deck;
import com.nafanya.danil00t.RepDict.repository.CardRepository;
import com.nafanya.danil00t.RepDict.repository.DeckRepository;
import com.nafanya.danil00t.RepDict.repository.UserRepository;
import lombok.Getter;
import lombok.Setter;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.bind.Name;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Getter
@Setter
@CrossOrigin
@RestController
public class DecksController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    DeckRepository deckRepository;

    @Autowired
    CardRepository cardRepository;

    @PostMapping("/new_deck")
    public JSONObject newDeck(
        @RequestBody DeckRequest cards
    ) throws IOException {
        if(!LogRegController.MiddleWare(cards.getToken(), userRepository))
            return MainController.getERROR();
        Deck deck = new Deck(cards.getName(),
                cards.getIsPrivate(),
                cards.getIdUser(),
                cards.getDescription(),
                cards.getMainLang(),
                cards.getSecondLang(),
                cards.getPrice(),
                userRepository);
        System.out.println(cards.getMainLang());
        Deck _deck = deckRepository.save(deck);
        System.out.println(_deck.getId() + "\nUser: " + _deck.getAuthor().getId());
        cards.getCards().forEach(c -> {
            Card card = new Card(c.getMain_word(), c.getAnswer(), c.getType());
            card = cardRepository.save(card);
            System.out.println(card.getId());
            _deck.getCards().add(card);
        });
        deckRepository.save(_deck);
        return MainController.getSUCCESS();
    }

    @GetMapping("/get_decks")
    public JSONObject getDecks(
        @RequestBody GetDeckRequest request
    ){
        return MainController.getERROR();
    }
}

@Getter
@Setter
class BanalRequest{
    String token;
}

@Getter
@Setter
class GetDeckRequest extends BanalRequest{
    Integer userId;
}


@Getter
@Setter
class DeckRequest extends BanalRequest{
    String name;
    Boolean isPrivate;
    Integer idUser;
    String description;
    String mainLang;
    String secondLang;
    Integer price;
    List<ListBody> cards;
}

@Getter
@Setter
class ListBody{
    String main_word;
    String answer;
    String description;
    String type;
}