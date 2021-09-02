package com.nafanya.danil00t.RepDict.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "comments")
@Getter
@Setter
public class Comment {

    public Comment(){}

    public Comment(User user, String text){
        author = user;
        this.text = text;
        likes = 0;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @Column(name = "user_id")
    private User author;

    private String text;

    private Integer likes;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinTable(name = "cards_comments",
    joinColumns = {@JoinColumn(name = "comment_id")},
    inverseJoinColumns = {@JoinColumn(name = "card_id")})
    private Card card;

}
