/* import prisma from './../../src/database.js'; */
import createRecommendation from './recommendationFactory.js';

export async function createScenaryWithRecommendation () {

    const recommendation = await createRecommendation();

    return {

        recommendation

    };
    
}