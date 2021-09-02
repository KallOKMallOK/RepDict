package com.nafanya.danil00t.RepDict.controllers;
import com.nafanya.danil00t.RepDict.funcs.JsonUtils;
import com.nafanya.danil00t.RepDict.models.Card;
import com.nafanya.danil00t.RepDict.models.User;
import com.nafanya.danil00t.RepDict.repository.CardRepository;
import com.nafanya.danil00t.RepDict.repository.UserRepository;
import com.nafanya.danil00t.RepDict.repository.WordRepository;
import lombok.Getter;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class MainController {

    private static JSONObject createError(){
        JSONObject o = new JSONObject();
        o.put("data", "error");
        return o;
    }

    @Getter
    private static final JSONObject ERROR = createError();

    private static final String KEY = "iodfgifdiogjv537489jdhknmvbnc5\"trolling\"ncnvbm, what? let's gosajlnvxc";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private WordRepository wordRepository;

    @GetMapping("/")
    public String main() {
        return "Главная страница сервера.";
    }

    @GetMapping("/users")
    public JSONObject users(){
        return JsonUtils.parseUsers(userRepository.findAll());
    }

    @GetMapping("/u{id}/subscriptions")
    public JSONObject userSubscriptions(@PathVariable(value = "id") Integer id){
        if(!userRepository.existsById(id)) {
            return ERROR;
        }
        return JsonUtils.parseCards(userRepository.getById(id).getSubscriptions());
    }

    @GetMapping("/u{id}/works")
    public JSONObject userWorks(@PathVariable(value = "id") Integer id){
        if(!userRepository.existsById(id)) {
            return ERROR;
        }
        User user = userRepository.getById(id);
        List<Card> works = user.getSubscriptions()
                .stream()
                .filter(card -> card.getUser().equals(user))
                .collect(Collectors.toList());
        return JsonUtils.parseCards(works);
    }

    @GetMapping("/u{u_id}/c{c_id}")
    public JSONObject cardDetails(
            @PathVariable(value = "u_id") Integer u_id,
            @PathVariable(value = "c_id") Integer c_id){
        if(!userRepository.existsById(u_id) || !cardRepository.existsById(c_id))
            return ERROR;
        Card card = cardRepository.getById(c_id);
        if(!card.getUser().getId().equals(u_id))
            return ERROR;
        return JsonUtils.getWordsInfo(card.getWords());
    }

    @PostMapping("/u{u_id}/check")
    public JSONObject checkUser(
            @RequestParam(value = "key") String key,
            @PathVariable(value = "u_id") Integer userId
            ){
        if(!userRepository.existsById(userId) || !key.equals(KEY))
            return ERROR;
        User user = userRepository.findById(userId).get();
        user.setIsChecked(true);
        userRepository.save(user);
        JSONObject object = new JSONObject();
        object.put("status", "success");
        return object;
    }
}