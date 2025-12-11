
/// <reference types="@clerk/express/env" />

export {};

// Create a type for the roles
export type Role = "admin";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Role;
    };
  } 
}