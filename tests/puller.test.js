const chai = require('chai');
const should = require('chai').should();
const handleError = require('../puller').handleError;

describe('handleError', function () {
    it('should return status Success and message No commits found', function () {
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
            message: 'No commits found'
        };
        const response = handleError(error);
        return response.status.should.equal(expectedResponse.status) && response.message.should.equal(expectedResponse.message);
    });
    it('should return status Success and message A pull request already exists', function () {
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
    it('should return error object for any other HttpError', function () {
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
        return response.name.should.equal(expectedResponse.name) && response.status.should.equal(expectedResponse.status) && response.errors.should.equal(expectedResponse.errors);
    });
    it('should return error object for any other error', function () {
        const error = {
            name: 'NotAnHttpError',
            status: 422,
            errors: [
                {
                    message: 'yo whatever'
                }
            ]
        };
        const expectedResponse = error;
        const response = handleError(error);
        return response.name.should.equal(expectedResponse.name) && response.status.should.equal(expectedResponse.status) && response.errors.should.equal(expectedResponse.errors);
    });
});
