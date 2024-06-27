package io.finsight.finsightapi.service;

/**
 * Used in the service layer for custom ResponseEntity
 * statuses to return from CRUD operations.
 */
public enum UserOperationStatus {
    OK,
    USERNAME_CONFLICT,
    EMAIL_ADDRESS_CONFLICT,
    INTERNAL_SERVER_ERROR
}
