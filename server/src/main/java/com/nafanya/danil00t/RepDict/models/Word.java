package com.nafanya.danil00t.RepDict.models;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "words")
public class Word {

    public Word(){
    }

    public Word(String firstWord, String secondWord){
        this.firstWord = firstWord;
        this.secondWord = secondWord;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "first_word")
    private String firstWord;

    @Column(name = "second_word")
    private String secondWord;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "cards_words",
    joinColumns = {@JoinColumn(name = "id_word")},
    inverseJoinColumns = {@JoinColumn(name = "id_card")})
    private List<Card> cards;

    public String toString(){
        return ""+ id + ". " + firstWord + " - " + secondWord;
    }

}
