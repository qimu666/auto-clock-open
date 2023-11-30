/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_List_ProductInfo_ } from '../models/BaseResponse_List_ProductInfo_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_ProductInfo_ } from '../models/BaseResponse_Page_ProductInfo_';
import type { BaseResponse_ProductInfo_ } from '../models/BaseResponse_ProductInfo_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { IdRequest } from '../models/IdRequest';
import type { ProductInfoAddRequest } from '../models/ProductInfoAddRequest';
import type { ProductInfoQueryRequest } from '../models/ProductInfoQueryRequest';
import type { ProductInfoUpdateRequest } from '../models/ProductInfoUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductInfoControllerService {

    /**
     * addProductInfo
     * @param requestBody 
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addProductInfoUsingPost(
requestBody?: ProductInfoAddRequest,
): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/productInfo/add',
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
     * deleteProductInfo
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteProductInfoUsingPost(
requestBody?: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/productInfo/delete',
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
     * getProductInfoById
     * @param id id
     * @returns BaseResponse_ProductInfo_ OK
     * @throws ApiError
     */
    public static getProductInfoByIdUsingGet(
id?: string,
): CancelablePromise<BaseResponse_ProductInfo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/productInfo/get',
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
     * listProductInfo
     * @param addCoin 
     * @param amount 
     * @param coinName 
     * @param current 
     * @param id 
     * @param pageSize 
     * @param sortField 
     * @param sortOrder 
     * @param status 
     * @param userId 
     * @returns BaseResponse_List_ProductInfo_ OK
     * @throws ApiError
     */
    public static listProductInfoUsingGet(
addCoin?: number,
amount?: number,
coinName?: string,
current?: number,
id?: number,
pageSize?: number,
sortField?: string,
sortOrder?: string,
status?: number,
userId?: number,
): CancelablePromise<BaseResponse_List_ProductInfo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/productInfo/list',
            query: {
                'addCoin': addCoin,
                'amount': amount,
                'coinName': coinName,
                'current': current,
                'id': id,
                'pageSize': pageSize,
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
     * listProductInfoByPage
     * @param requestBody 
     * @returns BaseResponse_Page_ProductInfo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listProductInfoByPageUsingPost(
requestBody?: ProductInfoQueryRequest,
): CancelablePromise<BaseResponse_Page_ProductInfo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/productInfo/list/page',
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
     * offlineProductInfo
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static offlineProductInfoUsingPost(
requestBody?: IdRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/productInfo/offline',
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
     * onlineProductInfo
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static onlineProductInfoUsingPost(
requestBody?: IdRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/productInfo/online',
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
     * updateProductInfo
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateProductInfoUsingPost(
requestBody?: ProductInfoUpdateRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/productInfo/update',
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
