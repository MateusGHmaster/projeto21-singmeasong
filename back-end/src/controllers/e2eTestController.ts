import { Request, Response } from 'express';
import { recommendationService } from '../services/recommendationsService.js';

async function deleteAllRecommendations (req: Request, res: Response) {

    await recommendationService.deleteAllRecommendationsService();
    res.sendStatus(200);

}

export default {

    deleteAllRecommendations

};
