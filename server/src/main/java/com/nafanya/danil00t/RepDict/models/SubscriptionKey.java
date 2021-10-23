package com.nafanya.danil00t.RepDict.models;

import lombok.Data;

import java.io.Serializable;

@Data
public class SubscriptionKey implements Serializable {

    static final long serialVersionUID = 1L;

    private User user;

    private Deck deck;

}
