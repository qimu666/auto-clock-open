/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_ClockReport_ } from '../models/BaseResponse_ClockReport_';
import type { BaseResponse_List_ClockReport_ } from '../models/BaseResponse_List_ClockReport_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_ClockReport_ } from '../models/BaseResponse_Page_ClockReport_';
import type { ClockReportAddRequest } from '../models/ClockReportAddRequest';
import type { ClockReportQueryRequest } from '../models/ClockReportQueryRequest';
import type { ClockReportUpdateRequest } from '../models/ClockReportUpdateRequest';
import type { DeleteRequest } from '../models/DeleteRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClockReportControllerService {

    /**
     * addClockReport
     * @param requestBody 
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addClockReportUsingPost(
requestBody?: ClockReportAddRequest,
): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/clockReport/add',
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
     * deleteClockReport
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteClockReportUsingPost(
requestBody?: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/clockReport/delete',
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
     * getClockReportById
     * @param id id
     * @returns BaseResponse_ClockReport_ OK
     * @throws ApiError
     */
    public static getClockReportByIdUsingGet(
id?: string,
): CancelablePromise<BaseResponse_ClockReport_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/clockReport/get',
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
     * listClockReport
     * @param content 
     * @param current 
     * @param id 
     * @param jobName 
     * @param pageSize 
     * @param searchText 
     * @param sortField 
     * @param sortOrder 
     * @param type 
     * @returns BaseResponse_List_ClockReport_ OK
     * @throws ApiError
     */
    public static listClockReportUsingGet(
content?: string,
current?: number,
id?: number,
jobName?: string,
pageSize?: number,
searchText?: string,
sortField?: string,
sortOrder?: string,
type?: string,
): CancelablePromise<BaseResponse_List_ClockReport_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/clockReport/list',
            query: {
                'content': content,
                'current': current,
                'id': id,
                'jobName': jobName,
                'pageSize': pageSize,
                'searchText': searchText,
                'sortField': sortField,
                'sortOrder': sortOrder,
                'type': type,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listClockReportByPage
     * @param requestBody 
     * @returns BaseResponse_Page_ClockReport_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listClockReportByPageUsingPost(
requestBody?: ClockReportQueryRequest,
): CancelablePromise<BaseResponse_Page_ClockReport_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/clockReport/list/page',
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
     * updateClockReport
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateClockReportUsingPost(
requestBody?: ClockReportUpdateRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/clockReport/update',
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
