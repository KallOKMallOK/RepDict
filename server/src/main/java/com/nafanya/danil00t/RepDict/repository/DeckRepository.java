package com.nafanya.danil00t.RepDict.repository;

import com.nafanya.danil00t.RepDict.models.Deck;
import com.nafanya.danil00t.RepDict.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeckRepository extends JpaRepository<Deck, Integer> {

    List<Deck> findAllByOwner(User owner);

    List<Deck> findAllByOrderByIdDesc();

    List<Deck> findAllByOwnerOrderByIdDesc(User owner);

    List<Deck> findAllByAuthor(User author);

    Deck getDeckByAuthorAndIsWorst(User author, Boolean isWorst);

}
