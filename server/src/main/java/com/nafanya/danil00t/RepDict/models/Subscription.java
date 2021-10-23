package com.nafanya.danil00t.RepDict.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@IdClass(SubscriptionKey.class)
@Table(name = "subscriptions")
public class Subscription {
    @Id
    @Column(name = "id_user")
    private User user;

    @Id
    @Column(name = "id_deck")
    private Deck deck;

    @Column(name = "play_count")
    private Integer playCount;

    @Column(name = "average_rating")
    private Integer averageRating;
}
