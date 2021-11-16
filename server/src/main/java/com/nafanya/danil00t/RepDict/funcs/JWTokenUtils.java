package com.nafanya.danil00t.RepDict.funcs;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

public class JWTokenUtils {

    public static String generateJWToken(String login, String password) throws IOException {

        Map<String, Object> claims = new HashMap<>();
        claims.put("login", login);
        claims.put("password", password);

        String key = Files.lines(Paths.get("src/main/resources/key")).collect(Collectors.joining());

        String token = Jwts.builder().setHeaderParam("alg", "HS256").setHeaderParam("typ", "JWT")
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
        return token;
    }

    public static Jws<Claims> parseJWToken(String token) throws IOException {
        String key = Files.lines(Paths.get("src/main/resources/key")).collect(Collectors.joining());
        return Jwts.parser().setSigningKey(key).parseClaimsJws(token);
    }

    public static String getPasswordFromJWToken(String token) throws IOException {
        Jws<Claims> jws = parseJWToken(token);

        String pass = (String) jws.getBody().get("password");

        return pass;
    }

    public static String getLoginFromJWToken(String token) throws IOException {
        Jws<Claims> jws = parseJWToken(token);

        String login = (String) jws.getBody().get("login");

        return login;
    }

//    public static Integer get


}
