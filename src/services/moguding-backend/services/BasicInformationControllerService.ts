/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_BasicInformation_ } from '../models/BaseResponse_BasicInformation_';
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_List_BasicInformation_ } from '../models/BaseResponse_List_BasicInformation_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_BasicInformation_ } from '../models/BaseResponse_Page_BasicInformation_';
import type { BasicInformationAddRequest } from '../models/BasicInformationAddRequest';
import type { BasicInformationQueryRequest } from '../models/BasicInformationQueryRequest';
import type { BasicInformationUpdateRequest } from '../models/BasicInformationUpdateRequest';
import type { DeleteRequest } from '../models/DeleteRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BasicInformationControllerService {

    /**
     * addBasicInformation
     * @param requestBody 
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addBasicInformationUsingPost(
requestBody?: BasicInformationAddRequest,
): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/basicInformation/add',
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
     * deleteBasicInformation
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteBasicInformationUsingPost(
requestBody?: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/basicInformation/delete',
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
     * getBasicInformationById
     * @param id id
     * @returns BaseResponse_BasicInformation_ OK
     * @throws ApiError
     */
    public static getBasicInformationByIdUsingGet(
id?: string,
): CancelablePromise<BaseResponse_BasicInformation_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/basicInformation/get',
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
     * listBasicInformation
     * @param addCoin 
     * @param amount 
     * @param coinName 
     * @param current 
     * @param id 
     * @param noticeBar 
     * @param pageSize 
     * @param pointsNotification 
     * @param sortField 
     * @param sortOrder 
     * @param status 
     * @param userId 
     * @returns BaseResponse_List_BasicInformation_ OK
     * @throws ApiError
     */
    public static listBasicInformationUsingGet(
addCoin?: number,
amount?: number,
coinName?: string,
current?: number,
id?: number,
noticeBar?: string,
pageSize?: number,
pointsNotification?: string,
sortField?: string,
sortOrder?: string,
status?: number,
userId?: number,
): CancelablePromise<BaseResponse_List_BasicInformation_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/basicInformation/list',
            query: {
                'addCoin': addCoin,
                'amount': amount,
                'coinName': coinName,
                'current': current,
                'id': id,
                'noticeBar': noticeBar,
                'pageSize': pageSize,
                'pointsNotification': pointsNotification,
                'sortField': sortField,
                'sortOrder': sortOrder,
                'status': status,
                'userId': userId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listBasicInformationByPage
     * @param requestBody 
     * @returns BaseResponse_Page_BasicInformation_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listBasicInformationByPageUsingPost(
requestBody?: BasicInformationQueryRequest,
): CancelablePromise<BaseResponse_Page_BasicInformation_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/basicInformation/list/page',
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
     * updateBasicInformation
     * @param requestBody 
     * @returns BaseResponse_BasicInformation_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateBasicInformationUsingPost(
requestBody?: BasicInformationUpdateRequest,
): CancelablePromise<BaseResponse_BasicInformation_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/basicInformation/update',
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
