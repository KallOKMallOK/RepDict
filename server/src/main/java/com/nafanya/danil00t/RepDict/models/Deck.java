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

    public Deck(Deck deck, User owner){
        author = deck.getAuthor();
        countRepetitions = 0;
        countWords = deck.getCountWords();
        isPrivate = deck.getIsPrivate();
        description = deck.getDescription();
        mainLanguage = deck.getMainLanguage();
        secondLanguage = deck.getSecondLanguage();
        likes = 0;
        price = 0;
        this.owner = owner;
        name = deck.getName() + " (clone)";
        cards = new ArrayList<Card>();
        for(Card card : deck.getCards()){
            cards.add(new Card(card));
        }
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

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_author")
    private User author;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_owner")
    private User owner;

    private String description;

    @Column(name = "main_lang")
    private String mainLanguage;

    @Column(name = "second_lang")
    private String secondLanguage;

    private Integer price;

    @Column(name = "is_worst", columnDefinition = "bool default false")
    private Boolean isWorst;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "decks_cards",
            joinColumns = {@JoinColumn(name = "id_deck")},
            inverseJoinColumns = {@JoinColumn(name = "id_card")})
    private List<Card> cards;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinTable(name = "subscriptions",
            joinColumns = {@JoinColumn(name="id_deck")},
            inverseJoinColumns = {@JoinColumn(name="id_user")})
    private List<User> subscribers;

    public void addCard(Card card){
        this.cards.add(card);
    }

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinTable(name = "likes",
            joinColumns = {@JoinColumn(name = "id_deck")},
            inverseJoinColumns = {@JoinColumn(name="id_user")})
    private List<User> likesList;

}
