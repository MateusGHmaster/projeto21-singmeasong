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
