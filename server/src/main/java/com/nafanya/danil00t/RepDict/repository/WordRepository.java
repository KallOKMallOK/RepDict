package com.nafanya.danil00t.RepDict.repository;

import com.nafanya.danil00t.RepDict.models.Card;
import com.nafanya.danil00t.RepDict.models.User;
import com.nafanya.danil00t.RepDict.models.Word;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface WordRepository extends CrudRepository<Word, Integer> {

    public List<Word> findByFirstWord(String first_word);

    public Word findByFirstWordAndSecondWord(String first_word, String second_word);

    boolean existsByFirstWordAndSecondWord(String first_word, String second_word);

}
