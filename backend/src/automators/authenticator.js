export class Authenticator {
  constructor(idAdminOrUser, tokenuser) {
    this.idAdminOrUser = idAdminOrUser;
    this.tokenuser = tokenuser;
    global.answerp = false;
    let i = 0;
    if (typeof(tokenadmin) == 'undefined') {
      global.tokenadmin = [];
    }
    if (typeof(tokenU) == 'undefined') {
      global.tokenU = [];
    }
    if (typeof(customer) == 'undefined') {
      global.customer = '';
    }
    while (i < tokenadmin.length) {
      if (tokenadmin[i] == tokenuser) {
        this.customer = 'admin';
        this.admin_id = idAdminOrUser;
      }
      i=i+1;
    }
    if (customer != 'admin'){
      let i = 0;
      while (i < tokenU.length) {
        if (tokenU[i] == tokenuser) {
          this.customer = 'user';
        }
        i=i+1;
      }
    } else {
      this.customer = 'not authenticated';
    }
  }
}