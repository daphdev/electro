package com.electro.service.authetication;

import com.electro.config.security.UserDetailsImpl;
import com.electro.entity.authentication.RefreshToken;
import com.electro.exception.TokenRefreshException;
import com.electro.repository.authentication.RefreshTokenRepository;
import com.electro.repository.authentication.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class RefresherTokenServiceImpl implements RefreshTokenService {

    public static int REFRESH_TOKEN_DURATION_MS = 86400000;

    private UserRepository userRepository;

    private RefreshTokenRepository refreshTokenRepository;

    @Override
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    @Override
    public RefreshToken createRefreshToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(userRepository.findByUsername(userPrincipal.getUsername()).get());
        refreshToken.setExpiryDate(Instant.now().plusMillis(REFRESH_TOKEN_DURATION_MS));
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken = refreshTokenRepository.save(refreshToken);

        return refreshToken;
    }

    @Override
    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException( "Refresh token was expired. Please make a new signin request");
        }

        return token;
    }
}
