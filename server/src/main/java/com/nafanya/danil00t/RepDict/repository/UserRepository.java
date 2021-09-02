package com.nafanya.danil00t.RepDict.repository;

import com.nafanya.danil00t.RepDict.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Integer> {

    List<User> findByLogin(String login);

    User getById(Integer id);

    boolean existsByLogin(String login);

}
