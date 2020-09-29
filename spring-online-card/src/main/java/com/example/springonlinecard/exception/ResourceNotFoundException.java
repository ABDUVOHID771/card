package com.example.springonlinecard.exception;

import java.util.List;
import java.util.UUID;

public class ResourceNotFoundException extends BaseException {

    public ResourceNotFoundException(String projectIdentifier) {
        super(String.format("Resource with %s was not found", projectIdentifier));
    }

    public ResourceNotFoundException(UUID resourceUuid) {
        super(String.format("Resource with id %s was not found", resourceUuid));
    }

    public ResourceNotFoundException(Integer id) {
        super(String.format("Resource with id %s was not found", id));
    }

    public ResourceNotFoundException(List<UUID> resourceUuidList) {
        super(String.format("No resource with id in %s list was not found", resourceUuidList));
    }

    public ResourceNotFoundException(Class resourceType, UUID resourceUuid) {
        super(String.format("Resource (%s) with id %s was not found", resourceType.getCanonicalName(), resourceUuid));
    }

    public ResourceNotFoundException(Class resourceType, String propertyName, String propertyValue) {
        super(String.format("Resource (%s) with %s = %s was not found", resourceType.getCanonicalName(), propertyName, propertyValue));
    }


}

