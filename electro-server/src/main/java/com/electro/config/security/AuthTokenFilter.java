package com.electro.config.security;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Data
public class AuthTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = parseJwt(request);

            log.info("jwt after parse" + jwt);

            if(jwt != null && jwtUtil.validateJwtToken(jwt)){
                // lay username tu token ra
                String username = jwtUtil.getUsernameFromJwt(jwt);
                // gen username ra User-detail
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                // Luu doi tuong authentication vao trong security-context
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }catch (Exception exception){
            log.error("Cannot set user authentication {}", exception);
        }
        filterChain.doFilter(request, response);
    }

    private String parseJwt(HttpServletRequest request){

        String headerAuth =  request.getHeader("Authorization");

        log.info("JWT from request"+headerAuth);

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")){
            return headerAuth.substring(7, headerAuth.length());
        }

        return  null;
    }
}
