package net.javaguides.springbootbackend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{
    private static final long serialVersionUID = 1L;//implements serializable interface

    public ResourceNotFoundException(String message) {
        super(message);
    }
}

//When a Record doesn't exist in DB w throw this Custom Exception
//Api will return not found status to the client
