package com.nafanya.danil00t.RepDict.controllers;

import com.nafanya.danil00t.RepDict.models.User;
import com.nafanya.danil00t.RepDict.repository.UserRepository;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BalanceController {

    @Autowired
    private UserRepository userRepository;

    /* TODO:
        * СДЕЛАТЬ РЕАЛЬНОЕ ВЗАИМОДЕЙСТВИЕ С ПЛАТЕЖНОЙ СИСТЕМОЙ И СОЕДЕНИТЬ ЭТО С ПОДПИСКОЙ ПРИ НЕНУЛЕВОЙ ЦЕНЕ
     */

    // ------------- ЗАГЛУШКА ------------- //
    @GetMapping("/u{u_id}/add_to_balance")
    public JSONObject changeBalance(@PathVariable(value = "u_id") Integer userId,
                                    @RequestParam(value = "sum") Integer sum){
        if(!userRepository.existsById(userId))
            return MainController.getERROR();
        User user = userRepository.getById(userId);
        user.setBalance(user.getBalance() + sum);
        return MainController.getSUCCESS();
    }

}
