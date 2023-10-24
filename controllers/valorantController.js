const axios = require("axios");

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
      res.status(200).json(bundles);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ValorantController;
