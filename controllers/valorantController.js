const axios = require("axios");
const midtransClient = require("midtrans-client");
const { User } = require("../models");

class ValorantController {
  static async fetchAgents(req, res, next) {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://valorant-api.com/v1/agents",
      });

      const agents = data.data.map((el) => {
        return {
          id: el.uuid,
          name: el.displayName,
          description: el.description,
          icon: el.displayIcon,
          image: el.fullPortrait,
          role: el.role ? el.role.displayName : null,
          roleIcon: el.role ? el.role.displayIcon : null,
        };
      });
      const filteredAgents = agents.filter((agent) => agent.role !== null);

      res.status(200).json(filteredAgents);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async fetchBundles(req, res, next) {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://valorant-api.com/v1/bundles",
      });

      const bundles = data.data.map((el) => {
        return {
          id: el.uuid,
          name: el.displayName,
          image: el.displayIcon,
          imageVertical: el.verticalPromoImage,
        };
      });
      const ids = [
        {
          id: "a4937ee9-4148-8ff2-2c11-c28891880306",
        },
      ];
      const filter = bundles.map((el) => {
        return el.filter;
      });
      const id = "a4937ee9-4148-8ff2-2c11-c28891880306";

      const filteredAgents = data.data.filter((agent) => agent.id == id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async midtransToken(req, res, next) {
    try {
      const id = req.user.id;

      const user = await User.findByPk(id);

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: "TRANSACTION_" + Math.floor(1000000 + Math.random() * 9000000), //unique
          gross_amount: 10000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      res.status(201).json(midtransToken);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async postInventory(req, res, next) {
    try {
      const { bundleId } = req.body;
      console.log(bundleId);
    } catch (error) {}
  }
}

module.exports = ValorantController;
