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

  const searchConditions = searchFields.map((field) => ({
    [field]: { $regex: query, $options: "i" }
  }));

  const skip = (page - 1) * limit;

  const searchResults = await model
    .find({ $or: searchConditions })
    .select("firstName lastName email phoneNumber userRole")
    .skip(skip)
    .limit(limit)
    .lean();
  return searchResults;
};
