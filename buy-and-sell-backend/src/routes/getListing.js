import { db } from "../database";

export const getListingRoute = {
  method: "GET",
  path: "/api/listings/{id}",
  handler: async (req, h) => {
    const id = req.params.id;
    const { results } = await db.query("SELECT * FROM listings WHERE id=?", [
      id,
    ]);
    const listing = results[0];
    // if (!listing) throw Boom.notFound(`Listing does't exist with id: ${id}`);
    if (!listing) {
      return `Listing does't exist with id: ${id}`;
    }
    return listing;
  },
};
