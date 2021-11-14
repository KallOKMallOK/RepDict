package com.nafanya.danil00t.RepDict.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "user_card")
@IdClass(CardRatingKey.class)
public class CardRating {

    public CardRating() { }

    public CardRating(User user, Card card){
        idSubscriber = user.getId();
        idCard = card.getId();
        answerRating = 0;
    }

    public CardRating(User user, Integer idCard){
        idSubscriber = user.getId();
        this.idCard = idCard;
        answerRating = 0;
    }

    @Id
    @Column(name = "id_user")
    private Integer idSubscriber;

    @Id
    @Column(name = "id_card")
    private Integer idCard;

    @Column(name = "answer_rating", columnDefinition = "int default 0")
    private Integer answerRating;
}