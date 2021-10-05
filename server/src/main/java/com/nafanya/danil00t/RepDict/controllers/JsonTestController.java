package com.nafanya.danil00t.RepDict.controllers;

import com.nafanya.danil00t.RepDict.funcs.JsonUtils;
import com.nafanya.danil00t.RepDict.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JsonTestController {

    @Autowired
    CardRepository cardRepository;

    @GetMapping("/smoke")
    public Object go(){
        return JsonUtils.getCardInfo(cardRepository.findById(1).get());
    }

}
