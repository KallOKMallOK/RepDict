package com.nafanya.danil00t.RepDict.repository;

import com.nafanya.danil00t.RepDict.models.Subscription;
import com.nafanya.danil00t.RepDict.models.SubscriptionKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription, SubscriptionKey> {

}
