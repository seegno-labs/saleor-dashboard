import { stringify as stringifyQs } from "qs";
import urlJoin from "url-join";

import {
  ActiveTab,
  BulkAction,
  Dialog,
  Filters,
  Pagination,
  SingleAction,
  TabActionDialog
} from "../types";

export const attributeSection = "/attributes/";

export enum AttributeListUrlFiltersEnum {
  query = "query"
}
export type AttributeListUrlFilters = Filters<AttributeListUrlFiltersEnum>;
export type AttributeListUrlDialog = "remove" | TabActionDialog;
export type AttributeListUrlQueryParams = ActiveTab &
  AttributeListUrlFilters &
  BulkAction &
  Dialog<AttributeListUrlDialog> &
  Pagination;
export const attributeListPath = attributeSection;
export const attributeListUrl = (params?: AttributeListUrlQueryParams) =>
  attributeListPath + "?" + stringifyQs(params);

export type AttributeAddUrlDialog =
  | "add-value"
  | "edit-value"
  | "remove-value"
  | "remove-values";
export type AttributeAddUrlQueryParams = Dialog<AttributeAddUrlDialog> &
  SingleAction;
export const attributeAddPath = urlJoin(attributeSection, "add");
export const attributeAddUrl = (params?: AttributeAddUrlQueryParams) =>
  attributeAddPath + "?" + stringifyQs(params);

export type AttributeUrlDialog =
  | "add-value"
  | "edit-value"
  | "remove"
  | "remove-value"
  | "remove-values";
export type AttributeUrlQueryParams = BulkAction &
  Dialog<AttributeUrlDialog> &
  SingleAction;
export const attributePath = (id: string) => urlJoin(attributeSection, id);
export const attributeUrl = (id: string, params?: AttributeUrlQueryParams) =>
  attributePath(encodeURIComponent(id)) + "?" + stringifyQs(params);
