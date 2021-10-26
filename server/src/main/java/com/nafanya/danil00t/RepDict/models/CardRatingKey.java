package com.nafanya.danil00t.RepDict.models;

import lombok.Data;

import javax.persistence.Column;
import java.io.Serializable;

@Data
public class CardRatingKey implements Serializable {

    static final long serialVersionUID = 1L;

    @Column(name = "id_user")
    private Integer idSubscriber;

    @Column(name = "id_card")
    private Integer idCard;

    public CardRatingKey() { }

    public CardRatingKey(Integer idSubscriber, Integer idCard){
        this.idSubscriber = idSubscriber;
        this.idCard = idCard;
    }

}
