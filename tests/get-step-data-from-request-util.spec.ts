import { getStepDataFromRequest } from "../lib/utils/get-step-data-from-request.util"

describe('get-step-data-from-request.util', () => {
    it('should get step data with success', () => {
        const error: Error = { message: 'Error Message', name: 'Error', stack: 'Error Stack' };
        const request: any = { method: "POST", body: {} };
        const result = getStepDataFromRequest(error, request);
        expect(result).toEqual({
            "body": {},
            "data": "{}",
            "message": "Error Message",
            "method": "POST",
            "stack": "Error Stack",
            "statusCode": 500,
            "tags": [],
        });
        expect(result).toMatchSnapshot();
    });

    it('should get step data with success', () => {
        const error: Error = { message: 'Error Message', name: 'Error', stack: 'Error Stack' };
        const request: any = { method: "POST", body: { email: "some@mail.com", id: "1" } };
        const result = getStepDataFromRequest(error, request);
        expect(result).toEqual({
            message: 'Error Message',
            stack: 'Error Stack',
            statusCode: 500,
            method: 'POST',
            tags: ["email", "id"],
            data: `{
  \"email\": \"some@mail.com\",
  \"id\": \"1\"
}`,
            body: { email: "some@mail.com", id: "1" }
        });
        expect(result).toMatchSnapshot();
    });

    it('should get all default', () => {
        const error = {};
        const request: any = {};
        const result = getStepDataFromRequest(error as any, request);
        expect(result).toEqual({
            message: 'Internal Server Error',
            stack: '',
            statusCode: 500,
            method: 'NONE',
            tags: [],
            data: "{}",
            body: {}
        });
        expect(result).toMatchSnapshot();
    });
})