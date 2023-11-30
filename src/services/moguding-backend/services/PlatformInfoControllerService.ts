/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_List_PlatformInfo_ } from '../models/BaseResponse_List_PlatformInfo_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_PlatformInfo_ } from '../models/BaseResponse_Page_PlatformInfo_';
import type { BaseResponse_PlatformInfo_ } from '../models/BaseResponse_PlatformInfo_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { IdRequest } from '../models/IdRequest';
import type { PlatformInfoAddRequest } from '../models/PlatformInfoAddRequest';
import type { PlatformInfoQueryRequest } from '../models/PlatformInfoQueryRequest';
import type { PlatformInfoUpdateRequest } from '../models/PlatformInfoUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PlatformInfoControllerService {

    /**
     * addPlatformInfo
     * @param requestBody 
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addPlatformInfoUsingPost(
requestBody?: PlatformInfoAddRequest,
): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/platformInfo/add',
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
     * deletePlatformInfo
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deletePlatformInfoUsingPost(
requestBody?: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/platformInfo/delete',
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
     * getPlatformInfoById
     * @param id id
     * @returns BaseResponse_PlatformInfo_ OK
     * @throws ApiError
     */
    public static getPlatformInfoByIdUsingGet(
id?: string,
): CancelablePromise<BaseResponse_PlatformInfo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/platformInfo/get',
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
     * listPlatformInfo
     * @param clockType 
     * @param current 
     * @param id 
     * @param name 
     * @param pageSize 
     * @param sortField 
     * @param sortOrder 
     * @returns BaseResponse_List_PlatformInfo_ OK
     * @throws ApiError
     */
    public static listPlatformInfoUsingGet(
clockType?: string,
current?: number,
id?: number,
name?: string,
pageSize?: number,
sortField?: string,
sortOrder?: string,
): CancelablePromise<BaseResponse_List_PlatformInfo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/platformInfo/list',
            query: {
                'clockType': clockType,
                'current': current,
                'id': id,
                'name': name,
                'pageSize': pageSize,
                'sortField': sortField,
                'sortOrder': sortOrder,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listMyPlatformInfoByPage
     * @param clockType 
     * @param current 
     * @param id 
     * @param name 
     * @param pageSize 
     * @param sortField 
     * @param sortOrder 
     * @returns BaseResponse_Page_PlatformInfo_ OK
     * @throws ApiError
     */
    public static listMyPlatformInfoByPageUsingGet(
clockType?: string,
current?: number,
id?: number,
name?: string,
pageSize?: number,
sortField?: string,
sortOrder?: string,
): CancelablePromise<BaseResponse_Page_PlatformInfo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/platformInfo/list/myPlatformInfo',
            query: {
                'clockType': clockType,
                'current': current,
                'id': id,
                'name': name,
                'pageSize': pageSize,
                'sortField': sortField,
                'sortOrder': sortOrder,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listPlatformInfoByPage
     * @param requestBody 
     * @returns BaseResponse_Page_PlatformInfo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listPlatformInfoByPageUsingPost(
requestBody?: PlatformInfoQueryRequest,
): CancelablePromise<BaseResponse_Page_PlatformInfo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/platformInfo/list/page',
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
     * offlinePlatformInfo
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static offlinePlatformInfoUsingPost(
requestBody?: IdRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/platformInfo/offline',
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
     * onlinePlatformInfo
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static onlinePlatformInfoUsingPost(
requestBody?: IdRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/platformInfo/online',
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
     * updatePlatformInfo
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updatePlatformInfoUsingPost(
requestBody?: PlatformInfoUpdateRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/platformInfo/update',
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
