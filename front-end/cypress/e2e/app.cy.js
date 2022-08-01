/// <reference types='cypress' />
import { faker } from '@faker-js/faker';

/* beforeAll(() => {

    cy.resetRecommendations();

}); */

describe('create recommendation', () => {

    it('should to create a recommendation', () => {

        const recommendation = {

            name: faker.lorem.words(3),
            youtubeLink: 'https://youtu.be/ig9-a8o2qgU'
            
        };

        cy.createRecommendation(recommendation);

        cy.contains(`${recommendation.name}`).should('be.visible');

    });

    it('should fail to create a recommendation', () => {

        const recommendation = {

            name: faker.lorem.words(3),
            youtubeLink: 'https://www.sonicthehedgehog.com/'

        };

        cy.createRecommendation(recommendation);

        cy.on('window:alert', (text) => { expect(text).to.contains('Error creating recommendation!') });
    
    }); 

});

describe('up && down vote recommendation', () => {

    it('should add a point, given upvoted recommendation', () => {

        const recommendation = {

            name: faker.lorem.words(3),
            youtubeLink: 'https://youtu.be/ig9-a8o2qgU'

        };

        cy.createRecommendation(recommendation);
        cy.get('#uparrow').click();
        cy.get('#score').should('contain.text', '1');

    });
  
    it('should remove a point, given downvoted recommendation', () => {

        const recommendation = {

            name: faker.lorem.words(3),
            youtubeLink: 'https://youtu.be/ig9-a8o2qgU'

        };

        cy.createRecommendation(recommendation);
        cy.get('#downarrow').click();
        cy.get('#score').should('contain.text', '-1');

    });
  
    it('should delete recommendation, given score bellow -5', () => {

        const recommendation = {

            name: faker.lorem.words(3),
            youtubeLink: 'https://youtu.be/ig9-a8o2qgU'

        };

        cy.createRecommendation(recommendation);

        cy.get('#downarrow').click();
        cy.get('#downarrow').click();
        cy.get('#downarrow').click();
        cy.get('#downarrow').click();
        cy.get('#downarrow').click();
        cy.get('#downarrow').click();
    
        cy.contains(`No recommendations yet! Create your own :)`).should('be.visible');

    });

});
  
describe('get top recommendations', () => {

    it('should show top recommendations', () => {

        const recommendation = {

            name: faker.lorem.words(3),
            youtubeLink: 'https://youtu.be/ig9-a8o2qgU'

        };

        cy.createRecommendation(recommendation);
        cy.contains('Top').click();
        cy.contains(`${recommendation.name}`).should('be.visible');

    });

});
  
describe('get random recommendation', () => {

    it('should show random recommendations', () => {

        const recommendation = {

            name: faker.lorem.words(3),
            youtubeLink: 'https://youtu.be/ig9-a8o2qgU'
            
        };

        cy.createRecommendation(recommendation);
        cy.contains('Random').click();
        cy.contains(`${recommendation.name}`).should('be.visible');

    });

});
  
/* afterEach(() => {

    cy.resetRecommendations();

});  */
