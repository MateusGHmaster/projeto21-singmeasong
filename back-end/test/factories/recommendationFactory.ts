import prisma from '../../src/database.js';
import { faker } from '@faker-js/faker';
import { number } from 'joi';

export async function createRecommendationData () {
    
    const recommendationData = {

        name: faker.music.songName(),
        youtubeLink: 'https://youtu.be/mK8mw2X-4ug?t=65',
        /* score: faker.datatype.number({ min: -4, max: 20 }) */

    };

    return recommendationData;

}

export async function createRecommendation () {
    
    const recommendationData = await createRecommendationData();
    const recommendation = await prisma.recommendation.create({ data: recommendationData });

    return recommendation;

}

export async function createRecommendationWithScore (score: number) {

    const recommendationData = await createRecommendationData();
    const recommendation = await prisma.recommendation.create({ data: { ...recommendationData, score: score } });
  
    return recommendation;

}