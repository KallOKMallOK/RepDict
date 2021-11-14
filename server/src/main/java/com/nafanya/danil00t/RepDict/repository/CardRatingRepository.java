package com.nafanya.danil00t.RepDict.repository;

import com.nafanya.danil00t.RepDict.models.CardRating;
import com.nafanya.danil00t.RepDict.models.CardRatingKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardRatingRepository extends JpaRepository<CardRating, CardRatingKey> {
    List<CardRating> findAllByIdSubscriberOrderByAnswerRatingAsc(Integer idSubscriber);

    List<CardRating> findAllByIdCard(Integer idCard);
}
