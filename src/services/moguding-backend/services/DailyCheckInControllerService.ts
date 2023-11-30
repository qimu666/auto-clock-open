/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_DailyCheckIn_ } from '../models/BaseResponse_DailyCheckIn_';
import type { BaseResponse_Page_DailyCheckIn_ } from '../models/BaseResponse_Page_DailyCheckIn_';
import type { DailyCheckInQueryRequest } from '../models/DailyCheckInQueryRequest';
import type { DeleteRequest } from '../models/DeleteRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DailyCheckInControllerService {

    /**
     * deleteDailyCheckIn
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteDailyCheckInUsingPost(
requestBody?: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/dailyCheckIn/delete',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getDailyCheckInById
     * @param id id
     * @returns BaseResponse_DailyCheckIn_ OK
     * @throws ApiError
     */
    public static getDailyCheckInByIdUsingGet(
id?: string,
): CancelablePromise<BaseResponse_DailyCheckIn_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/dailyCheckIn/get',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listDailyCheckInByPage
     * @param requestBody 
     * @returns BaseResponse_Page_DailyCheckIn_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listDailyCheckInByPageUsingPost(
requestBody?: DailyCheckInQueryRequest,
): CancelablePromise<BaseResponse_Page_DailyCheckIn_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/dailyCheckIn/list/page',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
