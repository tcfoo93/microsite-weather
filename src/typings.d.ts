declare const _ // global lodash
declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";

declare global {
	interface window {
		__POWERED_BY_QIANKUN__: boolean
		__INJECTED_PUBLIC_PATH_BY_QIANKUN__: boolean
	}
}