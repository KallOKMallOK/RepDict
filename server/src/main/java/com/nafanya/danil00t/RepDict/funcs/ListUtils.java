package com.nafanya.danil00t.RepDict.funcs;

import com.nafanya.danil00t.RepDict.models.Deck;
import com.nafanya.danil00t.RepDict.models.User;

import java.util.List;

public class ListUtils {

    public static List<User> getPageListUser(List<User> list, Integer onePageExemplars, Integer page){
        int fromIndex, toIndex;
        fromIndex = onePageExemplars * (page - 1);
        if(fromIndex >= list.size())
            return null;
        toIndex = Math.min(fromIndex + onePageExemplars, list.size());
        return list.subList(fromIndex, toIndex);
    }

    public static List<Deck> getPageListDeck(List<Deck> list, Integer onePageExemplars, Integer page){
        int fromIndex, toIndex;
        fromIndex = onePageExemplars * (page - 1);
        if(fromIndex >= list.size())
            return null;
        toIndex = Math.min(fromIndex + onePageExemplars, list.size());
        return list.subList(fromIndex, toIndex);
    }

}
