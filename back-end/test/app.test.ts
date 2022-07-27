import app from './../src/app.js';
import prisma from '../src/database.js';
import createRecommendationData from './factories/recommendationFactory.js';
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

        const createdRecommendation = await prisma.recommendation.findFirst({ where: { name: recommendationData.name } });

        expect(recommendationData.name).toBe(createdRecommendation.name);

    });

    it('should return 422, given an wrong schema', async () => {

        const recommendationData = await createRecommendationData();

        delete recommendationData.name;

        const response = await supertest(app).post('/recommendations').send(recommendationData);

        expect(response.status).toBe(422);

    });

});

afterAll(async () => {

    await prisma.$disconnect();
  
});