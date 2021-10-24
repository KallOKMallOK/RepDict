package com.nafanya.danil00t.RepDict.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import java.io.Serializable;

@Data
public class SubscriptionKey implements Serializable {
    static final long serialVersionUID = 1L;

    @Column(name = "id_user")
    private Integer idSubscriber;

    @Column(name = "id_deck")
    private Integer idDeck;

    public SubscriptionKey(){ }

    public SubscriptionKey(User user, Deck deck){
        this.idDeck = deck.getId();
        this.idSubscriber = user.getId();
    }
}
