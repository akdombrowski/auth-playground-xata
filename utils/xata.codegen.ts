// Generated by Xata Codegen 0.23.5. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "users",
    columns: [
      { name: "credPubKey", type: "string", notNull: true, defaultValue: "" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Users = InferredTypes["users"];
export type UsersRecord = Users & XataRecord;

export type DatabaseSchema = {
  users: UsersRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Anthony-Dombrowski-s-workspace-vnjf6m.us-east-1.xata.sh/db/auth-playground-xata",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
