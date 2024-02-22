/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_ClockInInfoVo_ } from '../models/BaseResponse_ClockInInfoVo_';
import type { BaseResponse_InitClockInfo_ } from '../models/BaseResponse_InitClockInfo_';
import type { IdRequest } from '../models/IdRequest';
import type { SupplementaryReportRequest } from '../models/SupplementaryReportRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClockInControllerService {

    /**
     * doSupplementaryReport
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doSupplementaryReportUsingPost(
requestBody?: SupplementaryReportRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ClockIn/doSupplementaryReport',
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
     * getChangeClonkAddressInfo
     * @param address address
     * @returns BaseResponse_ClockInInfoVo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getChangeClonkAddressInfoUsingPost(
address?: string,
): CancelablePromise<BaseResponse_ClockInInfoVo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ClockIn/get/change/clonkAddressInfo',
            query: {
                'address': address,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * initClockInfo
     * @param phone phone
     * @param password password
     * @returns BaseResponse_InitClockInfo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static initClockInfoUsingPost(
phone?: string,
password?: string,
): CancelablePromise<BaseResponse_InitClockInfo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ClockIn/get/init/clockInfo',
            query: {
                'phone': phone,
                'password': password,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * startingClockIn
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static startingClockInUsingPost(
requestBody?: IdRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ClockIn/starting',
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
     * stopClockIn
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static stopClockInUsingPost(
requestBody?: IdRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ClockIn/stop',
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
     * supplementClockIn
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static supplementClockInUsingPost(
requestBody?: IdRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ClockIn/supplementClockIn',
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
