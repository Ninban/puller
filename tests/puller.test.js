const chai = require('chai');
const should = chai.should();
const handleError = require('../puller').handleError;

describe('handleError', () => {
    it('should return status Success and message No commits found', () => {
        const error = {
            name: 'HttpError',
            status: 422,
            errors: [
                {
                    message: 'Example No commits between hash1 and hash2'
                }
            ]
        };
        const expectedResponse = {
            status: 'Success',
            message: 'No new commits found'
        };
        const response = handleError(error);
        return response.status.should.equal(expectedResponse.status) && response.message.should.equal(expectedResponse.message);
    });

    it('should return status Success and message A pull request already exists', () => {
        const error = {
            name: 'HttpError',
            status: 422,
            errors: [
                {
                    message: 'A pull request already exists for whatever'
                }
            ]
        };
        const expectedResponse = {
            status: 'Success',
            message: 'A pull request already exists'
        };
        const response = handleError(error);
        return response.status.should.equal(expectedResponse.status) && response.message.should.equal(expectedResponse.message);
    });

    it('should return error object for any other HttpError of status 422', () => {
        const error = {
            name: 'HttpError',
            status: 422,
            errors: [
                {
                    message: 'yo whatever'
                }
            ]
        };
        const expectedResponse = error;
        const response = handleError(error);
        return response.should.equal(expectedResponse);
    });

    it('should return error object for any other HttpError of a non-verified status', () => {
        const error = {
            name: 'HttpError',
            status: 401,
            errors: [
                {
                    message: 'Unauthorized'
                }
            ]
        };
        const expectedResponse = error;
        const response = handleError(error);
        return response.should.equal(expectedResponse);
    });

    it('should return error object for any other error', () => {
        const error = {
            unknownFieldName: 'NotAnHttpError'
        };
        const expectedResponse = error;
        const response = handleError(error);
        return response.should.equal(expectedResponse);
    });
});
