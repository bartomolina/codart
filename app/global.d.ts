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

type IABCollection = Pick<Project, "contract" | "name" | "website" | "license" | "description" | "script" | "complete" | "active" | "scriptLength" | "scriptTypeAndVersion" | "minterConfiguration" | "id" | "projectId" | "invocations" | "maxInvocations" | "name" | "updatedAt" | "curationStatus" | "artistName" | "scriptJSON">;
