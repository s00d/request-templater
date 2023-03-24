describe('RequestTemplater', () => {
    it('generates a valid JavaScript AJAX request', () => {
        const request = new RequestTemplater()
            .baseUrl('https://example.com/api/')
            .method('POST')
            .url('users')
            .params([
                { in: 'headers', name: 'Authorization', value: 'Bearer TOKEN' },
                { in: 'query', name: 'page', value: '1' },
                { in: 'postData', name: 'name', value: 'John Doe' },
                { in: 'postData', name: 'email', value: 'john@example.com' },
            ])
            .lang('javascript')
            .library('xmlhttprequest')
            .generate();

        cy.wrap(request).should('contain', 'var xhr = new XMLHttpRequest()');
        cy.wrap(request).should('contain', 'xhr.open("POST", "https://example.com/api/users?page=1")');
        cy.wrap(request).should('contain', 'xhr.setRequestHeader("Authorization", "Bearer TOKEN")');
        cy.wrap(request).should('contain', 'xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")');
        cy.wrap(request).should('contain', 'xhr.send("name=John%20Doe&email=john%40example.com")');
    });

    it('generates a valid Python requests request', () => {
        const request = new RequestTemplater()
            .baseUrl('https://example.com/api/')
            .method('GET')
            .url('users')
            .params([
                { in: 'headers', name: 'Authorization', value: 'Bearer TOKEN' },
                { in: 'query', name: 'page', value: '1' },
            ])
            .lang('python')
            .library('requests')
            .generate();

        cy.wrap(request).should('contain', 'import requests');
        cy.wrap(request).should('contain', 'response = requests.get("https://example.com/api/users", headers=headers, params=params)');
        cy.wrap(request).should('contain', 'headers = {');
        cy.wrap(request).should('contain', '"Authorization": "Bearer TOKEN",');
        cy.wrap(request).should('contain', 'params = {');
        cy.wrap(request).should('contain', '"page": "1",');
    });
});
