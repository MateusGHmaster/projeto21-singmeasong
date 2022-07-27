/* import prisma from '../../src/database.js'; */
import { faker } from '@faker-js/faker';

export default async function createRecommendationData () {
    
    const recommendationData = {

        name: faker.music.songName(),
        youtubeLink: 'https://youtu.be/mK8mw2X-4ug?t=65'

    };

    return recommendationData;

}