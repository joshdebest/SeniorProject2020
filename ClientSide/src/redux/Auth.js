class Auth {
   constructor() {
     this.user_token = ''
   }
   getToken() {
     return this.user_token.token
   }
   getUserId() {
     return this.user_token.user_id
   }
   setUserToken(new_token) {
     this.user_token = new_token
   }
   logout() {
     localStorage.removeItem('auth')
   }
 }
 export default new Auth();