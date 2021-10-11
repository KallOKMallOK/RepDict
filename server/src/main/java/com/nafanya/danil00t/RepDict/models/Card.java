package com.nafanya.danil00t.RepDict.models;

import com.nafanya.danil00t.RepDict.controllers.CardsController;
//import com.nafanya.danil00t.RepDict.repository.WordRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Entity
@Table(name = "cards")
public class Card {

    public Card(){
    }

    public Card(String mainWord,
                String answer,
                String type){
        this.mainWord = mainWord;
        this.answer = answer;
        this.type = type;
        generateRating();
    }

    public Card(String mainWord,
                String answer,
                String type,
                String description){
        this(mainWord, answer, type);
        this.description = description;
    }
    /*public Card(String name, User user, Integer cost){
        this.name = name;
        this.user = user;
        this.cost = cost;
        this.subscribers = new ArrayList<>();
        subscribers.add(user);
        this.words = new ArrayList<>();
    }*/

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String description;

    @JoinColumn(name = "main_word")
    private String mainWord;

    private String answer;

    private String type;

    private Integer rating;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "decks_cards",
            joinColumns = {@JoinColumn(name = "id_card")},
            inverseJoinColumns = {@JoinColumn(name = "id_deck")})
    private List<Deck> decks;
    //===============================
/*
    private String name;

    private Integer cost;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "parent_id")
    private Card parent;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "author_id")
    private User user;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "cards_words",
            joinColumns = {@JoinColumn(name = "id_card")},
            inverseJoinColumns = {@JoinColumn(name = "id_word")})
    private List<Word> words;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "subscriptions",
    joinColumns = {@JoinColumn(name = "card_id")},
    inverseJoinColumns = {@JoinColumn(name = "user_id")})
    private List<User> subscribers;
    */

//    @OneToMany(cascade = CascadeType.ALL)
//    @JoinTable(name = "cards_comments",
//            inverseJoinColumns = {@JoinColumn(name = "comment_id")},
//            joinColumns = {@JoinColumn(name = "card_id")})
//    private List<Comment> comments;

    public void generateRating(){
        switch(this.type){
            case "Choice":
                String[] answers = this.answer.split("[\\^\\$]:");
                rating = 1 + mainWord.length() / 5;
                for(String a : answers){
                    rating += 1 + a.length() / 5;
                }
                rating /= answers.length;
                break;
            default:
                rating = 1 + mainWord.length() / 5;
                rating += 1 + answer.length() / 5;
                break;
        }
    }

}
