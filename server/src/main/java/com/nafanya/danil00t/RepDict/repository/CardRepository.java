package com.nafanya.danil00t.RepDict.repository;

import com.nafanya.danil00t.RepDict.models.Card;
import com.nafanya.danil00t.RepDict.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Integer> {
    
//    List<Card> findByUser(User user);

//    List<Card> findByUserAndName(User user, String name);

//    boolean existsByUserAndName(User user, String name);

}
