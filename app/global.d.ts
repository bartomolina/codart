import { BigNumber } from "ethers";
import { GoalStatusEnum } from "./lib/utils";
import { Project } from "../.graphclient";

interface Window {
  ethereum: ExternalProvider;
}

interface ICACollectionInfo {
  name: string;
  symbol: string;
  artist: string;
  description: string;
  maxSupply: BigNumber;
  price: BigNumber;
  _library: string;
  libraryURL: string;
  code: string;
}

interface ICACollection {
  _address: string;
  info: ICACollectionInfo;
}

type IABCollection = Pick<
  Project,
  | "active"
  | "activatedAt"
  | "artistName"
  | "contract"
  | "contractAddress"
  | "complete"
  | "completedAt"
  | "description"
  | "id"
  | "invocations"
  | "license"
  | "maxInvocations"
  | "minterConfiguration"
  | "mintingDate"
  | "name"
  | "paused"
  | "projectId"
  | "script"
  | "scriptJSON"
  | "scriptTypeAndVersion"
  | "scriptType"
  | "scriptLength"
  | "updatedAt"
  | "website"
>;
