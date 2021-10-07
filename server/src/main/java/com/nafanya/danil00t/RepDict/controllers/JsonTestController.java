//package com.nafanya.danil00t.RepDict.controllers;
//
//import com.nafanya.danil00t.RepDict.funcs.JWTokenUtils;
//import com.nafanya.danil00t.RepDict.funcs.JsonUtils;
//import com.nafanya.danil00t.RepDict.models.User;
//import com.nafanya.danil00t.RepDict.repository.CardRepository;
//import com.nafanya.danil00t.RepDict.repository.UserRepository;
//import org.jboss.jandex.Main;
//import org.json.simple.JSONObject;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.io.IOException;
//
//@RestController
//public class JsonTestController {
//
//    @Autowired
//    CardRepository cardRepository;
//
//    @Autowired
//    UserRepository userRepository;
//
//    @GetMapping("/smoke")
//    public Object go(){
//        return JsonUtils.getCardInfo(cardRepository.findById(1).get());
//    }
//
//    @GetMapping("/jwt")
//    public JSONObject Jwt(){
//
//        for(User user : userRepository.findAll()){
//            try {
//                user.setToken(JWTokenUtils.GenerateJWToken(user.getLogin(), user.getPassword()));
//                userRepository.save(user);
//            }
//            catch (Exception exc){
//                System.err.println("жес");
//            }
//        }
//
//        return MainController.getSuccess();
//    }
//
//}
