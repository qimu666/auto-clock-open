/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_ClockInInfoVo_ } from '../models/BaseResponse_ClockInInfoVo_';
import type { BaseResponse_List_ClockInInfo_ } from '../models/BaseResponse_List_ClockInInfo_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_ClockInInfo_ } from '../models/BaseResponse_Page_ClockInInfo_';
import type { ClockInInfoAddRequest } from '../models/ClockInInfoAddRequest';
import type { ClockInInfoQueryRequest } from '../models/ClockInInfoQueryRequest';
import type { ClockInInfoUpdateRequest } from '../models/ClockInInfoUpdateRequest';
import type { DeleteRequest } from '../models/DeleteRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClockInInfoControllerService {

    /**
     * addClockInInfo
     * @param requestBody 
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addClockInInfoUsingPost(
requestBody?: ClockInInfoAddRequest,
): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/clockInInfo/add',
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
     * deleteClockInInfo
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteClockInInfoUsingPost(
requestBody?: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/clockInInfo/delete',
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
     * getClockInInfoById
     * @param id id
     * @returns BaseResponse_ClockInInfoVo_ OK
     * @throws ApiError
     */
    public static getClockInInfoByIdUsingGet(
id?: string,
): CancelablePromise<BaseResponse_ClockInInfoVo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/clockInInfo/get',
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
     * listClockInInfo
     * @param clockAddress 
     * @param clockDays 
     * @param clockStatus 
     * @param clockedSuccessDays 
     * @param current 
     * @param dailyNewspaperStatus 
     * @param device 
     * @param email 
     * @param id 
     * @param jobAddress 
     * @param jobName 
     * @param latitude 
     * @param longitude 
     * @param monthNewspaperStatus 
     * @param pageSize 
     * @param password 
     * @param phone 
     * @param platformId 
     * @param pushToken 
     * @param reportSource 
     * @param searchText 
     * @param selectClockDay 
     * @param sortField 
     * @param sortOrder 
     * @param tagType 
     * @param type 
     * @param userId 
     * @param weekNewspaperStatus 
     * @returns BaseResponse_List_ClockInInfo_ OK
     * @throws ApiError
     */
    public static listClockInInfoUsingGet(
clockAddress?: string,
clockDays?: number,
clockStatus?: number,
clockedSuccessDays?: number,
current?: number,
dailyNewspaperStatus?: number,
device?: string,
email?: string,
id?: number,
jobAddress?: string,
jobName?: string,
latitude?: string,
longitude?: string,
monthNewspaperStatus?: number,
pageSize?: number,
password?: string,
phone?: string,
platformId?: number,
pushToken?: string,
reportSource?: number,
searchText?: string,
selectClockDay?: string,
sortField?: string,
sortOrder?: string,
tagType?: string,
type?: string,
userId?: number,
weekNewspaperStatus?: number,
): CancelablePromise<BaseResponse_List_ClockInInfo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/clockInInfo/list',
            query: {
                'clockAddress': clockAddress,
                'clockDays': clockDays,
                'clockStatus': clockStatus,
                'clockedSuccessDays': clockedSuccessDays,
                'current': current,
                'dailyNewspaperStatus': dailyNewspaperStatus,
                'device': device,
                'email': email,
                'id': id,
                'jobAddress': jobAddress,
                'jobName': jobName,
                'latitude': latitude,
                'longitude': longitude,
                'monthNewspaperStatus': monthNewspaperStatus,
                'pageSize': pageSize,
                'password': password,
                'phone': phone,
                'platformId': platformId,
                'pushToken': pushToken,
                'reportSource': reportSource,
                'searchText': searchText,
                'selectClockDay': selectClockDay,
                'sortField': sortField,
                'sortOrder': sortOrder,
                'tagType': tagType,
                'type': type,
                'userId': userId,
                'weekNewspaperStatus': weekNewspaperStatus,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listMyClockInInfoByPage
     * @param clockAddress 
     * @param clockDays 
     * @param clockStatus 
     * @param clockedSuccessDays 
     * @param current 
     * @param dailyNewspaperStatus 
     * @param device 
     * @param email 
     * @param id 
     * @param jobAddress 
     * @param jobName 
     * @param latitude 
     * @param longitude 
     * @param monthNewspaperStatus 
     * @param pageSize 
     * @param password 
     * @param phone 
     * @param platformId 
     * @param pushToken 
     * @param reportSource 
     * @param searchText 
     * @param selectClockDay 
     * @param sortField 
     * @param sortOrder 
     * @param tagType 
     * @param type 
     * @param userId 
     * @param weekNewspaperStatus 
     * @returns BaseResponse_Page_ClockInInfo_ OK
     * @throws ApiError
     */
    public static listMyClockInInfoByPageUsingGet(
clockAddress?: string,
clockDays?: number,
clockStatus?: number,
clockedSuccessDays?: number,
current?: number,
dailyNewspaperStatus?: number,
device?: string,
email?: string,
id?: number,
jobAddress?: string,
jobName?: string,
latitude?: string,
longitude?: string,
monthNewspaperStatus?: number,
pageSize?: number,
password?: string,
phone?: string,
platformId?: number,
pushToken?: string,
reportSource?: number,
searchText?: string,
selectClockDay?: string,
sortField?: string,
sortOrder?: string,
tagType?: string,
type?: string,
userId?: number,
weekNewspaperStatus?: number,
): CancelablePromise<BaseResponse_Page_ClockInInfo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/clockInInfo/list/myClockInInfo',
            query: {
                'clockAddress': clockAddress,
                'clockDays': clockDays,
                'clockStatus': clockStatus,
                'clockedSuccessDays': clockedSuccessDays,
                'current': current,
                'dailyNewspaperStatus': dailyNewspaperStatus,
                'device': device,
                'email': email,
                'id': id,
                'jobAddress': jobAddress,
                'jobName': jobName,
                'latitude': latitude,
                'longitude': longitude,
                'monthNewspaperStatus': monthNewspaperStatus,
                'pageSize': pageSize,
                'password': password,
                'phone': phone,
                'platformId': platformId,
                'pushToken': pushToken,
                'reportSource': reportSource,
                'searchText': searchText,
                'selectClockDay': selectClockDay,
                'sortField': sortField,
                'sortOrder': sortOrder,
                'tagType': tagType,
                'type': type,
                'userId': userId,
                'weekNewspaperStatus': weekNewspaperStatus,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listClockInInfoByPage
     * @param requestBody 
     * @returns BaseResponse_Page_ClockInInfo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listClockInInfoByPageUsingPost(
requestBody?: ClockInInfoQueryRequest,
): CancelablePromise<BaseResponse_Page_ClockInInfo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/clockInInfo/list/page',
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
     * getClockInInfoByLoginUserId
     * @returns BaseResponse_ClockInInfoVo_ OK
     * @throws ApiError
     */
    public static getClockInInfoByLoginUserIdUsingGet(): CancelablePromise<BaseResponse_ClockInInfoVo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/clockInInfo/login/get',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateClockInInfo
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateClockInInfoUsingPost(
requestBody?: ClockInInfoUpdateRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/clockInInfo/update',
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
