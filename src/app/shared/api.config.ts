import { environment } from "src/environments/environment";

export class ApiConfig {   

    private static imgPath = 'upload/University/images';

    private static defaultMediaUploadMaxFilesize = 50;

    private static version: string | number = 'api';

    private static authPrefix = '';

    private static debug = false;

    private static adminRoles: string[] = [
        'administrator'
    ];

    private static nodePublishedOptions: any[] = [
        { title: 'Publish', status: 1 },
        { title: 'Unpublished', status: 0 }
    ];

    public static getNodePublishedOptions(): any[] {

        return ApiConfig.nodePublishedOptions;
    }

    public static setApiVersion(version: string = 'api'): void {
        ApiConfig.version = version;
    }

    public static getApiVersion(): string | number {
        return ApiConfig.version;
    }

    //public static setBaseURL(url: string = '/'): void {
     //   environment.identityPath = url;
   // }

    public static getImgPath(): string {
        return ApiConfig.imgPath;
    }


    // public static getPath(): string {
    //     return environment.identityPath;
    // }

    // public static getTechnicalPath() {
    //     return environment.technicalPath;
    // }

    // public static getCustomerPath() {
    //     return environment.customerPath;
    // }

    // public static getFileManagerPath() {
    //     return environment.fileManagerPath;
    // }

    // public static getCommonPath() {
    //     return ApiConfig.commonPath;
    // }

    // public static getCartablePath() {
    //     return ApiConfig.cartablePath;
    // }

    public static setAuthPrefix(authPrefix: string = ''): void {
        ApiConfig.authPrefix = authPrefix;
    }

    public static getAuthPrefix(): string {
        return ApiConfig.authPrefix;
    }

    public static setDebugMode(isEnabled: boolean): void {
        ApiConfig.debug = isEnabled;
    }

    public static debuggable(): boolean {
        return ApiConfig.debug;
    }

    public static getAdminRoles(): string[] {

        return ApiConfig.adminRoles;
    }

    public static getDefaultMediaUploadMaxFilesize(): number {
        return ApiConfig.defaultMediaUploadMaxFilesize;
    }

}
