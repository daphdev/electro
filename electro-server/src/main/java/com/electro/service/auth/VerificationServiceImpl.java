package com.electro.service.auth;

import com.electro.dto.authentication.RegistrationRequest;
import com.electro.dto.authentication.UserRequest;
import com.electro.entity.authentication.Role;
import com.electro.entity.authentication.User;
import com.electro.entity.authentication.Verification;
import com.electro.exception.CommonException;
import com.electro.exception.ExpiredTokenException;
import com.electro.mapper.authentication.UserMapper;
import com.electro.repository.authentication.UserRepository;
import com.electro.repository.authentication.VerificationRepository;
import com.electro.service.email.EmailSenderService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.SQLException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

@Service
@AllArgsConstructor
@Transactional(rollbackOn = {Exception.class, Throwable.class, SQLException.class, CommonException.class},
        dontRollbackOn = {ExpiredTokenException.class})
public class VerificationServiceImpl implements VerificationService {

    private UserRepository userRepository;

    private VerificationRepository verificationRepository;

    private UserMapper userMapper;

    private EmailSenderService emailSender;

    @Override

    public Long generateTokenVerify(UserRequest userRequest) {
        // check if username existing in database
        if (userRepository.existsUserByUsername(userRequest.getUsername())){
            throw new CommonException("username is existing");
        }

        // check if email existing in database
        if (userRepository.existsUserByEmail(userRequest.getEmail())){
            throw new CommonException("email is existing");
        }

        // create user entity(status = false) and set role Customer
        User user = userMapper.requestToEntity(userRequest);
        user.setStatus(2);

        Set<Role> roles = new HashSet<Role>();
        Role role = new Role();
        role.setId(3L);
        roles.add(role);
        user.setRoles(roles);
        userRepository.save(user);

        // step 3 create new verification entity and set user, token
        Verification verification = new Verification();
        Random ran = new Random();
        String token = String.format("%04d", ran.nextInt(10000));
        verification.setToken(token);
        verification.setUser(user);
        verification.setExpiredAt(Instant.now().plus(5, ChronoUnit.MINUTES));
        verificationRepository.save(verification);

        // send email
        emailSender.sendTokenVerification(user.getEmail(), token);
        return user.getId();
    }

    @Override
    public void resendRegistrationToken(Long userID) {
        Optional<Verification>  verifyOptional = verificationRepository.findVerificationByUserId(userID);
        if(verifyOptional.isPresent()){
            Random ran = new Random();
            String token = String.format("%04d", ran.nextInt(10000));
            Verification verification = verifyOptional.get();
            verification.setToken(token);
            verification.setExpiredAt(Instant.now().plus(5, ChronoUnit.MINUTES));
            verificationRepository.save(verification);
            emailSender.sendTokenVerification(verification.getUser().getEmail(), token);
        }else{
            throw new CommonException("user does not exist");
        }
    }

    @Override
    public void confirmRegistration(RegistrationRequest registration) {
        Optional<Verification>  verifyOptional = verificationRepository.findVerificationByUserId(registration.getUserID());
        if(verifyOptional.isPresent()){
            Verification verification = verifyOptional.get();
            if (verification.getToken().equals(registration.getTokenRegistration())&&
                    verification.getExpiredAt().isAfter(Instant.now())){
                User user = verification.getUser();
                user.setStatus(1);
                userRepository.save(user);
                verificationRepository.delete(verification);
            }

            if (verification.getToken().equals(registration.getTokenRegistration())&&
                    !verification.getExpiredAt().isAfter(Instant.now())){
                Random ran = new Random();
                String token = String.format("%04d", ran.nextInt(10000));
                verification.setToken(token);
                verification.setExpiredAt(Instant.now().plus(5, ChronoUnit.MINUTES));
                verificationRepository.save(verification);
                emailSender.sendTokenVerification(verification.getUser().getEmail(), token);
                throw new ExpiredTokenException("token is expired, please check your email to get new token" );
            }

            if (!verification.getToken().equals(registration.getTokenRegistration())){
                throw new CommonException("Invalid token");
            }
        }else{
            throw new CommonException("user does not exist");
        }
    }
}
