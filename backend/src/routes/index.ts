import { Router } from "express";

import { Client } from "@googlemaps/google-maps-services-js";

const routes = Router();
const googleMapsClient = new Client();

// Testar a API do Google Maps
routes.post("/geocode", async (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "O endereço é obrigatório" });
  }

  try {
    const response = await googleMapsClient.geocode({
      params: {
        address,
        key: process.env.GOOGLE_MAPS_API_KEY || "", // Certifique-se que está no .env
      },
    });

    return res.json(response.data.results);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erro ao acessar a API do Google Maps" });
  }
});

export { routes };
