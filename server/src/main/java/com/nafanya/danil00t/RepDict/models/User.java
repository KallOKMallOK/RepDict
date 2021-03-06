package com.nafanya.danil00t.RepDict.models;

import com.nafanya.danil00t.RepDict.funcs.JWTokenUtils;
import com.nafanya.danil00t.RepDict.repository.DeckRepository;
import com.nafanya.danil00t.RepDict.repository.SubscriptionRepository;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    public User(){
    }

    public User(String login, String password) throws IOException {
        this.login = login;
        this.token = JWTokenUtils.GenerateJWToken(login, password);
        this.regDate = new Date();
        this.balance = 0;
        this.isChecked = false;
        this.role = 0;
        this.refer = null;
        this.rating = 0;
        this.donatBalance = 0;
        this.averageRating = 0d;
        this.walkthroughs = 0;
        avatar = null;
        this.name = "окси";
    }

    public User(String login, String password, String name) throws IOException {
        this(login, password);
        this.name = name;
    }

    public User(String login, String password, String name, String refer) throws IOException {
        this(login, password, name);
        this.refer = refer;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String login;

    @Column(name = "is_checked")
    private Boolean isChecked;

    private Integer balance;

    @Column(name = "donat_balance")
    private Integer donatBalance;

    private String token;

    private Integer role;

    private String name;

    @Column(name = "last_worst_deck_creation")
    private Date lastWorstDeckCreation;

    private Integer rating;

    @Column(name = "reg_date")
    private Date regDate;

    private String refer;

    @Column(name = "average_rating")
    private Double averageRating;

    private Integer walkthroughs;

    private String avatar;

//    @ManyToMany(cascade = CascadeType.ALL)
//    @JoinTable(name = "decks",
//            joinColumns = {@JoinColumn(name = "id_owner")},
//            inverseJoinColumns = {@JoinColumn(name = "id")})
//    private List<Deck> owned;
//
//    @ManyToMany(cascade = CascadeType.ALL)
//    @JoinTable(name = "decks",
//            joinColumns = {@JoinColumn(name = "id")},
//            inverseJoinColumns = {@JoinColumn(name = "id_author")}
//    )
//    private List<Deck> authored;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinTable(name = "likes",
    joinColumns = {@JoinColumn(name = "id_user")},
    inverseJoinColumns = {@JoinColumn(name="id_deck")})
    private List<Deck> likesList;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinTable(name = "subscriptions",
    joinColumns = {@JoinColumn(name="id_user")},
    inverseJoinColumns = {@JoinColumn(name="id_deck")})
    private List<Deck> subscriptionDecks;

    public List<Deck> getOwned(DeckRepository deckRepository){
        return deckRepository.findAllByOwner(this);
    }

    public  List<Deck> getAuthored(DeckRepository deckRepository){
        return deckRepository.findAllByAuthor(this);
    }

    public List<Subscription> getSubscriptions(SubscriptionRepository subscriptionRepository){
        return subscriptionRepository.findAllByIdSubscriber(id);
    }
//    @ManyToMany(cascade = CascadeType.ALL)
//    @JoinTable(name = "subscriptions",
//            joinColumns = {@JoinColumn(name = "user_id")},
//            inverseJoinColumns = {@JoinColumn(name = "card_id")})
//    private List<Card> subscriptions;

}
