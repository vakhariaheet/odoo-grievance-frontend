type Roles = 'admin' | 'employee' | 'hr'; 
declare global {
    interface CustomJwtSessionClaims {
      metadata: {
        role?: Roles
      };
    }
  }