package com.nafanya.danil00t.RepDict.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@Table(name = "subscriptions")
@IdClass(SubscriptionKey.class)
public class Subscription {

    public Subscription(){}

    public Subscription(User user, Deck deck){
        idSubscriber = user.getId();
        idDeck = deck.getId();
        playCount = 0;
        averageRating = 0D;
    }

    @Id
    @Column(name = "id_user")
    private Integer idSubscriber;

    @Id
    @Column(name = "id_deck")
    private Integer idDeck;

    @Column(name = "play_count", columnDefinition = "int default 0")
    private Integer playCount;

    @Column(name = "average_rating", columnDefinition = "int default 0")
    private Double averageRating;
}