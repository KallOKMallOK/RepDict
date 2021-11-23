package com.nafanya.danil00t.RepDict.controllers;

import com.nafanya.danil00t.RepDict.funcs.JWTokenUtils;
import com.nafanya.danil00t.RepDict.funcs.JsonUtils;
import com.nafanya.danil00t.RepDict.funcs.ListUtils;
import com.nafanya.danil00t.RepDict.models.Deck;
import com.nafanya.danil00t.RepDict.models.SubscriptionKey;
import com.nafanya.danil00t.RepDict.models.User;
import com.nafanya.danil00t.RepDict.repository.*;
import lombok.Getter;
import lombok.Setter;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController
@CrossOrigin
public class UserController {
    @Getter
    private static final Integer USERS_ON_PAGE = 9;

    @Autowired
    SubscriptionRepository subscriptionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CardRepository cardRepository;

    @Autowired
    DeckRepository deckRepository;

    @Autowired
    CardRatingRepository cardRatingRepository;

    @Value("${upload.path}")
    private String uploadAvatarPath;

    @PostMapping("/avatar")
    public JSONObject uploadAvatar(
            @RequestParam String token,
            @RequestParam("file") MultipartFile file
            ) throws IOException{
        if(file == null || !LogRegController.MiddleWare(token, userRepository))
            return MainController.getError();
        File uploadDir = new File(uploadAvatarPath);
        if(!uploadDir.exists())
            uploadDir.mkdir();
        User user = userRepository.getByLogin(
//                "admin"
                JWTokenUtils.getLoginFromJWToken(token)
        );
        String avatarName = user.getLogin() + "." + file.getOriginalFilename().
                substring(file.getOriginalFilename().lastIndexOf(".") + 1);
        file.transferTo(new File(uploadAvatarPath + "/" + avatarName));
        user.setAvatar(avatarName);
        userRepository.save(user);
        return MainController.getSuccess();
    }

    @GetMapping("/rating")
    public JSONObject rating(
            @RequestParam(defaultValue = "1") Integer page
    ) throws IOException {
        JSONObject object = MainController.getSuccess();
        Integer pages = ((int) (userRepository.findAllByOrderByRatingDesc().size() / USERS_ON_PAGE)) +  1;
        object.put("pages", pages);
        List<User> users = ListUtils.getPageListUser(userRepository.findAllByOrderByRatingDesc(), USERS_ON_PAGE, page);
        if(users == null)
            return MainController.getError();
        JSONArray userArray = new JSONArray();
        users.forEach(u -> userArray.add(JsonUtils.getUserRatingJson(u)));
        object.put("users", userArray);
        return object;
    }

    @GetMapping("/user")
    public JSONObject user(
            @RequestParam String login,
            @RequestParam(required = false) String token,
            @RequestParam(defaultValue = "1") Integer page
    ) throws IOException{
        if(token != null)
            if(!LogRegController.MiddleWare(token, userRepository) || !userRepository.existsByLogin(login))
                return MainController.getError();
        JSONObject object;
        User user = userRepository.getByLogin(login);
        if(user == null)
            return MainController.getError();
        if(token == null)
            object = JsonUtils.getUserPublicJson(userRepository.getByLogin(login), page, deckRepository);
        else
            object = JsonUtils.getUserPublicJson(userRepository.getByLogin(login),
                    page,
                    deckRepository,
                    userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(token)));
        if(object == null)
            return MainController.getError();
        return object;
    }
    @Value("${worst.top.count}")
    private int TOP_COUNT;
    @GetMapping("/worst_decks")
    public JSONObject getWorstDecks(
            @RequestParam String token
    ) throws IOException {

        if(!LogRegController.MiddleWare(token, userRepository))
            return MainController.getError();
        @Getter
        @Setter
        class DeckWorstWalkthroughs{
            Deck deck;
            Double percent;

            public DeckWorstWalkthroughs(Deck deck, Double averageRating){
                this.deck = deck;
                percent = averageRating/BalanceController.getMaximumRating(deck);
            }
        }
        Comparator<DeckWorstWalkthroughs> comparator = (o1, o2) -> o1.percent.compareTo(o2.percent);
        User user = userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(token));
        ArrayList<DeckWorstWalkthroughs> list = new ArrayList<>();
        for(Deck deck : user.getSubscriptionDecks()){
            list.add(new DeckWorstWalkthroughs(deck, subscriptionRepository.getById(new SubscriptionKey(user, deck)).getAverageRating()));
        }
        Collections.sort(list, comparator.reversed());
        JSONObject object = MainController.getSuccess();
        JSONArray decksArray = new JSONArray();
        for(int i = 0; i < Math.min(TOP_COUNT, list.size()); i++){
            decksArray.add(JsonUtils.getDeckJson(list.get(i).deck, user));
        }
        object.put("decks", decksArray);
        return object;
    }

    @PostMapping("/change_user")
    public JSONObject changeUser(
            @RequestBody UserChangeRequest request
    ) throws IOException {
        if(!LogRegController.MiddleWare(request.getToken(), userRepository))
            return MainController.getError();
        User user = userRepository.getByLogin(JWTokenUtils.getLoginFromJWToken(request.getToken()));
        request.payload.forEach(payload -> changeUserSwitch(payload, user));
        JSONObject object = MainController.getSuccess();
        object.put("token", user.getToken());
        return object;
    }

    private void changeUserSwitch(JSONObject payload, User user) {
        switch ((String) payload.get("name")) {
            case "password":
                String password = (String) payload.get("value");
                try {
                    String token = JWTokenUtils.generateJWToken(user.getLogin(), password);
                    user.setToken(token);
                } catch (IOException ignore) { }
                break;
            case "name":
                user.setName((String) payload.get("value"));
                break;
            default:
                break;
        }
        userRepository.save(user);
    }
}
@Getter
@Setter
class UserChangeRequest extends BanalRequest {
    List<JSONObject> payload;
}