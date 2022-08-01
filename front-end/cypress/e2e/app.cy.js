/// <reference types='cypress' />

import { faker } from '@faker-js/faker';

/* beforeEach(() => {

    cy.resetRecommendations();

});

describe('create recommendation', () => {

    it('should create a recommendation', () => {

        const recommendation = {

            name: faker.lorem.words(3),
            youtubeLink: 'https://youtu.be/ig9-a8o2qgU'
            
        };

        cy.createRecommendation(recommendation);

        cy.contains(`${recommendation.name}`).should('be.visible');

    });

    it('should fail create a recommendation', () => {

        const recommendation = {

            name: faker.lorem.words(3),
            youtubeLink: 'https://www.sonicthehedgehog.com/'

        };

        cy.createRecommendation(recommendation);

        cy.on('window:alert', (text) => { expect(text).to.contains('Error creating recommendation!') });
    
    }); 

});

afterEach(() => {

    cy.resetRecommendations();

}); */