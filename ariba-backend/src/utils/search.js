export const searchQuery = async (
  model,
  query,
  searchFields,
  limit = 15,
  page = 1
) => {
  if (!query || query.length < 3) {
    return [];
  }

  const skip = (page - 1) * limit;

  // Use MongoDB text search (requires text index on model fields)
  const searchResults = await model
    .find(
      { $text: { $search: query } }, // text search instead of regex
      { score: { $meta: "textScore" } } // get relevance score
    )
    .sort({ score: { $meta: "textScore" } }) // sort by relevance
    .select("firstName lastName email phoneNumber userRole")
    .skip(skip)
    .limit(limit)
    .lean();

  return searchResults;
};
