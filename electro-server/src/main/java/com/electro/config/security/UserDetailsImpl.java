package com.electro.config.security;

import com.electro.entity.authentication.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Value
@AllArgsConstructor
public class UserDetailsImpl implements UserDetails {

    Long id;

    String username;

    @JsonIgnore
    String password;

    Collection<? extends GrantedAuthority> authorities;

    public static UserDetailsImpl build(User user) {
        log.info("Start build UserDetails");

        // Lấy danh sách role truyền vào SimpleGrantedAuthority
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getCode()))
                .collect(Collectors.toList());

        return new UserDetailsImpl(user.getId(), user.getUsername(), user.getPassword(), authorities);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
