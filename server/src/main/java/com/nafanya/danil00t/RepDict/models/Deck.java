package com.nafanya.danil00t.RepDict.models;

import com.nafanya.danil00t.RepDict.controllers.DecksController;
import com.nafanya.danil00t.RepDict.funcs.JWTokenUtils;
import com.nafanya.danil00t.RepDict.repository.UserRepository;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "decks")
public class Deck {

    public Deck(){}

    public Deck(String name,
                Boolean isPrivate,
                Integer idUser,
                String description,
                String mainLang,
                String secondLang,
                Integer price,
                UserRepository userRepository){
        User user = userRepository.getById(idUser);
        this.author = user;
        this.countRepetitions = 0;
        this.countWords = 0;
        this.isPrivate = isPrivate ? 1 : 0;
        this.name = name;
        this.description = description;
        this.mainLanguage = mainLang;
        this.secondLanguage = secondLang;
        this.owner = user;
        this.price = price;
        this.likes = 0;
        cards = new ArrayList<Card>();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private Integer likes;

    @JoinColumn(name = "count_words")
    private Integer countWords;

    @JoinColumn(name = "count_repetitions")
    private Integer countRepetitions;

    @JoinColumn(name = "is_private")
    private Integer isPrivate;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_author")
    private User author;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_owner")
    private User owner;

    private String description;

    @Column(name = "main_lang")
    private String mainLanguage;

    @Column(name = "second_lang")
    private String secondLanguage;

    private Integer price;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "decks_cards",
            joinColumns = {@JoinColumn(name = "id_deck")},
            inverseJoinColumns = {@JoinColumn(name = "id_card")})
    private List<Card> cards;

    public void addCard(Card card){
        this.cards.add(card);
    }

}
