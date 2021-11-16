//package com.nafanya.danil00t.RepDict.config;
//
//import com.nafanya.danil00t.RepDict.models.User;
//import com.nafanya.danil00t.RepDict.repository.UserRepository;
//import io.jsonwebtoken.lang.Collections;
//import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
//import org.springframework.boot.autoconfigure.security.oauth2.resource.PrincipalExtractor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//
//import java.util.Collection;
//
//@Configuration
//@EnableWebSecurity
//@EnableOAuth2Sso
//public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.authorizeRequests()
//                .mvcMatchers("/**").permitAll();
////                .anyRequest().authenticated()
////                .and()
////                .csrf().disable();
//    }
//
////    @Bean
////    public PrincipalExtractor principalExtractor(UserRepository userRepository){
////        System.out.println("DAROVA");
////        return map -> {
////
////            for (String s : map.keySet()) {
////                System.out.println(s);
////            }
////            return new User();
////        };
////    }
//}