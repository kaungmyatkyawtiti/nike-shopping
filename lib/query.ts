import { SearchParams } from "@/types";
import qs from "query-string";

type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | string[]
  | number[]
  | boolean[];

type QueryObject = Record<string, QueryValue>;

export function parseQuery(search: string) {
  const parsed = qs.parse(
    search,
    { arrayFormat: "bracket" }
  );
  return parsed as QueryObject;
}

export function stringifyQuery(query: QueryObject) {
  return qs.stringify(
    query,
    {
      skipNull: true,
      skipEmptyString: true,
      arrayFormat: "bracket"
    }
  );
}

function normalizeToStringArray(value: QueryValue) {
  if (Array.isArray(value)) {
    return value.map(String);
  }

  if (value === undefined || value === null) {
    return [];
  }

  return [String(value)];
}

export function withUpdatedParams(
  pathname: string,
  currentSearch: string,
  updates: QueryObject
) {
  const current = parseQuery(currentSearch);
  const next: QueryObject = { ...current };

  Object.entries(updates).forEach(([key, value]) => {
    if (
      value === undefined ||
      value === null ||
      (Array.isArray(value) && value.length === 0)
    ) {
      delete next[key];
    } else {
      next[key] = value as QueryValue;
    }
  });

  const search = stringifyQuery(next);
  return search ? `${pathname}?${search}` : pathname;
}

export function toggleArrayParam(
  pathname: string,
  currentSearch: string,
  key: string,
  value: string
) {
  const current = parseQuery(currentSearch);
  const rawValue = current[key];
  const values = normalizeToStringArray(rawValue);
  const set = new Set(values);

  if (set.has(value)) {
    set.delete(value);
  } else {
    set.add(value);
  }
  const nextValues = [...set];
  const updates: QueryObject = {
    [key]: nextValues.length ? nextValues : undefined
  };
  return withUpdatedParams(pathname, currentSearch, updates);
}

export function setParam(
  pathname: string,
  currentSearch: string,
  key: string,
  value: string | number | null | undefined
) {
  return withUpdatedParams(
    pathname,
    currentSearch,
    {
      [key]: value === null || value === undefined ? undefined : String(value)
    }
  );
}

export function removeParams(
  pathname: string,
  currentSearch: string,
  keys: string[]
) {
  const current = parseQuery(currentSearch);
  keys.forEach((k) => delete current[k]);
  const search = stringifyQuery(current);
  return search ? `${pathname}?${search}` : pathname;
}

export function getArrayParam(
  search: string,
  key: string
) {
  const q = parseQuery(search);
  const v = q[key];
  return normalizeToStringArray(v);
}

// export function getStringParam(
//   search: string,
//   key: string
// ) {
//   const q = parseQuery(search);
//   const v = q[key];
//   if (v === undefined) return undefined;
//   return Array.isArray(v)
//     ? (v[0] ? String(v[0]) : undefined)
//     : String(v);
// }
