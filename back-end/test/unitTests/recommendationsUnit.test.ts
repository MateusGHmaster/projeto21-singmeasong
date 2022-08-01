import { recommendationRepository } from '../../src/repositories/recommendationRepository.js';
import { recommendationService } from '../../src/services/recommendationsService.js';
import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';

describe('insert recommendations', () => {
  
    it('should create a recommendation', async () => {

        const recommendation = {

            name: faker.lorem.words(4),
            youtubeLink: 'https://youtu.be/zW-AIXAnLcE'

        };

        jest.spyOn(recommendationRepository, 'findByName').mockResolvedValueOnce(null);
        jest.spyOn(recommendationRepository, 'create').mockResolvedValueOnce();

        await recommendationService.insert(recommendation);

        expect(recommendationRepository.create).toBeCalledTimes(1);

    });

    it('should throw a conflict error, given a not unique recommendation name', async () => {

        const recommendation = {

            name: faker.lorem.words(3),
            youtubeLink: 'https://youtu.be/zW-AIXAnLcE'

        };

        jest.spyOn(recommendationRepository, 'findByName').mockResolvedValueOnce({ id: 1, ...recommendation, score: 0 });

        expect(recommendationService.insert(recommendation)).rejects.toEqual({

            type: 'conflict',
            message: 'Recommendations names must be unique'

        });

    });

});

describe('upvote recommendations', () => {

    it('should add 1 point to recommendation score, given an upvote', async () => {

        const recommendation = {

            id: 1,
            name: faker.lorem.words(3),
            youtubeLink: 'https://youtu.be/zW-AIXAnLcE',
            score: 5

        };
    
        jest.spyOn(recommendationRepository, 'find').mockResolvedValueOnce(recommendation);
        jest.spyOn(recommendationRepository, 'updateScore').mockResolvedValueOnce({ ...recommendation, score: 6 });
    
        await recommendationService.upvote(recommendation.id);

        expect(recommendationRepository.updateScore).toBeCalledTimes(1);

    });
  
    it('should fail to add 1 point to recommendation score, given an inexisting id', async () => {

        jest.spyOn(recommendationRepository, 'find').mockResolvedValueOnce(null);
    
        expect(recommendationService.upvote(100)).rejects.toEqual({

            type: 'not_found',
            message: ''

        });

    });

});

describe('downvote recommendations', () => {

    it('should subtract 1 point of the recommendation score, and delete recommendation if score < -5, given a downvote', async () => {

        const recommendation = {

            id: 1,
            name: faker.lorem.words(3),
            youtubeLink: 'https://youtu.be/zW-AIXAnLcE',
            score: -5

        };
    
        jest.spyOn(recommendationRepository, 'find').mockResolvedValueOnce(recommendation);
        jest.spyOn(recommendationRepository, 'updateScore').mockResolvedValueOnce({ ...recommendation, score: -6 });
        jest.spyOn(recommendationRepository, 'remove').mockResolvedValueOnce();
    
        await recommendationService.downvote(recommendation.id);

        expect(recommendationRepository.remove).toBeCalledTimes(1);

    });
  
    it('should fail to subtract point of the recommendation score, given an inexisting id', async () => {

        jest.spyOn(recommendationRepository, 'find').mockResolvedValueOnce(null);
    
        expect(recommendationService.upvote(100)).rejects.toEqual({

            type: 'not_found',
            message: ''

        });

    });

});

describe('get recommendations', () => {

    it('get all recommendations', async () => {

        const recommendations = [
            {
                id: 1,
                name: faker.lorem.words(3),
                youtubeLink: 'https://youtu.be/zW-AIXAnLcE',
                score: 5
            },
            {
                id: 2,
                name: faker.lorem.words(3),
                youtubeLink: 'https://youtu.be/zW-AIXAnLcE',
                score: 10
            },
            {
                id: 3,
                name: faker.lorem.words(3),
                youtubeLink: 'https://youtu.be/zW-AIXAnLcE',
                score: 124
            }
        ];
        const findAll = jest.spyOn(recommendationRepository, 'findAll').mockResolvedValueOnce(recommendations);
    
        await recommendationService.get();

        expect(findAll).toBeCalledTimes(1);

    });
  
    it('get the top recommendations', async () => {

        const getAmountByScore = jest.spyOn(recommendationRepository, 'getAmountByScore').mockResolvedValueOnce([]);
    
        await recommendationService.getTop(0);

        expect(getAmountByScore).toBeCalledTimes(1);

    });
  
    it('should get a random recommendation, on the 30% tier', async () => {

        const recommendations = [
            {
                id: 1,
                name: faker.lorem.words(3),
                youtubeLink: 'https://youtu.be/zW-AIXAnLcE',
                score: 5
            },
            {
                id: 2,
                name: faker.lorem.words(3),
                youtubeLink: 'https://youtu.be/zW-AIXAnLcE',
                score: 100
            }
        ];
        
        jest.spyOn(Math, 'random').mockReturnValueOnce(0.9);
        jest.spyOn(recommendationRepository, 'findAll').mockResolvedValueOnce([recommendations[0]]);
    
        const result = await recommendationService.getRandom();

        expect(result.score).toEqual(recommendations[0].score);

    });
  
    it('should get a random recommendation, on the 70% tier', async () => {

        const recommendations = [
            {
                id: 1,
                name: faker.lorem.words(3),
                youtubeLink: 'https://youtu.be/zW-AIXAnLcE',
                score: 5
            },
            {
                id: 2,
                name: faker.lorem.words(3),
                youtubeLink: 'https://youtu.be/zW-AIXAnLcE',
                score: 100
            }
        ];

        jest.spyOn(Math, 'random').mockReturnValueOnce(0.5);
        jest.spyOn(recommendationRepository, 'findAll').mockResolvedValueOnce([recommendations[1]]);
    
        const result = await recommendationService.getRandom();

        expect(result.score).toEqual(recommendations[1].score);

    });
  
    it('should get a random recommendation, given a score bellow or equal 10, on the 100% tier', async () => {

        const recommendations = [
            {
                id: 1,
                name: faker.lorem.words(3),
                youtubeLink: 'https://youtu.be/zW-AIXAnLcE',
                score: 5
            },
            {
                id: 2,
                name: faker.lorem.words(3),
                youtubeLink: 'https://youtu.be/zW-AIXAnLcE',
                score: 10
            }
        ];

        jest.spyOn(Math, 'random').mockReturnValueOnce(0.9);
        jest.spyOn(recommendationRepository, 'findAll').mockResolvedValueOnce(recommendations);
    
        const result = await recommendationService.getRandom();

        expect(result).not.toBeNull();

    });
  
    it('should get a random recommendation, given score above 10, on the 100% tier', async () => {

        const recommendations = [
            {
                id: 1,
                name: faker.lorem.words(3),
                youtubeLink: 'https://youtu.be/zW-AIXAnLcE',
                score: 100
            },
            {
                id: 2,
                name: faker.lorem.words(3),
                youtubeLink: 'https://youtu.be/zW-AIXAnLcE',
                score: 200
            }
        ];

        jest.spyOn(Math, 'random').mockReturnValueOnce(0.9);
        jest.spyOn(recommendationRepository, 'findAll').mockResolvedValueOnce(recommendations);
    
        const result = await recommendationService.getRandom();

        expect(result).not.toBeNull();

    });
  
    it('should fail to get a random recommendation', async () => {

        const recommendation = [];

        jest.spyOn(Math, 'random').mockReturnValueOnce(0.9);
        jest.spyOn(recommendationRepository, 'findAll').mockResolvedValue(recommendation);
    
        return expect(recommendationService.getRandom()).rejects.toEqual({

            type: 'not_found',
            message: ''

        });

    });
    
});

