export const auth = {
  login(email: string, password: string): boolean {
    if (email === 'admin@test.com' && password === '1234') {
      localStorage.setItem('auth', 'true');
      return true;
    }
    return false;
  },
  logout(): void {
    localStorage.removeItem('auth');
  },
  isAuthenticated(): boolean {
    return localStorage.getItem('auth') === 'true';
  }
};
