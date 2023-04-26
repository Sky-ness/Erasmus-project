import express from "express";
import http from "http";
import { OliveTree } from "./OliveTree";

const tree = new OliveTree("test", 1, 1, 1, 1);
const app = express();

console.log("wsh");
