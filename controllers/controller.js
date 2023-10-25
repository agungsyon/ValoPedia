const axios = require("axios");
const midtransClient = require("midtrans-client");
const { User, Inventory } = require("../models");

class Controller {
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

      res.status(200).json(bundles);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async midtransToken(req, res, next) {
    try {
      let price = 100000;
      if (req.body.bundleId) {
        //kondisi jika hit dari postman error karna null gada length sebenernya gangaruh tapi risih aja error klo hit postman
        price = (req.body.bundleId.length + req.body.name.length) * 20000;
      }
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
          gross_amount: price,
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
      const { bundleId, name, imgUrl } = req.body;
      const UserId = req.user.id;
      const inventory = await Inventory.create({ UserId, bundleId, name, imgUrl });
      res.status(201).json({ id: inventory.id, name: inventory.name });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async fetchInventory(req, res, next) {
    try {
      console.log(req.user.id);
      const UserId = req.user.id;
      const inventories = await Inventory.findAll({ where: { UserId } });
      res.status(200).json(inventories);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
