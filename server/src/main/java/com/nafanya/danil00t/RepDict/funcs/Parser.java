package com.nafanya.danil00t.RepDict.funcs;

import com.nafanya.danil00t.RepDict.controllers.MainController;
import com.nafanya.danil00t.RepDict.models.Card;
import com.nafanya.danil00t.RepDict.models.Deck;
import com.nafanya.danil00t.RepDict.repository.CardRepository;
import com.nafanya.danil00t.RepDict.repository.DeckRepository;
import com.nafanya.danil00t.RepDict.repository.UserRepository;
import lombok.Getter;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Parser {
    @Getter
    private static final String ENGLISH_LIBRARY_URL = "https://reallanguage.club/";
    private static final IOException EXCEPTION = new IOException("error");

    public static JSONObject parseUrl(String route,
                                      UserRepository userRepository,
                                      DeckRepository deckRepository,
                                      CardRepository cardRepository,
                                      Integer userId) throws IOException {
        Document document = Jsoup.parse(new URL(route), 100000);
        Element name = document.select("div[class=text__main]").select("h1").first();
        Pattern pattern = Pattern.compile("«.*»");
        Matcher matcher = pattern.matcher(name.text());
        String deckName;
        if(matcher.find())
            deckName = matcher.group().replaceAll("[«,»]", "");
        else
            throw EXCEPTION;
        Elements table = document.select("tbody").select("tr");
        Deck deck = new Deck(deckName,
                false,
                userId,
                "Взято с " + route,
                "ENG",
                "RUS",
                0,
                userRepository);
        JSONArray cardArray = new JSONArray();
        table.forEach(element -> {
            Card card = new Card(
                    element.
                            select("td").
                            first().
                            select("strong").
                            first().
                            text(),
                    element.
                            select("td").
                            get(2).
                            select("span").
                            first().
                            text().
                            replaceAll(", |; ", "|").
                            replaceAll(" *\\(.*\\) *", ""),
                    "default",
                    element.
                            select("td").
                            get(1).
                            select("span").
                            first().
                            text()
            );
            cardRepository.save(card);
            deck.getCards().add(card);
            cardArray.add(card);
        });
        deck.setCountWords(deck.getCards().size());
        deckRepository.save(deck);
        return MainController.getError();
    }

}
