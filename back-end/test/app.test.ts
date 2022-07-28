import app from './../src/app.js';
import prisma from '../src/database.js';
import { createRecommendationData, createRecommendation } from './factories/recommendationFactory.js';
import { createScenaryWithScoredRecommendation, createScenaryWithBelow5ScoreRecommendation, createScenaryWithRecomendations } from './factories/scenaryFactory.js';
import supertest from 'supertest';
/* import { faker } from '@faker-js/faker'; */

beforeEach (async () => {

    await prisma.$executeRaw`
        
        TRUNCATE TABLE recommendations
        
    `;

});

describe('post new recommendation', () => {

    it('should post a new recommentaion, given a valid schema', async () => {
        
        const recommendationData = await createRecommendationData();
        const response = await supertest(app).post('/recommendations').send(recommendationData);

        expect(response.status).toBe(201);

        const savedRecommendation = await prisma.recommendation.findFirst({ where: { name: recommendationData.name } });

        expect(recommendationData.name).toBe(savedRecommendation.name);

    });

    it('should return 422, given an wrong schema', async () => {

        const recommendationData = await createRecommendationData();
        
        delete recommendationData.name;

        const response = await supertest(app).post('/recommendations').send(recommendationData);

        expect(response.status).toBe(422);

    });

});

describe('upvote recommendation', () => {

    it('should add one point to recommendation, given an upvote', async () => {

        const recommendation = await createRecommendation();

        const response = await supertest(app).post(`/recommendations/${recommendation.id}/upvote`);

        expect(response.status).toBe(200);

        const savedRecommendation = await prisma.recommendation.findFirst({ where: { name: recommendation.name } });

        expect(savedRecommendation.score).toBe(recommendation.score + 1);

    });

    it('should return 404, given an invalid id', async () => {

        const response = await supertest(app).post(`/recommendations/1/upvote`);

        expect(response.status).toBe(404);

    });

});

describe('downvote recommendation', () => {

    it('should remove one point from recommendation, given a downvote', async () => {

        const { recommendation } = await createScenaryWithScoredRecommendation();
        const response = await supertest(app).post(`/recommendations/${recommendation.id}/downvote`);
    
        expect(response.status).toBe(200);
    
        const savedRecommendation = await prisma.recommendation.findFirst({ where: { name: recommendation.name } });
    
        expect(savedRecommendation.score).toBe(2);

    });
  
    it('should return 404, given an invalid id', async () => {
        
        const response = await supertest(app).post('/recommendations/1/downvote');
    
        expect(response.status).toBe(404);

    });

    it ('should remove recommendation, given points/score below 5', async () => {

        const { recommendation } = await createScenaryWithBelow5ScoreRecommendation();
        const response = await supertest(app).post(`/recommendations/${recommendation.id}/downvote`);

        expect(response.status).toBe(200);

        const savedRecommendation = await prisma.recommendation.findFirst({ where: { name: recommendation.name } });

        expect(savedRecommendation).toBeNull();

    });

});

describe('get recommendations', () => {

    it('should get the last 10 recommendations, given a get', async () => {
        
        const scenaryRecommendations = await createScenaryWithRecomendations(15);
        const response = await supertest(app).get('/recommendations/');
    
        expect(response.body.length).toBe(10);

    });

})
  

afterAll(async () => {

    await prisma.$disconnect();

});


/* TEMPLATE = it ('should', async () => {}); */

