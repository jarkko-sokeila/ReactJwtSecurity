package com.example.backend.security.auth;

public class JwtTokenValidationResponse {
    private boolean valid;

    public JwtTokenValidationResponse(boolean isValid) {
        this.valid = isValid;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }
}
