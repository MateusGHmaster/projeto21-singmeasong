/* import prisma from './../../src/database.js'; */
import { createRecommendation, createRecommendationWithScore } from './recommendationFactory.js';

/* export async function createScenaryWithRecommendation () {

    const recommendation = await createRecommendation();

    return {

        recommendation

    };
    
} */

export async function createScenaryWithRecomendations (quantity: number) {
    
    const scenaryRecommendations = [];

    for (let i = 0; i < quantity; i ++) {

        const recommendation = await createRecommendation();

        scenaryRecommendations.push(recommendation);

    }

    return scenaryRecommendations;

}

export async function createScenaryWithScoredRecommendation () {

    const recommendation = await createRecommendationWithScore(3);

    return { 
        
        recommendation
    
    };

}

export async function createScenaryWithBelow5ScoreRecommendation () {

    const recommendation = await createRecommendationWithScore(-5);

    return { 
        
        recommendation
    
    };

}