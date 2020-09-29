package com.example.springonlinecard.service;

import com.example.springonlinecard.dao.domain.CardUsers;
import com.example.springonlinecard.dao.domain.UserPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserPrincipalService implements UserDetailsService {

    private final UserService userService;

    public UserPrincipalService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        CardUsers user = userService.getByUsername(s);
        return new UserPrincipal(user);
    }
}
