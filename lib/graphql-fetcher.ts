import getConfig from "next/config";
import request from "graphql-request";

console.log(getConfig());

export const graphqlFetcher = query => request("/api/graphql", query);
