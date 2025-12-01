describe('Checked Protected Routes', () => {
  it('Redirects User To Sign In When Not Authenticated', () => {
  cy.visit('localhost:5173')
  cy.get('#root a[href="/project"]').click();
  cy.url().should('include', '/signin');
  });
});

describe('Sign In Works', () => {
  it('Allows User To Sign In', () => {
    cy.visit('localhost:5173/signin');
    cy.get('input[name="username"]').type('Yoda');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });
})

describe('Sign Out Works and Clears Cookies & Local Storage', () => {
  it('Allows User To Sign Out', () => {
    cy.visit('localhost:5173')
    cy.get('#root a[href="/signin"]').click();
    cy.get('[name="username"]').click();
    cy.get('[name="username"]').type('Yoda');
    cy.get('[name="password"]').type('123456');
    cy.get('#root button.submit-btn').click();
    cy.get('#root button.logOutBtn').click();
    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.be.null;
      expect(win.localStorage.getItem('user')).to.be.null;
      expect(win.document.cookie).to.not.include('token');
    });
  });
});