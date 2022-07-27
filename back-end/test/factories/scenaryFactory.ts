/* import prisma from './../../src/database.js'; */
import createRecommendationData from './recommendationFactory.js';

export async function createScenaryWithRecommendation () {

    const recommendation = await createRecommendationData();

    return {

        recommendation

    };
    
}