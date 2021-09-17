package com.nafanya.danil00t.RepDict.models;

import com.nafanya.danil00t.RepDict.funcs.JWTokenUtils;
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
        this.password = password;
        this.token = JWTokenUtils.GenerateJWToken(login, password);
        this.regDate = new Date();
        this.balance = 0;
        this.isChecked = false;
        this.role = 0;
        this.refer = null;
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

    private String login, password;

    @Column(name = "is_checked")
    private Boolean isChecked;

    private Integer balance;

    private String token;

    private Integer role;

    private String name;

    @Column(name = "reg_date")
    private Date regDate;

    private String refer;

//    @ManyToMany(cascade = CascadeType.ALL)
//    @JoinTable(name = "subscriptions",
//            joinColumns = {@JoinColumn(name = "user_id")},
//            inverseJoinColumns = {@JoinColumn(name = "card_id")})
//    private List<Card> subscriptions;

}
