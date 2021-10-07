package com.nafanya.danil00t.RepDict.controllers;

import com.nafanya.danil00t.RepDict.funcs.JWTokenUtils;
import com.nafanya.danil00t.RepDict.funcs.JsonUtils;
import com.nafanya.danil00t.RepDict.models.User;
import com.nafanya.danil00t.RepDict.repository.UserRepository;
import com.sun.istack.NotNull;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.Getter;
import lombok.Setter;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@CrossOrigin
@RestController
public class LogRegController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public JSONObject login(
            @RequestBody UserRequest data
//            @RequestParam String login,
//            @RequestParam String password
    ) throws IOException {
        String login = data.getLogin();
        String password = data.getPassword();
        if(!userRepository.existsByLogin(login))
            return MainController.getError();
        User user = userRepository.findByLogin(login).get(0);
        try {
            if (!JWTokenUtils.getPasswordFromJWToken(user.getToken()).equals(password))
                return MainController.getError();
        }
        catch (IOException exception){
            throw exception;
        }
        return JsonUtils.getUserJson(user);

    }

    @PostMapping("/registration")
    public JSONObject registration(//@RequestParam String token,
                                   //@RequestParam JSONObject data,
                                   @RequestBody UserRequest data
//                                   @RequestParam(name = "login", required=false) String login,
//                                   @RequestParam(required=false) String password,
//                                   @RequestParam(required=false) String name
                                   //@RequestParam String name
                                   /*,@RequestParam String refer*/) throws IOException {
        String login = data.getLogin();
        String name = data.getName();
        String password = data.getPassword();

        if(userRepository.existsByLogin(login))
            return MainController.getError();
        else {
            User user = new User(login, password, name/*, refer*/);
            if(!JWTokenUtils.getPasswordFromJWToken(user.getToken()).equals(password))
                return MainController.getError();
            user.setIsChecked(false);
            userRepository.save(user);
        }
        return JsonUtils.getUserJson(userRepository.findByLogin(login).get(0));
    }

    @GetMapping("/auth")
    public JSONObject auth(@RequestParam String token) throws IOException {
        return (findUserByToken(token, userRepository) == null) ? MainController.getError() : MainController.getSuccess();
    }

    private static User findUserByToken(String token, UserRepository userRepository) throws IOException{
        Jws<Claims> jws = JWTokenUtils.parseJWToken(token);

        String login = (String) jws.getBody().get("login");
        String password = (String) jws.getBody().get("password");

        if(!userRepository.existsByLogin(login))
            return null;
        User user = userRepository
                .findByLogin(login)
                .get(0);
        if(!JWTokenUtils.getPasswordFromJWToken(user.getToken())
                .equals(password)
        )
            return null;
        return user;
    }

    public static boolean MiddleWare(String token, UserRepository userRepository) throws IOException {
        return findUserByToken(token, userRepository) != null;
    }

    public static boolean MiddleWareIsAdmin(String token, UserRepository userRepository) throws  IOException{
        User user = findUserByToken(token, userRepository);
        if(user == null)
            return false;
        return user.getRole().equals(1);
    }
}


@Getter
@Setter
class UserRequest{
    @NotNull
    String login;
//    @NotNull
    String name;
    @NotNull
    String password;
//    String token;
}
