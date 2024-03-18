/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_List_UserVO_ } from '../models/BaseResponse_List_UserVO_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_UserVO_ } from '../models/BaseResponse_Page_UserVO_';
import type { BaseResponse_User_ } from '../models/BaseResponse_User_';
import type { BaseResponse_UserVO_ } from '../models/BaseResponse_UserVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { TransferCoinRequest } from '../models/TransferCoinRequest';
import type { UserAddRequest } from '../models/UserAddRequest';
import type { UserBindEmailRequest } from '../models/UserBindEmailRequest';
import type { UserLoginRequest } from '../models/UserLoginRequest';
import type { UserRegisterRequest } from '../models/UserRegisterRequest';
import type { UserUnBindEmailRequest } from '../models/UserUnBindEmailRequest';
import type { UserUpdateRequest } from '../models/UserUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserControllerService {

    /**
     * addUser
     * @param requestBody 
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUserUsingPost(
requestBody?: UserAddRequest,
): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/add',
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
     * addCoin
     * @param userAccount userAccount
     * @param addCoin addCoin
     * @returns BaseResponse_boolean_ OK
     * @throws ApiError
     */
    public static addCoinUsingGet(
userAccount?: string,
addCoin?: number,
): CancelablePromise<BaseResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/addCoin',
            query: {
                'userAccount': userAccount,
                'addCoin': addCoin,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * userBindEmail
     * @param requestBody 
     * @returns BaseResponse_User_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userBindEmailUsingPost(
requestBody?: UserBindEmailRequest,
): CancelablePromise<BaseResponse_User_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/bind/login',
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
     * deleteUser
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteUserUsingPost(
requestBody?: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/delete',
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
     * getUserById
     * @param id id
     * @returns BaseResponse_UserVO_ OK
     * @throws ApiError
     */
    public static getUserByIdUsingGet(
id?: string,
): CancelablePromise<BaseResponse_UserVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/get',
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
     * getLoginUser
     * @returns BaseResponse_UserVO_ OK
     * @throws ApiError
     */
    public static getLoginUserUsingGet(): CancelablePromise<BaseResponse_UserVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/get/login',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getCaptcha
     * @param emailAccount emailAccount
     * @returns BaseResponse_boolean_ OK
     * @throws ApiError
     */
    public static getCaptchaUsingGet(
emailAccount?: string,
): CancelablePromise<BaseResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/getCaptcha',
            query: {
                'emailAccount': emailAccount,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getUserInfo
     * @param userAccount userAccount
     * @returns BaseResponse_UserVO_ OK
     * @throws ApiError
     */
    public static getUserInfoUsingGet(
userAccount?: string,
): CancelablePromise<BaseResponse_UserVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/getUserInfo',
            query: {
                'userAccount': userAccount,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listUser
     * @param createTime 
     * @param current 
     * @param gender 
     * @param id 
     * @param pageSize 
     * @param sortField 
     * @param sortOrder 
     * @param updateTime 
     * @param userAccount 
     * @param userAvatar 
     * @param userName 
     * @param userRole 
     * @returns BaseResponse_List_UserVO_ OK
     * @throws ApiError
     */
    public static listUserUsingGet(
createTime?: string,
current?: number,
gender?: number,
id?: number,
pageSize?: number,
sortField?: string,
sortOrder?: string,
updateTime?: string,
userAccount?: string,
userAvatar?: string,
userName?: string,
userRole?: string,
): CancelablePromise<BaseResponse_List_UserVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/list',
            query: {
                'createTime': createTime,
                'current': current,
                'gender': gender,
                'id': id,
                'pageSize': pageSize,
                'sortField': sortField,
                'sortOrder': sortOrder,
                'updateTime': updateTime,
                'userAccount': userAccount,
                'userAvatar': userAvatar,
                'userName': userName,
                'userRole': userRole,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listUserByPage
     * @param createTime 
     * @param current 
     * @param gender 
     * @param id 
     * @param pageSize 
     * @param sortField 
     * @param sortOrder 
     * @param updateTime 
     * @param userAccount 
     * @param userAvatar 
     * @param userName 
     * @param userRole 
     * @returns BaseResponse_Page_UserVO_ OK
     * @throws ApiError
     */
    public static listUserByPageUsingGet(
createTime?: string,
current?: number,
gender?: number,
id?: number,
pageSize?: number,
sortField?: string,
sortOrder?: string,
updateTime?: string,
userAccount?: string,
userAvatar?: string,
userName?: string,
userRole?: string,
): CancelablePromise<BaseResponse_Page_UserVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/list/page',
            query: {
                'createTime': createTime,
                'current': current,
                'gender': gender,
                'id': id,
                'pageSize': pageSize,
                'sortField': sortField,
                'sortOrder': sortOrder,
                'updateTime': updateTime,
                'userAccount': userAccount,
                'userAvatar': userAvatar,
                'userName': userName,
                'userRole': userRole,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * userLogin
     * @param requestBody 
     * @returns BaseResponse_User_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userLoginUsingPost(
requestBody?: UserLoginRequest,
): CancelablePromise<BaseResponse_User_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/login',
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
     * userLogout
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userLogoutUsingPost(): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/logout',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * reduceCoin
     * @param userAccount userAccount
     * @param reduceCoin reduceCoin
     * @returns BaseResponse_boolean_ OK
     * @throws ApiError
     */
    public static reduceCoinUsingGet(
userAccount?: string,
reduceCoin?: number,
): CancelablePromise<BaseResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/reduceCoin',
            query: {
                'userAccount': userAccount,
                'reduceCoin': reduceCoin,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * userRegister
     * @param requestBody 
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userRegisterUsingPost(
requestBody?: UserRegisterRequest,
): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/register',
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
     * transferCoin
     * @param requestBody 
     * @returns BaseResponse_UserVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static transferCoinUsingPost(
requestBody?: TransferCoinRequest,
): CancelablePromise<BaseResponse_UserVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/transferCoin',
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
     * userUnBindEmail
     * @param requestBody 
     * @returns BaseResponse_User_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userUnBindEmailUsingPost(
requestBody?: UserUnBindEmailRequest,
): CancelablePromise<BaseResponse_User_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/unbindEmail',
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
     * updateUser
     * @param requestBody 
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUserUsingPost(
requestBody?: UserUpdateRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/update',
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
