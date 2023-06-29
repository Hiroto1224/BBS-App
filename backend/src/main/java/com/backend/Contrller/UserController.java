package com.backend.Contrller;


import com.azure.core.annotation.Post;
import com.backend.Model.User;
import com.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class UserController {


    private UserRepository userRepository;
    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable(value = "id")String id){
        return userRepository.findById(id).map(value ->
                new ResponseEntity<>(value, HttpStatus.OK))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/users")
    public User createUser(@RequestBody User user){
        return userRepository.save(user);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable(value = "id")String id,
            @RequestBody User userDto){
        Optional<User> userData = userRepository.findById(id);

        if(userData.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        User user = userData.get();
        user.setEmailId(userDto.getEmailId());
        user.setLastName(userDto.getLastName());
        user.setFirstName(userDto.getFirstName());
        user.setId(userDto.getId());

        final User updateUser = userRepository.save(user);
        return ResponseEntity.ok(updateUser);
    }

    @DeleteMapping("/users/{id}")
    public Map<String,Boolean> deleteUser(@PathVariable(value = "id") String id){

        Optional<User> user = userRepository.findById(id);
        Map<String ,Boolean> response = new HashMap<>();

        if(user.isEmpty()){
            response.put("User Not Found",Boolean.FALSE);
        }else{
            userRepository.delete(user.get());
            response.put("Deleted",Boolean.TRUE);
        }
        return response;
    }

}
