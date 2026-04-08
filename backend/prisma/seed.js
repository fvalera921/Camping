import dotenv from "dotenv";
import { prisma } from "../src/config/prisma.js";
import { ensureAdminUser } from "../src/services/adminBootstrapService.js";

dotenv.config();

const accommodations = [
  {
    title: "Parcela Estandar",
    description:
      "Parcela pensada para tienda, caravana o autocaravana, con amplitud, vegetacion, servicios cercanos y una estancia tranquila junto al entorno natural de Bullas.",
    location: "La Rafa, Bullas, Murcia",
    pricePerNight: 28,
    capacity: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Parcela Sombra Plus",
    description:
      "Parcela amplia con arbolado consolidado, toma electrica, punto de agua cercano y acceso comodo para caravanas y autocaravanas medianas.",
    location: "Zona arbolada de La Rafa, Bullas",
    pricePerNight: 32,
    capacity: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Parcela Autocaravana Confort",
    description:
      "Espacio mas regular y accesible para vehiculos vivienda, con mayor comodidad de entrada, toma electrica y cercania al area de servicios.",
    location: "Acceso principal de La Rafa, Bullas",
    pricePerNight: 35,
    capacity: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Parcela Familiar XL",
    description:
      "Una de las parcelas mas amplias del camping, recomendada para familias o grupos pequenos que necesitan espacio adicional y una estancia comoda.",
    location: "Sector familiar de La Rafa, Bullas",
    pricePerNight: 38,
    capacity: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Apartamento Centenario",
    description:
      "Version digital del alojamiento destacado en La Rafa: apartamentos turisticos de una llave, orientados a familias o parejas que buscan mas comodidad sin salir del entorno natural del camping.",
    location: "Edificio historico de La Rafa, Bullas",
    pricePerNight: 87,
    capacity: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Apartamento Mirador",
    description:
      "Alojamiento orientado a escapadas mas comodas, con estancia interior amplia, terraza exterior y una distribucion pensada para familias.",
    location: "Zona alta de La Rafa, Bullas",
    pricePerNight: 94,
    capacity: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Albergue para Grupos",
    description:
      "Albergue de 44 plazas pensado para grupos, clubes de montana, centros educativos y estancias compartidas en plena naturaleza.",
    location: "La Rafa, Bullas, Murcia",
    pricePerNight: 18,
    capacity: 44,
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Acampada Libre junto al Lago",
    description:
      "Inspirada en la zona de acampada libre de La Rafa: un formato mas natural y relajado, pensado para quienes quieren montar su tienda con mayor sensacion de libertad y contacto con el paisaje.",
    location: "Zona tranquila de La Rafa, Bullas",
    pricePerNight: 21,
    capacity: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
  }
];

const main = async () => {
  const admin = await ensureAdminUser();
  const accommodationCount = await prisma.accommodation.count();

  if (accommodationCount === 0) {
    await prisma.accommodation.createMany({
      data: accommodations
    });
  }

  console.log(`Admin ready: ${admin.email}`);
  console.log(`Accommodations available: ${await prisma.accommodation.count()}`);
};

main()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
