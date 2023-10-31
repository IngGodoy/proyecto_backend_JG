import {Router} from "express";
import {CartsManager} from "../manager/carts.js"

const router = Router ();
const cartsManager = new CartsManager();