import * as agent from "@dfinity/agent";
import fetch from "node-fetch";
import fs from "fs";
import { idlFactory } from "./bauction.did.js";
import Secp256k1KeyIdentity from "@dfinity/identity";
import * as crypto from "crypto";

global.fetch = fetch;

const { Actor, HttpAgent } = agent;

class Bauction {
  constructor(host = "https://ic0.app") {
    this.canisterId = "rrkah-fqaaa-aaaaa-aaaaq-cai";
    this.actor = null;
    this.agent = null;
    this.identity = null;
    this.host = host;
  }

  async initIdentity(secretKey) {
    const buffer = fs.readFileSync(secretKey);
    const key = buffer.toString("utf-8");

    const privateKey = crypto.createHash("sha256").update(key).digest("base64");
    const identity = Secp256k1KeyIdentity.Secp256k1KeyIdentity.fromSecretKey(
      Buffer.from(privateKey, "base64")
    );
    const agent = new HttpAgent({
      host: this.host,
      identity: identity,
    });
    await agent.fetchRootKey();
    const actor = Actor.createActor(idlFactory, {
      canisterId: this.canisterId,
      agent,
    });
    this.identity = identity;
    this.agent = agent;
    this.actor = actor;
  }

  createProfile(name = "", location = "", about = "") {
    return this.actor.createProfile({
      name,
      location,
      about,
    });
  }
  getMyProfile() {
    return this.actor.getProfile();
  }
  updateMyProfile(name = "", location = "", about = "") {
    return this.actor.updateProfile({
      bio: {
        name,
        location,
        about,
      },
    });
  }
  deleteMyProfile() {
    return this.actor.deleteProfile();
  }
  getProfileById(sellerId) {
    return this.actor.getProfileById(sellerId);
  }

  createAuction(
    name,
    startDate,
    endDate,
    description,
    minBidAmt,
    maxBidAmt,
    category,
    location,
    auctionType
  ) {
    const auction = {
      name,
      startDate,
      endDate,
      description,
      minBidAmt,
      maxBidAmt,
      category,
      location,
      auctionType: {
        [auctionType]: null,
      },
    };
    return this.actor.createAuction(auction);
  }
  updateAuction(auctionId, auctionInput) {
    return this.actor.updateAuction(auctionId, auctionInput);
  }
  deleteAuction(auctionId) {
    return this.actor.deleteAuction(auctionId);
  }

  getMyAuctions() {
    return this.actor.getMyAuctions();
  }
  getAllAuctions() {
    return this.actor.getAllAuctions();
  }
  getAuctionsBySellerId(sellerId) {
    return this.actor.getAuctionBySellerId(sellerId);
  }
  getMyAuctionCount() {
    return this.actor.getMyAuctionCount();
  }
  findAuctionById(auctionId) {
    return this.actor.findAuction(auctionId);
  }
  getAuctionWinner(auctionId) {
    return this.actor.getWinner(auctionId);
  }
  getHighestBid(auctionId) {
    return this.actor.getHighestBid(auctionId);
  }
  bidOnAuction(auctionId, bidAmount) {
    return this.actor.bidOnAuction(auctionId, bidAmount, `${new Date()}`);
  }
}

export default Bauction;
